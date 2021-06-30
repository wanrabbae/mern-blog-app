const PostsModel = require('../models/Posts')

// mengambil semua post
module.exports.getAllPost = async (req, res) => {
    try {
        const post = await PostsModel.find()

        res.status(200).json({
            status: "success",
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
    // "penulis" disini maksudnya adalah user
    try {
        const postUser = await PostsModel.find({
            penulis: req.params.user
        })

        // if (!postUser) {
        //     res.status(404).json({
        //         status: "failed",
        //         message: "Daftar post berdasarkan user tidak ditemukan",
        //         data: postUser
        //     })
        //     return false
        // }

        res.status(200).json({
            status: "success",
            data: postUser
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

// mengambil post berdasarkan slug
module.exports.getPostBySlug = async (req, res) => {
    try {
        const post = await PostsModel.findOne({
            slug: req.params.slug
        })

        res.status(200).json({
            status: "success",
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

    // generate slug
    const judul = data.judul.split(" ")
    const slug = judul.join("-")

    try {
        const save = await PostsModel.create({
            penulis: data.penulis,
            img: data.img,
            kategori: data.kategori,
            judul: data.judul,
            slug: slug,
            content: data.content,
            created_at: new Date().toDateString()
        })

        res.status(201).json({
            status: "success",
            message: "Post berhasil!"
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
        console.log(err);
    }
}