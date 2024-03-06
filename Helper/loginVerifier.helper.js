const LOGIN_SECRET = process.env.JWT_PUBLIC_KEY + process.env.JWT_PRIVATE_KEY;
const jwt = require("../Utils/jwt.class");

exports.verifyLogin = async (req, res, next) => {
  try {
    const token = req.body.loginToken;
    const decoded = await jwt.decodeTokenWithSecret(token, LOGIN_SECRET);
    if (decoded) {
      req.body = { ...req.body, userId: decoded.id };
      delete req.body.loginToken;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
