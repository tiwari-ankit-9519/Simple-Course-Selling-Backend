const { Admin } = require("../db/dbConnect");

async function adminMiddleware(req, res, next) {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({
    username: username,
    password: password,
  });

  if (!admin) {
    return res.status(403).json({
      msg: "Admin does not exists",
    });
  }
  next();
}

module.exports = adminMiddleware;
