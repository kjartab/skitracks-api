const express = require('express')
const apiRouter = express.Router()
const db = require('./db')
const logger = require('./logger')

apiRouter.get('/', async (req, res) => {
    res.send("Skitracks API")
})

apiRouter.get('/spatiotemporal', async (req, res) => { 
    try {
        const dbres = await db.getSpatioTemporal()
        res.send(dbres)
    } catch (err) { 
        logger.error(err)
        res.status(500).send()
    }
})

apiRouter.get('/trackobjects', async (req, res) => {
    try { 
        res.send(await db.getTrackObjects())
    } catch (err) { 
        logger.error(err)
        res.status(500).send()
    }
})

module.exports = apiRouter