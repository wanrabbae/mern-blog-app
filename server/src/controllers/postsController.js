const PostsModel = require('../models/Posts')

// errors handling
const handleErrors = (err) => {
    let errors = {
        img: '',
        kategori: '',
        judul: '',
        content: '',
    }

    if (err.message.includes('posts validation failed')) {
        Object.values(err.errors).forEach(({
            properties
        }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

// mengambil semua post
module.exports.getAllPost = async (req, res) => {
    try {
        const post = await PostsModel.find()

        res.status(200).json({
            status: "success",
            dataCount: post.length,
            data: post
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

// mengambil semua post berdasarkan user
module.exports.getAllPostUser = async (req, res) => {
    // "user" disini maksudnya adalah nama
    try {
        const postUser = await PostsModel.find({
            penulis: req.params.user
        })

        res.status(200).json({
            status: "success",
            dataCount: postUser.length,
            data: postUser
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

// mengambil post berdasarkan id
module.exports.getPostById = async (req, res) => {
    try {
        const post = await PostsModel.findOne({
            _id: req.params.id
        })

        res.status(200).json({
            status: "success",
            dataCount: post.length,
            data: post
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

// mengambil post berdasarkan kategori
module.exports.getPostByKategori = async (req, res) => {
    try {
        const post = await PostsModel.find({
            kategori: req.params.kategori
        })

        res.status(200).json({
            status: "success",
            dataCount: post.length,
            data: post
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

// membuat post
module.exports.createPost = async (req, res) => {
    const data = req.body

    try {
        const save = await PostsModel.create({
            penulis: data.penulis,
            img: data.img,
            kategori: data.kategori.toLowerCase(),
            judul: data.judul,
            content: data.content,
            created_at: new Date().toDateString(),
            updated_at: new Date().toDateString()
        })

        res.status(201).json({
            status: "success",
            message: "Berhasil membuat Post!"
        })
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({
            status: "failed",
            error: errors
        })
    }
}

// update post
module.exports.updatePost = async (req, res) => {
    const id = req.params.id
    const update = await PostsModel.findByIdAndUpdate(id, {
            penulis: req.body.penulis,
            img: req.body.img,
            kategori: req.body.kategori.toLowerCase(),
            judul: req.body.judul,
            content: req.body.content,
            updated_at: new Date().toDateString(),
        })
        .then((result) => {
            if (!result) {
                res.status(404).json({
                    status: 'failed',
                    message: 'Post tidak ditemukan!'
                })
            }

            res.status(200).json({
                status: 'success',
                message: 'Update post berhasil!'
            })
        })
        .catch((err) => {
            res.json({
                status: 'failed',
                message: err.message
            })
        })
}

// menghapus post
module.exports.deletePost = async (req, res) => {
    const id = req.params.id

    await PostsModel.findByIdAndDelete(id)
        .then((result) => {
            if (!result) {
                res.status(404).json({
                    status: 'failed',
                    message: 'Post tidak ditemukan!'
                })
            }

            res.status(200).json({
                status: "success",
                message: "Post berhasil dihapus!"
            })
        })
        .catch((err) => {
            res.json({
                status: 'failed',
                message: err.message
            })
        })
}