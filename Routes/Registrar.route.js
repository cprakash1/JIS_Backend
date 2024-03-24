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
  getCompleteDetails,
} = require("../Controllers/Registrar.controller");
const { verifyLogin } = require("../Helper/loginVerifier.helper");
const { verifyPublicKey } = require("../Helper/publicKeyVerifier.helper");
const { userIdAsId } = require("../Helper/userIdAsId.helper");

// router.post("/register", verifyPublicKey, register);
// router.post("/register-judge", verifyPublicKey, verifyLogin, registerJudge);
// router.post("/register-lawyer", verifyPublicKey, verifyLogin, registerLawyer);
// router.post("/register-case", verifyPublicKey, verifyLogin, registerCase);
// router.post(
//   "/update-registrar",
//   verifyPublicKey,
//   verifyLogin,
//   userIdAsId,
//   updateRegistrar
// );
// router.post("/register-court", verifyPublicKey, verifyLogin, registerCourt);
// router.post("/update-court", verifyPublicKey, verifyLogin, updateCourt);
// router.post("/login", verifyPublicKey, login);
// router.get("/get-Schedule", verifyPublicKey, verifyLogin, getSchedule);
// router.post("/date-selected", verifyPublicKey, verifyLogin, assignDate);
// router.post("/add-Summery", verifyPublicKey, verifyLogin, addSummery);

// write all routes without the helper functions
router.post("/register", register);
router.post("/register-judge", verifyLogin, registerJudge);
router.post("/register-lawyer", verifyLogin, registerLawyer);
router.post("/register-case", verifyLogin, registerCase);
router.post("/update-registrar", verifyLogin, userIdAsId, updateRegistrar);
router.post("/register-court", verifyLogin, registerCourt);
router.post("/update-court", verifyLogin, updateCourt);
router.post("/login", login);
router.post("/get-Schedule", verifyLogin, getSchedule);
router.post("/date-selected", verifyLogin, assignDate);
router.post("/add-Summery", verifyLogin, addSummery);
router.post("/get-complete-details", verifyLogin, getCompleteDetails);

module.exports = router;
