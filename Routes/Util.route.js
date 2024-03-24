const express = require("express");
const router = express.Router({ mergeParams: false });

const UtilController = require("../Controllers/Util.Controller");

router.get("/court", UtilController.getAllCourts);
router.post("/judge-lawyer", UtilController.getCourtJudgesLawyers);

module.exports = router;
