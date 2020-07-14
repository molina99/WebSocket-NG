;
'use strict'

const env = require('dotenv').config()
const app = require('./app')
const port = process.env.PORT || 3000

/**
 * Security Https
 *
const https = require('https')
const fs = require('fs')
const httpsOptions = {
    key: fs.readFileSync('./security/cert.key'),
    cert: fs.readFileSync('./security/cert.pem')
}
*/

let http = require('http').Server(app)

let io_chat = require('../controls/chat.control')(http)


// app.get('/', (req, res) => {
//     res.send("!!CONECTADO AL SERVIDOR CON SEGURIDAD HTTPS :D !!")
// })

// https.createServer(httpsOptions, app)
//     .listen(port, () => {
//         console.log(`El servicio está corriendo en el puerto https://localhost:${port}`)
//     })

http.listen(port, (err) => {
    if (!err) {
        console.log(`El servicio está corriendo en el puerto ${port}`)
    } else {
        console.log(`Error: ${err}`)
    }
})
