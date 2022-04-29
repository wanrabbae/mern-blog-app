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
  level: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  bio: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email harus diisi!"],
    validate: [isEmail, "Email tidak valid!"],
  },
  password: {
    type: String,
  },
  social: {
    type: [Object],
  },
  post: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  isActive: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
