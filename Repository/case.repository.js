const Case = require("../Models/Case.model");
const Temp = require("../Models/Temp.model");

class CaseRepository {
  async create(caseData) {
    try {
      if (!caseData) throw new Error("Case data is required");
      if (!caseData.defendantName)
        throw new Error("Defendant name is required");
      if (!caseData.defendantAddress)
        throw new Error("Defendant address is required");
      if (!caseData.crimeType) throw new Error("Crime type is required");
      if (!caseData.dateCommitted)
        throw new Error("Date committed is required");
      if (!caseData.locationCommitted)
        throw new Error("Location committed is required");
      if (!caseData.arrestingOfficer)
        throw new Error("Arresting officer is required");
      if (!caseData.arrestDate) throw new Error("Arrest date is required");
      if (!caseData.judge) throw new Error("Judge is required");
      if (!caseData.lawyers || caseData.lawyers.length == 0)
        throw new Error("Lawyers are required");
      if (!caseData.court) throw new Error("Court is required");
      if (!caseData.victim) throw new Error("Victim is required");
      const result = await Temp.findOneAndUpdate(
        { name: "case" },
        { $inc: { count: 1 } },
        { upsert: true, new: true }
      );
      const newCase = new Case({ ...caseData, CIN: "CIN" + result.count });
      await newCase.save();
      return newCase;
    } catch (err) {
      throw err;
    }
  }

  async getCaseByCIN(CIN) {
    try {
      if (!CIN) throw new Error("Id is required");
      return await Case.findOne({ CIN: CIN });
    } catch (err) {
      throw err;
    }
  }
  async getCaseByCINWithInfo(CIN) {
    try {
      if (!CIN) throw new Error("Id is required");
      return await Case.findOne({ CIN: CIN })
        .populate("court", "name location")
        .populate("judge", "name id")
        .populate("lawyers", "name id")
        .populate("nextHearing", "dateTime")
        .populate("publicProsecutor", "name id")
        .populate("summery");
    } catch (err) {
      throw err;
    }
  }
  async getCaseByCINWithSchedule(CIN) {
    try {
      if (!CIN) throw new Error("Id is required");
      return await Case.findOne({ CIN: CIN }).populate("nextHearing");
    } catch (err) {
      throw err;
    }
  }

  async getAllCases() {
    try {
      return await Case.find();
    } catch (err) {
      throw err;
    }
  }
  async assignDate(CIN, _idOfSchedule) {
    try {
      if (!CIN) throw new Error("CIN is required");
      if (!_idOfSchedule) throw new Error("id of Schedule is required");
      return await Case.findOneAndUpdate(
        { CIN: CIN },
        { $set: { nextHearing: _idOfSchedule } }
      );
    } catch (err) {
      throw err;
    }
  }
  async addSummery(_idOfCase, summery) {
    try {
      if (!_idOfCase) throw new Error("id is required");
      if (!summery) throw new Error("Summery is required");
      await Case.findOneAndUpdate({ _id: _idOfCase }, { $push: { summery } });
      return;
    } catch (err) {
      throw err;
    }
  }
  async removeSchedule(_idOfCase, _idOfSchedule) {
    try {
      if (!_idOfCase) throw new Error("Case id is required");
      if (!_idOfSchedule) throw new Error("Schedule id is required");
      // remove next Hearing it is not an array
      await Case.findOneAndUpdate(
        { _id: _idOfCase },
        { $unset: { nextHearing: _idOfSchedule } }
      );
    } catch (error) {
      throw error;
    }
  }

  async closeCase(_idOfCase, closedAt) {
    try {
      if (!_idOfCase) throw new Error("Case id is required");
      await Case.findOneAndUpdate(
        { _id: _idOfCase },
        { $set: { status: "closed", closedAt } }
      );
    } catch (error) {
      throw error;
    }
  }
  async getTodayCases() {
    try {
      const cases = await Case.find(
        {
          $and: [{ nextHearing: { $exists: true } }],
        },
        "CIN nextHearing court"
      )
        .populate({
          path: "court",
          select: "name location",
        })
        .populate({
          path: "nextHearing",
          select: "dateTime",
        });
      return cases;
    } catch (error) {
      throw error;
    }
  }
  async getScheduledCases(from, to) {
    try {
      if (!from) throw new Error("From date is required");
      if (!to) throw new Error("To date is required");
      const cases = await Case.find(
        {
          $and: [
            { closedAt: { $exists: true } },
            { createdAt: { $gte: from } },
            { closedAt: { $lte: to } },
          ],
        },
        "CIN"
      );
      return cases;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CaseRepository();
