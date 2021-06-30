const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    penulis: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: [true, 'Gambar wajib di upload!']
    },
    kategori: {
        type: String,
        required: [true, 'Masukan kategori!']
    },
    judul: {
        type: String,
        required: [true, 'Judul harus diisi!']
    },
    slug: {
        type: String
    },
    content: {
        type: String,
        required: [true, 'Content harus diisi!']
    },
    created_at: {
        type: String,
    }
})

const Post = mongoose.model('posts', postSchema)

module.exports = Post