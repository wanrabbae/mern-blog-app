const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { cloudinary } = require("../../config/cloudinary");

// error handling
const errorHandler = (err) => {
  let errors = {
    name: "",
    email: "",
    password: "",
  };

  if (err.code == 11000) {
    errors.email = "Email sudah terdaftar!";
  } else if (err.message.includes("auth validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const createToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

// sign up
const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.insertMany({
      name: name,
      email: email,
      password: hashedPassword,
      social: [
        {
          facebook: "https://www.facebook.com/",
        },
        {
          instagram: "https://www.instagram.com/",
        },
        {
          twitter: "https://www.twitter.com/",
        },
        {
          github: "https://www.github.com/",
        },
      ],
    });

    const token = createToken(user[0]._id);

    res.status(201).json({
      user: user._id,
      status: "success",
      message: "Berhasil Sign Up, silahkan login terlebih dahulu",
      token: token,
      data: user,
    });
  } catch (err) {
    const errors = errorHandler(err);
    console.log(err);
    res.status(400).json({
      status: "failed",
      errors: errors,
    });
  }
};

// login
const login = async (req, res) => {
  try {
    const findUser = await UserModel.findOne({
      email: req.body.email,
    });

    if (!findUser) {
      res.status(404).json({
        status: "failed",
        message: "Email yang anda masukan salah!",
      });
    }

    // check password
    const auth = await bcrypt.compare(req.body.password, findUser.password);

    if (!auth) {
      res.status(400).json({
        status: "failed",
        message: "Password yang anda masukan salah!",
      });
    }

    // sampe sini berhasil

    const token = createToken(findUser._id);

    // res.header("Authorization", token);

    res.status(200).json({
      user: findUser._id,
      status: "success",
      message: "Berhasil Sign In!",
      token: token,
    });
  } catch (err) {
    res.json({
      status: "failed",
      message: "something went wrong :(",
    });
  }
};

// WARNING INI BELUM DI PAGINATION !!
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find(
      {},
      {
        _id: 0,
        __v: 0,
        password: 0,
      }
    ).sort({
      nama: 1,
    });

    if (!users)
      return res.status(404).json({
        status: "failed",
        message: "Tidak ada data",
      });

    res.status(200).json({
      status: "success",
      users: users,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const idUser = req.decoded.id;

    const findUser = await UserModel.findById(idUser).populate("post");

    if (!findUser)
      return res.status(401).json({
        status: "failed",
        message: "Anda belum login!",
      });

    res.status(200).json({
      status: "success",
      user: findUser,
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: "failed",
      message: "something went wrong :(",
    });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const decodeToken = req.decoded;

    await UserModel.deleteOne({
      _id: decodeToken.id,
    });

    res.status(200).json({
      status: "success",
      message: "Hapus akun berhasil!",
    });
  } catch (err) {
    res.json({
      status: "failed",
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(404).json({
        status: "failed",
        message: "User tidak ditemukan",
      });

    const deleteUser = await UserModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      user: deleteUser._id,
      message: "Hapus akun berhasil!",
    });
  } catch (err) {
    res.json({
      status: "failed",
    });
  }
};

const updateProfile = async (req, res) => {
  const { name, email, password, facebook, instagram, twitter, github } =
    req.body;
  const decodeToken = req.decoded;

  try {
    const findUser = await UserModel.findOne({
      _id: decodeToken.id,
    });

    if (!findUser)
      return res.status(404).json({
        status: "failed",
        message: "User tidak ditemukan!",
      });

    const deleteAvatar = await cloudinary.uploader.destroy(
      findUser.avatar.public_id
    );

    const uploadAvatar = await cloudinary.uploader.upload(req.file.path);

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.updateOne(
      {
        _id: decodeToken.id,
      },
      {
        avatar: {
          url: uploadAvatar.secure_url,
          public_id: uploadAvatar.public_id,
        },
        medsos: [
          {
            facebook: `https://www.facebook.com/${facebook}`,
          },
          {
            instagram: `https://www.instagram.com/${instagram}`,
          },
          {
            twitter: `https://www.twitter.com/${twitter}`,
          },
          {
            github: `https://www.github.com/${github}`,
          },
        ],
        name: name,
        email: email,
        password: hashedPassword,
      }
    );

    res.status(200).json({
      status: "success",
      message: "Berhasil mengubah profile!",
    });
  } catch (err) {
    const errors = errorHandler(err);
    res.status(400).json({
      status: "failed",
      errors: errors,
    });
  }
};

module.exports = {
  signUp,
  login,
  getAllUsers,
  getProfile,
  deleteUserById,
  deleteProfile,
  updateProfile,
};
