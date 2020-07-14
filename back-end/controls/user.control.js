;
'use strict'
const jwt = require('jsonwebtoken')

let loginUser = (req, res) => {
    let userDefault = {
        names: "Jose Luis",
        lastNames: "Molina Cañar",
        email: "jose@gmail.com",
        password: "123456"
    }
    let user = req.body.user
    if (user.email === userDefault.email) {
        if (user.password === userDefault.password) {
            let token = jwt.sign(user, process.env.KEY_JWT, {
                algorithm: 'HS256',
                expiresIn: parseInt(process.env.TIME)
            })
            res.status(200).json({
                ok: true,
                user, token
            })
        } else {
            res.status(200).send('Contraseña o correo incorrecto')
        }
    } else {
        res.status(200).send('La cuenta no existe')
    }
}


module.exports = {
    loginUser
}
