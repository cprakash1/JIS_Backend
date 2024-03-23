const UtilService = require("../Services/Util.service");

class UtilController {
  async getAllCourts(req, res) {
    try {
      const data = await UtilService.getAllCourts();
      res.send(data);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
  async getCourtJudgesLawyers(req, res) {
    try {
      const data = await UtilService.getCourtJudgesLawyers(req.body);
      res.send(data);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
}

module.exports = new UtilController();
