const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://tiwariankit3105:ankit123@cluster0.hmwjthp.mongodb.net/Course?retryWrites=true&w=majority&appName=Cluster0"
);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  coursePurchased: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageLink: String,
  price: Number,
});

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = {
  Admin,
  User,
  Course,
};
