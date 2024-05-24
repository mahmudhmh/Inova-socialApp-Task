const mongoose = require("mongoose");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const Review = require("../models/reviewModel");
const faker = require("faker");

async function seedDatabase() {
  const users = [];
  for (let i = 0; i < 100; i++) {
    const user = new User({ username: faker.internet.userName() });
    users.push(user);
    await user.save();
  }

  const posts = [];
  for (let i = 0; i < 50000; i++) {
    const post = new Post({
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(),
      userId: users[Math.floor(Math.random() * users.length)]._id,
    });
    posts.push(post);
    await post.save();
  }

  for (let i = 0; i < 20000; i++) {
    const review = new Review({
      postId: posts[Math.floor(Math.random() * posts.length)]._id,
      rating: Math.floor(Math.random() * 5) + 1,
      comment: faker.lorem.sentence(),
      userId: users[Math.floor(Math.random() * users.length)]._id,
    });
    await review.save();
  }

  console.log("Database seeded successfully");
}

module.exports = seedDatabase;
