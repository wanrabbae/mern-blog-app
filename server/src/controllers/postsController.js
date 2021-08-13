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
module.exports.getAllPostUser = async (req, res) => {
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
module.exports.getPostById = async (req, res) => {
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
module.exports.getPostByKategori = async (req, res) => {
    await PostsModel.find({
            kategori: req.params.kategori.toLowerCase()
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
module.exports.createPost = async (req, res) => {
    const data = req.body

    await PostsModel.create({
            penulis: data.penulis,
            img: data.img,
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
}

// update post
module.exports.updatePost = async (req, res) => {
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