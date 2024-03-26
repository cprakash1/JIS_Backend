const express = require("express");
const router = express.Router();
const {
  update,
  caseView,
  login,
  getCompleteDetails,
  searchByKeyword,
} = require("../Controllers/Judge.controller");
const { verifyLogin } = require("../Helper/loginVerifier.helper");
const { verifyPublicKey } = require("../Helper/publicKeyVerifier.helper");
const { userIdAsId } = require("../Helper/userIdAsId.helper");

// router.post("/update", verifyPublicKey, verifyLogin, userIdAsId, update);
// router.post("/case-view", verifyPublicKey, verifyLogin, userIdAsId, caseView);
// router.post("/login", verifyPublicKey, login);

router.post("/update", verifyLogin, userIdAsId, update);
router.post("/case-view", verifyLogin, userIdAsId, caseView);
router.post("/login", login);
router.post(
  "/get-complete-details",
  verifyLogin,
  userIdAsId,
  getCompleteDetails
);
router.post("/search", verifyLogin, userIdAsId, searchByKeyword);

module.exports = router;
