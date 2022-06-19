const express = require("express");
const multer = require("multer");
const upload = multer({
  dest: "asset/",
});
const postsController = require("../controllers/postsController");
const userController = require("../controllers/userController");
const categoryController = require("../controllers/categoryController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h2>Server(Backend) Berjalan!</h2>");
});

// ------- AUTH / USER ---------

router.post("/signup", userController.signUp);
router.post("/signin", userController.login);
router.get("/users", userController.getAllUsers);
router.get("/user/getProfile", auth.auth, userController.getProfile);
router.get("/users/:id", userController.getUserById);
router.put(
  "/user/updateProfile",
  upload.single("picture"),
  auth.auth,
  userController.updateProfile
);
router.delete("/user/deleteProfile", auth.auth, userController.deleteProfile);
router.post("/user/activation", userController.activationController);
router.post("/google/login", userController.googleController);

// ------- AUTH / USER ---------

// ------- POST ---------
router.get("/posts", postsController.getAllPost);
router.get("/posts/user/", auth.auth, postsController.getAllPostUser);
router.get("/post/:id", postsController.getPostById);
router.get("/posts/:kategori", postsController.getPostByKategori);
router.post(
  "/posts",
  auth.auth,
  upload.single("cover"),
  postsController.createPost
);
router.put(
  "/posts/:id",
  auth.auth,
  upload.single("cover"),
  postsController.updatePost
);
router.delete("/post/:id", auth.auth, postsController.deletePost);
// ------- POST ---------

// ------- CATEGORY ---------
router.get("/categories", categoryController.getCategory);
router.post("/categories", auth.isAdmin, categoryController.createCategory);
router.delete(
  "/categories/:id",
  auth.isAdmin,
  categoryController.deleteCategory
);
// ------- CATEGORY ---------

module.exports = router;
