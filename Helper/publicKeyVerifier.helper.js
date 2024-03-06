const PUBLIC_KEY = process.env.PUBLIC_KEY;
const jwt = require("../Utils/jwt.class");

exports.verifyPublicKey = async (req, res, next) => {
  try {
    const token = req.body.token;
    const decoded = await jwt.decodeTokenWithSecret(token, PUBLIC_KEY);
    if (decoded) {
      req.body = { ...decoded };
      delete req.body.token;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
