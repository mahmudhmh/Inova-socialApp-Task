const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/posts", postController.addPost);
router.get("/posts", postController.listUserPosts);
router.get("/top-posts", postController.listTopPosts);

module.exports = router;
