const { Router } = require("express");
const { User, Course } = require("../db/dbConnect");
const userMiddleware = require("../middlewares/user");
const router = Router();
const mongoose = require("mongoose");

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const userExists = await User.findOne({
    username,
  });

  if (userExists) {
    return res.json({
      msg: "User already exists",
    });
  }

  const user = await User.create({
    username,
    password,
  });

  res.json({
    msg: "User created successfully",
    user,
  });
});

router.get("/courses", userMiddleware, async (req, res) => {
  const courses = await Course.find({});

  res.json({
    msg: "Courses fetched successfully",
    courses,
  });
});

router.post("/purchase/:id", userMiddleware, async (req, res) => {
  const username = req.headers.username;
  const courseId = req.params.id;
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(400).json({
      msg: "Course not found!",
    });
  }

  try {
    await User.updateOne(
      {
        username: username,
      },
      {
        $push: {
          coursePurchased: courseId,
        },
      }
    );
  } catch (e) {
    console.log(e);
  }

  res.json({
    msg: "Course purchased successfully!",
  });
});

router.get("/purchased-course", async (req, res) => {
  const user = await User.findOne({
    username: req.headers.username,
  });

  const courses = await Course.find({
    _id: {
      $in: user.coursePurchased,
    },
  });

  res.json({
    msg: "Courses fetched successfully",
    courses,
  });
});

module.exports = router;
