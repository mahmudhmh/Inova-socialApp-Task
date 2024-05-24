require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const postRoutes = require("./routes/postRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

const User = require("./models/userModel");
const Post = require("./models/postModel");
const Review = require("./models/reviewModel");
const seedDatabase = require("./seed/seed");

mongoose
  .connect(mongoUri, {})
  .then(async () => {
    console.log("Connected to MongoDB");

    const usersCount = await User.countDocuments();
    const postsCount = await Post.countDocuments();
    const reviewsCount = await Review.countDocuments();

    if (usersCount === 0 || postsCount === 0 || reviewsCount === 0) {
      console.log("Database is empty. Seeding data...");
      await seedDatabase();
      console.log("Database seeded successfully");
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.use(express.json());
app.use(postRoutes);
app.use(reviewRoutes);
app.use(userRoutes);
