const express = require('express')
const apiRouter = express.Router()
const db = require('./db')

apiRouter.get('/', async (req, res) => {
    res.send("Skitracks API")
})

apiRouter.get('/spatiotemporal', async (req, res) => { 
    try {
        const dbres = await db.getSpatioTemporal()
        res.send(dbres)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

apiRouter.get('/trackobjects', async (req, res) => {
    try { 
        res.send(await db.getTrackObjects())
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
})

module.exports = apiRouter