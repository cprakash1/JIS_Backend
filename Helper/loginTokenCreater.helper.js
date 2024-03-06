const LOGIN_SECRET = process.env.JWT_PUBLIC_KEY + process.env.JWT_PRIVATE_KEY;
const jwt = require("../Utils/jwt.class");

exports.createLoginToken = async (payload) => {
  try {
    return await jwt.generateTokenWithSECRET(payload, LOGIN_SECRET);
  } catch (error) {
    throw new Error("Error in createLoginToken");
  }
};
