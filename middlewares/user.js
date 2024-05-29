const { User } = require("../db/dbConnect");

async function userMiddleware(req, res, next) {
  const { username, password } = req.headers;
  const admin = await User.findOne({
    username: username,
    password: password,
  });

  if (!admin) {
    return res.status(403).json({
      msg: "User does not exists",
    });
  }
  next();
}

module.exports = userMiddleware;
