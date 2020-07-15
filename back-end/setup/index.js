;
'use strict'

const env = require('dotenv').config()
const app = require('./app')
const port = process.env.PORT || 3000
const fs = require('fs')

/**
 * Security Https
 */
const httpsOptions = {
    key: fs.readFileSync('./security/cert.key'),
    cert: fs.readFileSync('./security/cert.pem')
}

let https = require('https').Server(httpsOptions, app)
let io = require('../controls/chat.control')(https)

app.get('/', (req, res) => {
    res.send("!!CONECTADO AL SERVIDOR CON SEGURIDAD HTTPS :D !!")
})

https.listen(port, () => {
    console.log(`El servicio está corriendo en el puerto https://localhost:${port}`)
})

