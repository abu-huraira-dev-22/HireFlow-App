const express = require('express')
const router = express.Router()
const authController = require('../controllers/user.controller')

router.post('/signup',authController.signupController)
router.post('/login',authController.loginController)

module.exports = router