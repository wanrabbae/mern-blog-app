const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    penulis: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: [true, 'Gambar harus di upload!']
    },
    kategori: {
        type: String,
        required: [true, 'Masukan kategori!']
    },
    judul: {
        type: String,
        required: [true, 'Judul harus diisi!']
    },
    content: {
        type: String,
        required: [true, 'Content harus diisi!'],
        maxLength: [30000, 'Content maximal hanya 30000 karakter']
    },
    created_at: {
        type: String,
    },
    updated_at: {
        type: String,
    }
})

const Post = mongoose.model('posts', postSchema)

module.exports = Post