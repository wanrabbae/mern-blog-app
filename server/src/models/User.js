const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema({
  avatar: {
    type: {
      String,
    },
    default: {
      url: "https://res.cloudinary.com/touchme/image/upload/v1628760733/userDefault_n8pn0l.png",
      public_id: "userDefault_n8pn0l",
    },
  },
  name: {
    type: String,
    required: [true, "Nama harus diisi!"],
    unique: [true, "Nama sudah digunakan!"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email harus diisi!"],
    validate: [isEmail, "Email tidak valid!"],
  },
  password: {
    type: String,
    required: [true, "Password harus diisi!"],
    minLength: [7, "Password minimal 7 karakter!"],
  },
  social: {
    type: [Object],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
