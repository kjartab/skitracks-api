const { Pool } = require('pg')
const pool = new Pool()

const geojsonFcSql = `SELECT row_to_json(feature_collection)
FROM ( SELECT \'FeatureCollection\' AS type,
        array_to_json(array_agg(feature)) As features
        FROM (
                SELECT \'Feature\' AS type,
                ST_AsGeoJson(ST_Transform(k.segment,4326))::json AS geometry,
                row_to_json((SELECT seg_id FROM (SELECT sid, segmentorder, segmenttime, length) AS seg_id)) AS properties
                FROM (SELECT segment,segmenttime, ST_Length(segment) length, s.segmentnumber as segmentorder, s.segment_id as sid FROM pre$                                                                                        ) AS feature
        ) AS feature_collection;';
`

const getSpatioTemporal = async () => {
    const res = await pool.query( geojsonFcSql)
    return res.rows
}

const getTrackObjects = async () => {
    const res = await pool.query('SELECT row_to_json(trackdata) from (select t.id track_id, name, array_agg(segment_id) segment_ids, array_agg(segment_order) segment_order, array_agg(defines_track) defines_track                                FROM track_table t join track_segment_table ts on t.id = ts.track_id group by name, t.id) trackdata')
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