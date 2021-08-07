const mongoose = require('mongoose')
const {
    isEmail
} = require('validator')

const authSchema = mongoose.Schema({
    nama: {
        type: String,
        required: [true, 'Nama harus diisi!']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email harus diisi!'],
        validate: [isEmail, 'Email tidak valid!']
    },
    password: {
        type: String,
        required: [true, 'Password harus diisi!'],
        minLength: [7, 'Password minimal 7 karakter!']
    },
    token: {
        type: String,
    }
})

const Auth = mongoose.model('auth', authSchema)

module.exports = Auth