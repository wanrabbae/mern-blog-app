const express = require('express')
const postsController = require('../controllers/postsController')

const router = express.Router()

router.get('/', (req, res) => {
    res.send("<h2>Error 404 Page Not Found!!</h2>")
})

// ------- POST ---------
router.get('/posts', postsController.getAllPost)
router.post('/posts', postsController.createPost)

// ------- POST ---------

module.exports = router