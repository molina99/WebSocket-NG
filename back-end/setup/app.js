;
'use strict'

const express = require('express')
const connectDB = require('../config/db')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const parseurl = require('parseurl')
let db = connectDB()
let app = express()


let corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(cors(corsOptions))
let session = require('express-session')
let sess = {
    secret: process.env.KEY_SESSION,
    resave: false,
    saveUninitialized: true,
    name: 'sessionID',
    cookie: {
        httpOnly: false,
        maxAge: parseInt(process.env.TIME)
    }
}
app.use(session(sess))
app.use(passport.initialize())
app.use(passport.session())

module.exports = app
