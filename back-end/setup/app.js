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

/**
 * ROUTES
 */
let userRoutes = require('../routes/user.routes')

// For access client
let corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
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
// CORS
app.use(cors()) // PERMISOS PARA TODOS
// app.use(cors({credentials: true, origin: 'http://localhost:4200'}));

// SESSION
app.use(session(sess))

// PASSPORT
app.use(passport.initialize())
app.use(passport.session())

app.use('/server', userRoutes)

module.exports = app
