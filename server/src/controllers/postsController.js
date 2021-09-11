const PostsModel = require('../models/Posts')
const {
    cloudinary
} = require('../../config/cloudinary')
const fs = require('fs')

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
const getAllPost = async (req, res) => {
    const currentPage = req.query.page || 1
    const perPage = req.query.perPage || 5
    let totalData

    await PostsModel.find()
        .countDocuments()

        .then(count => {
            totalData = count
            return PostsModel.find()
                .skip((parseInt(currentPage) - 1) * parseInt(perPage))
                .limit(parseInt(perPage))
                .sort({
                    _id: -1
                })
        })

        .then(result => {
            res.status(200).json({
                status: "success",
                blogs: result,
                totalData: parseInt(totalData),
                page: parseInt(currentPage),
                perPage: parseInt(perPage)
            })
        })
        .catch(err => {
            res.status(400).json({
                status: 'failed',
                message: err.message
            })
        })
}

// mengambil semua post berdasarkan user
const getAllPostUser = async (req, res) => {
    const currentPage = req.query.page || 1
    const perPage = req.query.perPage || 5
    let totalData

    await PostsModel.find({
            penulis: req.params.user
        })
        .countDocuments()

        .then(count => {
            totalData = count
            return PostsModel.find({
                    penulis: req.params.user
                })
                .skip((parseInt(currentPage) - 1) * parseInt(perPage))
                .limit(parseInt(perPage))
        })

        .then(result => {
            res.status(200).json({
                status: "success",
                blogs: result,
                totalData: parseInt(totalData),
                page: parseInt(currentPage),
                perPage: parseInt(perPage)
            })
        })
        .catch(err => {
            res.status(400).json({
                status: 'failed',
                message: err.message
            })
        })

}

// mengambil post berdasarkan id
const getPostById = async (req, res) => {
    await PostsModel.findOne({
            _id: req.params.id
        })
        .then(result => {
            res.status(200).json({
                status: "success",
                dataCount: result.length,
                blogs: result
            })
        })
        .catch(err => {
            res.status(400).json({
                status: 'failed',
                message: err.message
            })
        })
}

// mengambil post berdasarkan kategori
// WARNING!! INI BELUM DI PAGINATION KARENA KATEGORI MSH SEDIKIT
const getPostByKategori = async (req, res) => {
    await PostsModel.find({
            kategori: req.params.kategori.toLowerCase()
        })
        .sort({
            _id: -1
        })
        .then(result => {
            res.status(200).json({
                status: "success",
                dataCount: result.length,
                blogs: result
            })
        })
        .catch(err => {
            res.status(400).json({
                status: 'failed',
                message: err.message
            })
        })
}

// membuat post
const createPost = async (req, res) => {
    const data = req.body

    await cloudinary.uploader.upload(req.file.path, (err, result) => {
        if (err) console.log(err)

        PostsModel.create({
                penulis: data.penulis,
                cover: {
                    url: result.secure_url,
                    public_id: result.public_id
                },
                kategori: data.kategori.toLowerCase(),
                judul: data.judul,
                content: data.content,
                created_at: new Date().toDateString(),
                updated_at: new Date().toDateString()
            })
            .then(result => {
                res.status(201).json({
                    status: "success",
                    message: "Berhasil membuat Post!",
                    id: result._id
                })
            })
            .catch(err => {
                const errors = handleErrors(err)
                res.status(400).json({
                    status: "failed",
                    error: errors
                })
            })

        fs.unlinkSync(req.file.path)
    })

}

// update post
const updatePost = async (req, res) => {
    const id = req.params.id

    await PostsModel.findByIdAndUpdate(id, {
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
const deletePost = async (req, res) => {
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

module.exports = {
    getAllPost,
    getAllPostUser,
    getPostById,
    getPostById,
    getPostByKategori,
    createPost,
    updatePost,
    deletePost
}