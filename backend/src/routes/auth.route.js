const express = require('express')
const router = express.Router()
const {userRegisterController, userLoginController}= require('../controller/user.controller')

router.post('/register', userRegisterController)
router.post('/login', userLoginController)

module.exports = router