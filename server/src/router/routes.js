const express = require('express')
const postsController = require('../controllers/postsController')
const authController = require('../controllers/authController')

const router = express.Router()

router.get('/', (req, res) => {
    res.send("<h2>Error 404 Page Not Found!!</h2>")
})

// ------- AUTH ---------

router.get('/users', authController.getAllUsers)
router.post('/signup', authController.signUp)
router.post('/login', authController.login)
router.delete('/delete/:email', authController.deleteUserByEmail)

// ------- AUTH ---------

// ------- POST ---------
router.get('/posts', postsController.getAllPost)
router.get('/posts/user/:user', postsController.getAllPostUser)
router.get('/post/:id', postsController.getPostById)
router.get('/posts/:kategori', postsController.getPostByKategori)
router.post('/posts', postsController.createPost)
router.patch('/posts/:id', postsController.updatePost)
router.delete('/posts/:id', postsController.deletePost)
// ------- POST ---------

module.exports = router