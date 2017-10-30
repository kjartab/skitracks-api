var dotenv = require('dotenv')
const envs = dotenv.config()

const express = require('express')
const apiRouter = require('./apiRouter')
const app = express()

app.use('/', apiRouter)

app.listen(3000)