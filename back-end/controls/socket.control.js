;
'use strict'
let gestionDocumentos = (http) => {
    let io = require('socket.io')(http)
    const gestionDatos = {}
    io.on('connection', socket => {
        let anteriorId
        const safeJoin = actualId => {
            socket.leave(anteriorId)
            socket.join(actualId)
            anteriorId = actualId
        }

        socket.on('getDoc', docId => {
            safeJoin(docId)
            socket.emit('gestionDato', gestionDatos[docId])
        })

        socket.on('addDoc', doc => {
            let salas = Object.keys(gestionDatos)
            let numeroSalas = salas.length + 1
            doc.id = `Documento ${numeroSalas}`
            gestionDatos[doc.id] = doc
            safeJoin(doc.id)
            io.emit('gestionDatos', Object.keys(gestionDatos))
            socket.emit('gestionDato', doc)
        })

        socket.on('editDoc', doc => {
            gestionDatos[doc.id] = doc
            socket.to(doc.id).emit('gestionDato', doc)
        })

        io.emit('gestioDatos', Object.keys(gestionDatos))
    })
}

module.exports = gestionDocumentos
