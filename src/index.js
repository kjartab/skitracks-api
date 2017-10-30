var dotenv = require('dotenv')
const envs = dotenv.config()
var cors = require('cors')
const express = require('express')
const apiRouter = require('./apiRouter')
var app = express()
app.use(cors())

app.use('/api', apiRouter)

app.listen(3000)