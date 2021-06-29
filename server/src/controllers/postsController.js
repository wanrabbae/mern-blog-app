const PostsModel = require('../models/Posts')

// get all post
module.exports.getAllPost = async (req, res) => {
    try {
        const post = await PostsModel.find()

        res.status(200).json({
            data: post
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

// create post
module.exports.createPost = async (req, res) => {
    const data = req.body

    try {
        const save = await PostsModel.create({
            penulis: data.penulis,
            img: data.img,
            kategori: data.kategori,
            judul: data.judul,
            content: data.content
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