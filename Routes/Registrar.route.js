const express = require("express");
const router = express.Router({ mergeParams: false });
const {
  register,
  registerCase,
  registerJudge,
  registerLawyer,
  updateRegistrar,
  registerCourt,
  login,
  updateCourt,
  getSchedule,
  assignDate,
  addSummery,
} = require("../controllers/Registrar.controller");
const { verifyLogin } = require("../Helper/loginVerifier.helper");
const { verifyPublicKey } = require("../Helper/publicKeyVerifier.helper");
const { userIdAsId } = require("../Helper/userIdAsId.helper");

router.post("/register", verifyPublicKey, register);
router.post("/register-judge", verifyPublicKey, verifyLogin, registerJudge);
router.post("/register-lawyer", verifyPublicKey, verifyLogin, registerLawyer);
router.post("/register-case", verifyPublicKey, verifyLogin, registerCase);
router.post(
  "/update-registrar",
  verifyPublicKey,
  verifyLogin,
  userIdAsId,
  updateRegistrar
);
router.post("/register-court", verifyPublicKey, verifyLogin, registerCourt);
router.post("/update-court", verifyPublicKey, verifyLogin, updateCourt);
router.post("/login", verifyPublicKey, login);
router.get("/get-Schedule", verifyPublicKey, verifyLogin, getSchedule);
router.post("/date-selected", verifyPublicKey, verifyLogin, assignDate);
router.post("/add-Summery", verifyPublicKey, verifyLogin, addSummery);

// write all routes without the helper functions
// router.post("/register", register);
// router.post("/register-judge", registerJudge);
// router.post("/register-lawyer", registerLawyer);
// router.post("/register-case", registerCase);
// router.post("/update-registrar", updateRegistrar);
// router.post("/register-court", registerCourt);
// router.post("/update-court", updateCourt);
// router.post("/login", login);
// router.get("/get-Schedule", getSchedule);
// router.post("/date-selected", assignDate);
// router.post("/add-Summery", addSummery);

module.exports = router;
