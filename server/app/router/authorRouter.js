const express = require('express')
const AuthorController = require('../controller/authorController')
const uploadImage = require('../helper/imagehandler') // Image area
const { Auth } = require('../middleware/auth')
const router = express.Router()

router.post('/register', uploadImage.single('image'), AuthorController.register) // Register
router.post('/login', AuthorController.login) // Login
router.get('/dashboard', Auth, AuthorController.dashboard) // Dashboard Data

module.exports = router 