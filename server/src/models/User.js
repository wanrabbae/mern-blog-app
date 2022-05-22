const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema({
  avatar: {
    type: {
      String,
    },
    // default: {
    //   url: "https://res.cloudinary.com/touchme/image/upload/v1651550876/UserDefault_404404379_aoxjai.png",
    //   public_id: "UserDefault_404404379_aoxjai",
    // },
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
    required: [true, "Email must filled!"],
    validate: [isEmail, "Email not valid!"],
  },
  password: {
    type: String,
  },
  social: {
    type: Object,
    default: {
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/",
      twitter: "https://www.twitter.com/",
      github: "https://www.github.com/",
    },
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
