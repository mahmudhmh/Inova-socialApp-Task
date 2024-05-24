const Post = require("../models/postModel");
const Review = require("../models/reviewModel");

exports.addPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listUserPosts = async (req, res) => {
  try {
    const { userId, page = 1, limit = 10 } = req.query;
    const posts = await Post.find({ userId })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listTopPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const topPosts = await Review.aggregate([
      { $group: { _id: "$postId", averageRating: { $avg: "$rating" } } },
      { $sort: { averageRating: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: Number(limit) },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "_id",
          as: "post",
        },
      },
      { $unwind: "$post" },
    ]);
    res.status(200).json(topPosts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
