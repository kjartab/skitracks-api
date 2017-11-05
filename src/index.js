// var dotenv = require('dotenv')
// const envs = dotenv.config()
console.log(process.env)
var cors = require('cors')
const express = require('express')
const apiRouter = require('./apiRouter')

var winston = require('winston'),
expressWinston = require('express-winston');

var app = express()
app.use(cors())
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        })
    ]
}))

app.use((req,res,next) => {
    console.log("next")
    next()
})

app.use('/', apiRouter)

app.listen(3000)