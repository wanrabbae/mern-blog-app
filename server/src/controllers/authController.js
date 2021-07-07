const AuthModel = require('../models/Auth')
const bcrypt = require('bcrypt')

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
            message: 'Berhasil sign up!'
        })
    } catch (err) {
        res.json({
            status: 'failed'
        })
        console.log(err.message);
    }
}

// login
module.exports.login = (req, res) => {
    try {
        res.json(req.body)
    } catch (err) {
        res.json({
            status: 'failed'
        })
        console.log(err.message);
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