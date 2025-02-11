const express = require('express')
const BlogController = require('../controller/blogController')
const uploadImage = require('../helper/imagehandler') // Image area
const { Auth } = require('../middleware/auth')
const router = express.Router()

router.post('/postblog', Auth, uploadImage.single('image'), BlogController.addBlog) // Add blog
router.get('/blog', Auth, BlogController.blogList) // Blog List
router.get('/blog/:id', Auth, BlogController.singleBlog) // Blog List
router.get('/authorwiseblog', Auth, BlogController.authorwiseBlog) // Authorwise blog
router.get('/recentblog', Auth, BlogController.recentBlog) // Recent blog
router.post('/addcomment/:id', Auth, BlogController.addComment) // Add comment
router.get('/showcomment/:id', Auth, BlogController.showComment) // Show comment

module.exports = router 