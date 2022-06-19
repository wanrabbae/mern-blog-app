const PostsModel = require("../models/Posts");
const UserModel = require("../models/User");
const CategoryModel = require("../models/Category");
const { cloudinary } = require("../../config/cloudinary");
const fs = require("fs");
const { log } = require("console");

// errors handling
const handleErrors = (err) => {
  let errors = {
    cover: "",
    category: "",
    title: "",
    content: "",
  };

  if (err.message.includes("posts validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// mengambil semua post
const getAllPost = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let totalData;

  await PostsModel.find()
    .countDocuments()

    .then((count) => {
      totalData = count;
      return (
        PostsModel.find()
          // .select("-content")
          .skip((parseInt(currentPage) - 1) * parseInt(perPage))
          .limit(parseInt(perPage))
          .sort({
            _id: -1,
          })
          .populate("user", "name")
      );
    })

    .then((result) => {
      res.status(200).json({
        status: "success",
        blogs: result,
        totalData: parseInt(totalData),
        page: parseInt(currentPage),
        perPage: parseInt(perPage),
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "failed",
        message: err.message,
      });
    });
};

// mengambil semua post berdasarkan user
const getAllPostUser = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let totalData;

  await PostsModel.find({})
    .populate("user", "name")
    .countDocuments()

    .then((count) => {
      totalData = count;
      return PostsModel.find({
        penulis: req.params.user,
      })
        .skip((parseInt(currentPage) - 1) * parseInt(perPage))
        .limit(parseInt(perPage))
        .sort({
          _id: -1,
        });
    })

    .then((result) => {
      res.status(200).json({
        status: "success",
        blogs: result,
        totalData: parseInt(totalData),
        page: parseInt(currentPage),
        perPage: parseInt(perPage),
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "failed",
        message: err.message,
      });
    });
};

// mengambil post berdasarkan id
const getPostById = async (req, res) => {
  await PostsModel.findOne({
    _id: req.params.id,
  })
    .populate("user", "name")
    .then((result) => {
      res.status(200).json({
        status: "success",
        dataCount: result.length,
        blogs: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "failed",
        message: err.message,
      });
    });
};

// mengambil post berdasarkan kategori
const getPostByKategori = async (req, res) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let totalData;

  await CategoryModel.find({
    name: req.params.kategori.toLowerCase(),
  })
    .countDocuments()
    .then((count) => {
      totalData = count;
      return (
        CategoryModel.find({
          name: req.params.kategori.toLowerCase(),
        })
          // .select("-content")
          .skip((parseInt(currentPage) - 1) * parseInt(perPage))
          .limit(parseInt(perPage))
          .sort({
            _id: -1,
          })
          .populate("posts")
      );
    })
    .then((result) => {
      res.status(200).json({
        status: "success",
        blogs: result,
        totalData: parseInt(totalData),
        page: parseInt(currentPage),
        perPage: parseInt(perPage),
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "failed",
        message: err.message,
      });
    });
};

// membuat post
const createPost = async (req, res) => {
  const data = req.body;
  const idUser = req.decoded.id; // id user yang sedang login berasal dari middleware auth
  console.log(data.title);
  await cloudinary.uploader.upload(req.file.path, (err, result) => {
    if (err) console.log(err);

    PostsModel.create({
      user: idUser,
      cover: {
        url: result.secure_url,
        public_id: result.public_id,
      },
      category: data.category.toLowerCase(),
      title: data.title,
      description: data.description,
      content: data.content,
    })
      .then(async (result) => {
        // push post id to user collection post array
        const userById = await UserModel.findById(idUser);
        userById.post.push(result._id);
        await userById.save();

        const categoryById = await CategoryModel.findOne({
          name: data.category.toLowerCase(),
        });
        categoryById.posts.push(result._id);
        await categoryById.save();

        res.status(201).json({
          status: "success",
          message: "Berhasil membuat Post!",
          data: result,
        });
      })
      .catch((err) => {
        console.log(err);
        const errors = handleErrors(err);
        res.status(400).json({
          status: "failed",
          error: errors,
        });
      });

    fs.unlinkSync(req.file.path);
  });
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const findPost = await PostsModel.findById(id);

  if (!findPost) {
    res.status(404).json({
      status: "failed",
      message: "Post tidak ditemukan!",
    });
  }
  // hapus cover lama
  cloudinary.uploader.destroy(findPost.cover.public_id);

  // upload cover baru dan update data
  await cloudinary.uploader.upload(req.file.path, (err, result) => {
    if (err) console.log(err);

    PostsModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          cover: {
            url: result.secure_url,
            public_id: result.public_id,
          },
          category: data.category.toLowerCase(),
          title: data.title,
          content: data.content,
        },
      }
    )
      .then((result) => {
        res.status(200).json({
          status: "success",
          message: "Berhasil mengubah Post!",
          data: result,
        });
      })
      .catch((err) => {
        const errors = handleErrors(err);
        res.status(400).json({
          status: "failed",
          error: errors,
        });
      });

    fs.unlinkSync(req.file.path);
  });
};

// menghapus post
const deletePost = async (req, res) => {
  const id = req.params.id;

  await PostsModel.findByIdAndDelete(id)
    .then(async (result) => {
      // hapus cover pada cloudinary
      cloudinary.uploader.destroy(result.cover.public_id);

      if (!result) {
        res.status(404).json({
          status: "failed",
          message: "Post tidak ditemukan!",
        });
      }

      res.status(200).json({
        status: "success",
        message: "Post berhasil dihapus!",
      });
    })
    .catch((err) => {
      res.json({
        status: "failed",
        message: err.message,
      });
    });
};

module.exports = {
  getAllPost,
  getAllPostUser,
  getPostById,
  getPostByKategori,
  createPost,
  updatePost,
  deletePost,
};
