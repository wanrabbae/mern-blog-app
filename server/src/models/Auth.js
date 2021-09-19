const mongoose = require('mongoose')
const {
    isEmail
} = require('validator')

const authSchema = mongoose.Schema({
    avatar: {
        type: {
            String
        },
        default: {
            url: 'https://res.cloudinary.com/touchme/image/upload/v1628760733/userDefault_n8pn0l.png',
            public_id: 'userDefault_n8pn0l'
        }
    },
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
    medsos: {
        type: [Object],
    }
})

const Auth = mongoose.model('auth', authSchema)

module.exports = Auth