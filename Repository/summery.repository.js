const Summery = require("../Models/Summery.model");

class SummeryRepository {
  async create(SummeryData) {
    try {
      if (!SummeryData) throw new Error("Summery data is required");
      if (!SummeryData.case) throw new Error("Case is required");
      if (!SummeryData.comment) throw new Error("Comment is required");
      if (!SummeryData.status) throw new Error("Status is required");
      let date = Date.now();
      if (SummeryData.date) date = SummeryData.date;
      const newSummery = new Summery({ ...SummeryData, date });
      return await newSummery.save();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new SummeryRepository();
