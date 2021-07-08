const AuthModel = require('../models/Auth')
const bcrypt = require('bcrypt')

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

// sign up
module.exports.signUp = async (req, res) => {
    try {
        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user = await AuthModel.create({
            nama: req.body.nama,
            email: req.body.email,
            password: hashedPassword
        })

        res.status(201).json({
            user: user._id,
            status: 'success',
            message: 'Sign up berhasil!'
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
module.exports.login = async (req, res) => {
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
        res.status(200).json({
            user: findUser._id,
            status: 'success',
            message: 'Log in berhasil!'
        })

    } catch (err) {
        res.json({
            status: 'failed'
        })
    }
}

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await AuthModel.find()

        res.status(200).json({
            status: 'success',
            data: users
        })
    } catch (err) {
        res.json({
            status: 'failed'
        })
        console.log(err.message);
    }
}

module.exports.deleteUserByEmail = async (req, res) => {
    try {
        const deleteUser = await AuthModel.deleteOne({
            email: req.params.email
        })

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