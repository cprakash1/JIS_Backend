const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT_ROUNDS || 10;

class Bcrypt {
  hashPassword(password) {
    return bcrypt.hash(password, saltRounds);
  }

  comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  compareTwoHashes(hash1, hash2) {
    return bcrypt.compare(hash1, hash2);
  }
}

module.exports = new Bcrypt();
