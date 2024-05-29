const { Router } = require("express");
const { Admin, Course } = require("../db/dbConnect");
const adminMiddleware = require("../middlewares/admin");
const router = Router();

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  await Admin.create({
    username,
    password,
  });

  res.json({
    msg: "Admin created successfully",
  });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  const { title, description, price, imageLink } = req.body;

  const newCourse = await Course.create({
    title,
    description,
    price,
    imageLink,
  });

  res.json({
    msg: "Course created successfully",
    courseId: newCourse._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  const courses = await Course.find({});

  if (!courses) {
    return res.status(400).json({
      msg: "No courses found",
    });
  }

  res.json({
    msg: "Courses fetched succesfully",
    courses,
  });
});

module.exports = router;
