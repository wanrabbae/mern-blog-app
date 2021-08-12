const express = require('express')
const postsController = require('../controllers/postsController')
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/', (req, res) => {
    res.send("<h2>Server(Backend) Berjalan!</h2>")
})

// ------- AUTH ---------

router.post('/signup', authController.signUp)
router.post('/login', authController.login)
router.get('/users', auth.auth, authController.getAllUsers)
router.get('/user/:id', authController.getUserById)
router.delete('/user/delete/:id', authController.deleteUserById)

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