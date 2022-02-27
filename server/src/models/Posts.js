const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cover: {
      type: {
        String,
      },
      required: [true, "Gambar harus di upload!"],
    },
    category: {
      type: String,
      required: [true, "Masukan kategori!"],
    },
    title: {
      type: String,
      required: [true, "Judul harus diisi!"],
    },
    content: {
      type: String,
      required: [true, "Content harus diisi!"],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("posts", postSchema);

module.exports = Post;
