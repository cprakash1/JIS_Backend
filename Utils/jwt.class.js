const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = process.env.JWT_EXPIRY || "24h";

class Jwt {
  async generateToken(payload) {
    return jwt.sign(payload, SECRET, {
      expiresIn: JWT_EXPIRY,
    });
  }

  async generateTokenWithExpiry(payload, expiry) {
    return jwt.sign(payload, SECRET, {
      expiresIn: expiry,
    });
  }
  async generateTokenWithSECRET(payload, secret) {
    return jwt.sign(payload, secret, {
      expiresIn: JWT_EXPIRY,
    });
  }
  async generateTokenWithExpiryAndSECRET(payload, expiry, secret) {
    return jwt.sign(payload, secret, {
      expiresIn: expiry,
    });
  }

  async verifyToken(token) {
    return jwt.verify(token, SECRET);
  }

  async decodeToken(token) {
    return jwt.decode(token, SECRET);
  }
  async decodeTokenWithSecret(token, secret) {
    return jwt.decode(token, secret);
  }
}

module.exports = new Jwt();
