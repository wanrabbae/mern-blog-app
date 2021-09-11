const express = require('express')
const multer = require('multer')
const upload = multer({
    dest: 'asset/'
})
const postsController = require('../controllers/postsController')
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/', (req, res) => {
    res.send("<h2>Server(Backend) Berjalan!</h2>")
})

// ------- AUTH ---------

router.post('/signup', authController.signUp)
router.post('/signin', authController.login)
router.get('/users', authController.getAllUsers)
router.get('/user/getProfile', auth.auth, authController.getProfile)
router.delete('/user/delete/:id', auth.auth, authController.deleteUserById)

// ------- AUTH ---------

// ------- POST ---------
router.get('/posts', postsController.getAllPost)
router.get('/posts/user/:user', auth.auth, postsController.getAllPostUser)
router.get('/post/:id', postsController.getPostById)
router.get('/posts/:kategori', postsController.getPostByKategori)
router.post('/posts', auth.auth, upload.single('cover'), postsController.createPost)
router.put('/posts/:id', auth.auth, postsController.updatePost)
router.delete('/post/:id', auth.auth, postsController.deletePost)
// ------- POST ---------

module.exports = router