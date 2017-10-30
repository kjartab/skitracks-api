const { Pool } = require('pg')
const pool = new Pool()

const geojsonFcSql = `
    SELECT row_to_json(feature_collection)
    FROM ( SELECT 'FeatureCollection' AS type, 
        array_to_json(array_agg(feature)) As features
        FROM (	
            SELECT 
                ST_AsGeoJson(ST_Transform(k.segment,4326))::json AS geometry, 
                sid, 
                segmentorder, 
                segmenttime, 
                length
            
            FROM (SELECT segment,segmenttime, ST_Length(segment) length, s.segmentnumber as segmentorder, s.segment_id as sid FROM prebuild_temporalsegment s) k
            ) AS feature 
        ) AS feature_collection;
`

const geojsonFeaturesSql = `
SELECT  
    ST_AsGeoJson(ST_Transform(segment,4326)) geom,
    segment,
    segmenttime, 
    ST_Length(segment) length, 
    segmentnumber as segmentorder, 
    segment_id as sid 
FROM 
prebuild_temporalsegment
`



const trackObjectsSql = `
        SELECT
            t.id track_id, 
            name, 
            array_agg(segment_id) segment_ids, 
            array_agg(segment_order) segment_order, 
            array_agg(defines_track) defines_track
        FROM 
            track_table t 
        JOIN 
            track_segment_table ts 
        ON 
            t.id = ts.track_id 
        GROUP BY name, t.id
    `;

const getSpatioTemporal = async () => {
    const res = await pool.query(geojsonFeaturesSql)
    let featureCollection = {
        type: "FeatureCollection",
        features:[]
    }
    res.rows.forEach(row => {
        let feature = {
            type: 'Feature',
            geometry : JSON.parse(row.geom),
            properties : {
                sid : row.sid, 
                segmentorder: row.segmentorder,
                segmenttime : row.segmenttime,
                length: row.length 
            }
        }        
        featureCollection.features.push(feature)
    })
    return featureCollection
}

const getTrackObjects = async () => {
    const res = await pool.query(trackObjectsSql) 
    return res.rows
}

const getTracks = async () => {    
    const res = await pool.query('SELECT * from track_table;')
    return res.rows
}


module.exports = {
    getSpatioTemporal: getSpatioTemporal,
    getTrackObjects: getTrackObjects
}