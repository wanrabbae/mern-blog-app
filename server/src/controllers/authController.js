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
    }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: '50m'
    })
}

// sign up
const signUp = async (req, res) => {
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
const login = async (req, res) => {
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
const getAllUsers = async (req, res) => {
    try {
        const users = await AuthModel.find({}, {
            _id: 0,
            __v: 0,
            password: 0
        }).sort({
            nama: 1
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

// getProfile algoritma = ambil email dari params url -> ambil token di headers (auth-token) -> lalu decode tokenya -> ambil email user dari token -> ambil data user berdasarkan email dari hasil encoded token

const getProfile = async (req, res) => {
    try {
        const token = req.header('auth-token')
        const decodeToken = jwt.decode(token, process.env.JWT_TOKEN_SECRET)

        const findUser = await AuthModel.findOne({
            email: decodeToken.email
        })

        if (!findUser) return res.status(401).json({
            status: 'failed',
            message: 'Anda belum login!'
        })

        res.status(200).json({
            status: 'success',
            user: findUser
        })

    } catch (err) {
        res.json({
            status: 'failed'
        })
    }
}

const deleteUserById = async (req, res) => {
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

module.exports = {
    signUp,
    login,
    getAllUsers,
    getProfile,
    deleteUserById
}