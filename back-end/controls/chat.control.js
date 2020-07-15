;
'use strict'
let manageChats = (https) => {
    let io = require('socket.io')(https)
    let socketJwt = require('socketio-jwt')
    // io.use(socketJwt.authorize({
    //     secret: (req, decodedToken, callback) => {
    //         console.log(req._query.sessionID)
    //         callback(null, req._query.sessionID)
    //     },
    //     handshake: true
    // }))
    io.use(socketJwt.authorize({
            secret: process.env.KEY_JWT,
            handshake: true,
        })
    );
    const manageData = {}
    io.on('connection', socket => {
        let previousId
        const safeJoin = currentId => {
            socket.leave(previousId)
            socket.join(currentId)
            previousId = currentId
        }
        socket.on('getChat', chatId => {
            safeJoin(chatId)
            socket.emit('manageChat', manageData[chatId])
        })
        socket.on('addChat', chat => {
            let cards = Object.keys(manageData)
            let numberCards = cards.length + 1
            chat.id = `Conversación ${numberCards}`
            manageData[chat.id] = chat
            safeJoin(chat.id)
            io.emit('manageData', Object.keys(manageData))
            socket.emit('manageChat', chat)
        })
        socket.on('editChat', chat => {
            manageData[chat.id] = chat
            socket.to(chat.id).emit('manageChat', chat)
        })
        io.emit('manageData', Object.keys(manageData))
    })
}

module.exports = manageChats
