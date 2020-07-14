const express = require('express')
let api = express.Router()

const userControl = require('../controls/user.control')

api.post('/login', userControl.loginUser)

module.exports = api
