const AuthModel = require('../models/Auth')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

// error handling
const errorHandler = (err) => {
    let errors = {
        nama: '',
        email: '',
        password: ''
    }

    if (err.code === 11000) {
        errors.email = 'Email sudah terdaftar!'
    } else if (err.message.includes('auth validation failed')) {
        Object.values(err.errors).forEach(({
            properties
        }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

const createToken = (email) => {
    return jwt.sign({
        email
    }, 'testing', {
        expiresIn: '2h'
    })
}

// sign up
exports.signUp = async (req, res) => {
    const {
        nama,
        email,
        password
    } = req.body

    try {
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await AuthModel.create({
            nama: nama,
            email: email,
            password: hashedPassword,
        })

        res.status(201).json({
            user: user._id,
            status: 'success',
            message: 'Sign up berhasil, silahkan login terlebih dahulu'
        })
    } catch (err) {
        const errors = errorHandler(err)
        res.status(400).json({
            status: 'failed',
            err: errors

        })
    }
}

// login
exports.login = async (req, res) => {
    try {
        const findUser = await AuthModel.findOne({
            email: req.body.email
        })

        if (!findUser) {
            res.status(404).json({
                status: 'failed',
                message: 'Email yang anda masukan salah!'
            })
        }

        // check password
        const auth = await bcrypt.compare(req.body.password, findUser.password)

        if (!auth) {
            res.status(400).json({
                status: 'failed',
                message: 'Password yang anda masukan salah!'
            })
        }

        // sampe sini berhasil

        const token = createToken(findUser.email)

        res.header('auth-token', token)

        res.status(200).json({
            user: findUser._id,
            status: 'success',
            message: 'Log in berhasil!',
            token: token
        })

    } catch (err) {
        res.json({
            status: 'failed'
        })
    }
}

// WARNING INI BELUM DI PAGINATION !!
exports.getAllUsers = async (req, res) => {
    try {
        const users = await AuthModel.find()

        if (!req.decoded) return res.status(401).json({
            status: 'failed',
            message: 'Anda belum login!'
        })

        if (!users) return res.status(404).json({
            status: 'failed',
            message: 'Tidak ada data'
        })

        res.status(200).json({
            status: 'success',
            users: users,
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed'
        })
    }
}

// getProfile algoritma = ambil email dari params url -> ambil token di headers (auth-token) -> lalu encode tokenya -> ambil email user dari token -> ambil data user berdasarkan email dari hasil encoded token

exports.getUserById = async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).json({
            status: 'failed',
            message: 'User tidak ditemukan'
        })

        const user = await AuthModel.findById(req.params.id)

        res.status(200).json({
            status: 'success',
            user: user
        })
    } catch (err) {
        res.json({
            status: 'failed'
        })
    }
}

exports.deleteUserById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).json({
            status: 'failed',
            message: 'User tidak ditemukan'
        })

        const deleteUser = await AuthModel.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: 'success',
            user: deleteUser._id,
            message: 'Hapus akun berhasil!'
        })
    } catch (err) {
        res.json({
            status: 'failed'
        })
        console.log(err.message);
    }
}