const UserModel = require("../models/User");
const PostsModel = require("../models/Posts");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { cloudinary } = require("../../config/cloudinary");
const transporter = require("../utils/nodemailer");

// error handling
const errorHandler = (err) => {
  let errors = {
    name: "",
    email: "",
    password: "",
  };

  if (err.code == 11000) {
    errors.email = "Email is already registered!";
  } else if (err.message.includes("auth validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      level: user.level,
      name: user.name,
      pict: user.avatar.url,
    },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: "30d",
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
      avatar: {
        url: `https://ui-avatars.com/api/?background=random&name=${name}`,
        public_id: "UserDefault_404404379_aoxjai",
      },
      name: name,
      email: email,
      password: hashedPassword,
    });

    const tokenActivation = jwt.sign(
      {
        id: user[0]._id,
      },
      process.env.JWT_ACTIVATION_SECRET,
      {
        expiresIn: "1d",
      }
    );

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: user[0].email,
      subject: `Account activation link (IndoCoders)`,
      html: `
      <h1>Please use the following to activate your account</h1>
      <a href="${process.env.CLIENT_URL}user/activate?token=${tokenActivation}" target="_blank">ACTIVATE YOUR ACCOUNT HERE</a>
      <hr />
      <p>This email may containe sensetive information</p>
      <p>${process.env.CLIENT_URL}</p>
      `,
    };

    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        console.log("Sent email error!!");
      } else {
        console.log("Email sent!");
      }
    });

    res.status(200).json({
      status: "success",
      message: `Email has been sent to ${user[0].email} for activation`,
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
        message: "Email is incorrect!",
      });
    }

    if (findUser.isActive === false) {
      res.status(402).json({
        status: "failed",
        message: "Your account is not activated yet!",
      });
    }

    // check password
    const auth = await bcrypt.compare(req.body.password, findUser.password);

    if (!auth) {
      res.status(400).json({
        status: "failed",
        message: "Password is incorrect!",
      });
    }

    const token = createToken(findUser);

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

// google login ctrl
const googleController = async (req, res) => {
  const { email, name, avatar } = req.body;

  const findUser = await UserModel.findOne({ email });

  if (findUser) {
    const token = createToken(findUser);

    return res.status(200).json({
      status: "success",
      message: "Berhasil Sign In",
      token: token,
    });
  } else {
    let password = email + process.env.JWT_TOKEN_SECRET;
    const user = await UserModel.insertMany({
      avatar: {
        url: avatar,
        public_id: "googleLoginAvatar",
      },
      name: name,
      email: email,
      password: password,
      isActive: true,
    });

    if (!user) {
      res.status(400).json({
        status: "failed",
        message: "Something went wrong :(",
      });
    }

    const token = createToken(user[0]);

    res.status(200).json({
      status: "success",
      message: "Berhasil Sign Up",
      token: token,
    });
  }
};

// account activation controller
const activationController = async (req, res) => {
  const { token } = req.body;

  try {
    jwt.verify(
      token,
      process.env.JWT_ACTIVATION_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(400).json({
            status: "failed",
            message: "Token link is expired!",
          });
        }

        const user = await UserModel.findOne({
          _id: decoded.id,
        });

        if (!user) {
          return res.status(400).json({
            status: "failed",
            message: "User not found!",
          });
        }

        user.isActive = true;
        await user.save();

        res.status(200).json({
          status: "success",
          message: "Your account has been activated!",
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: "Account not activated! maybe your token is expired",
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

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findOne({
      _id: id,
    });

    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    if (error.status == 404)
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });

    res.status(500).json({
      status: "error",
      message: "Something went wrong",
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

    await PostModel.deleteMany({
      user: decodeToken.id,
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

    await PostsModel.deleteMany({
      user: req.params.id,
    });

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
  const { name, email, bio, password, facebook, instagram, twitter, github } =
    req.body;
  const decodeToken = req.decoded;
  let uploadAvatar;

  try {
    const findUser = await UserModel.findOne({
      _id: decodeToken.id,
    });

    if (!findUser)
      return res.status(404).json({
        status: "failed",
        message: "User tidak ditemukan!",
      });

    uploadAvatar = findUser.avatar;

    if (req.file) {
      if (
        findUser.avatar.public_id !== "UserDefault_404404379_aoxjai" ||
        findUser.avatar.public_id !== "googleLoginAvatar"
      ) {
        const deleteAvatar = await cloudinary.uploader.destroy(
          findUser.avatar.public_id
        );
      }

      uploadAvatar = await cloudinary.uploader.upload(req.file.path);
    }
    let hashedPassword;
    // hash password
    if (password) hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await UserModel.updateOne(
      {
        _id: decodeToken.id,
      },
      {
        avatar: {
          url: uploadAvatar.secure_url,
          public_id: uploadAvatar.public_id,
        },
        social: {
          facebook:
            facebook == null || facebook == undefined
              ? findUser.social.facebook
              : `https://www.facebook.com/${facebook}`,

          instagram:
            instagram == null || instagram == undefined
              ? findUser.social.instagram
              : `https://www.instagram.com/${instagram}`,

          twitter:
            twitter == null || twitter == undefined
              ? findUser.social.twitter
              : `https://www.twitter.com/${twitter}`,
          github:
            github == null || github == undefined
              ? findUser.social.github
              : `https://www.github.com/${github}`,
        },
        name: name == null || name == undefined ? findUser.name : name,
        bio: bio == null || bio == undefined ? findUser.bio : bio,
        email: email == null || email == undefined ? findUser.email : email,
        password:
          password == null || password == undefined
            ? findUser.password
            : hashedPassword,
      }
    );

    res.status(200).json({
      status: "success",
      message: "Berhasil mengubah profile!",
      data: updatedUser,
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
  getUserById,
  getProfile,
  deleteUserById,
  deleteProfile,
  updateProfile,
  activationController,
  googleController,
};
