const express = require("express");
const router = express.Router();
const {
  update,
  casesView,
  login,
  payment,
} = require("../Controllers/Lawyer.controller");
const { verifyPublicKey } = require("../Helper/publicKeyVerifier.helper");
const { verifyLogin } = require("../Helper/loginVerifier.helper");
const { userIdAsId } = require("../Helper/userIdAsId.helper");

router.post("/update", verifyPublicKey, verifyLogin, userIdAsId, update);
router.post("/case-view", verifyPublicKey, verifyLogin, userIdAsId, casesView);
router.post("/payment", verifyPublicKey, verifyLogin, userIdAsId, payment);
router.post("/login", verifyPublicKey, login);

// router.post("/update", update);
// router.post("/case-view", casesView);
// router.post("/login", login);
// router.post("/payment", payment);

module.exports = router;
