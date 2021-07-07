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
        required: [true, 'Email harus diisi!'],
        unique: true,
        validate: [isEmail, 'Email tidak valid!']
    },
    password: {
        type: String,
        required: [true, 'Password harus diisi!'],
        minLength: [7, 'Password minimal 7 karakter!']
    }
})

const Auth = mongoose.model('auth', authSchema)

module.exports = Auth