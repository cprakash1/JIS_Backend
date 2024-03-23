const Judge = require("../Models/Judge.model");
const Temp = require("../Models/Temp.model");
const Schedule = require("../Models/Schedule.model");

class JudgeRepository {
  async create(judge) {
    try {
      if (!judge) throw new Error("Judge data is required");
      if (!judge.name) throw new Error("Judge name is required");
      if (!judge.email) throw new Error("Judge email is required");
      if (!judge.password) throw new Error("Judge password is required");
      if (!judge.phone) throw new Error("Judge phone is required");
      if (!judge.address) throw new Error("Judge address is required");
      if (!judge.court) throw new Error("Judge court is required");
      const result = await Temp.findOneAndUpdate(
        { name: "judge" },
        { $inc: { count: 1 } },
        { upsert: true, new: true }
      );
      const newJudge = new Judge({
        ...judge,
        id: "J" + result.count,
      });
      return await newJudge.save();
    } catch (error) {
      throw error;
    }
  }
  async getByEmail(email) {
    try {
      if (!email) throw new Error("Email is required");
      return await Judge.findOne({ email });
    } catch (error) {
      throw error;
    }
  }
  async getById(id) {
    try {
      if (!id) throw new Error("Id is required");
      return await Judge.findOne({ id: id });
    } catch (error) {
      throw error;
    }
  }
  async getByObjectIdWithSchedule(_id) {
    try {
      if (!_id) throw new Error("Id is required");
      return await Judge.findById(_id).populate("schedule");
    } catch (error) {
      throw error;
    }
  }
  async getByPhone(phone) {
    try {
      if (!phone) throw new Error("Phone is required");
      return await Judge.findOne({ phone });
    } catch (error) {
      throw error;
    }
  }
  async getAll() {
    try {
      return await Judge.find();
    } catch (error) {
      throw error;
    }
  }
  async update(judge) {
    try {
      if (!judge) throw new Error("Judge object is required");
      if (!judge.id) throw new Error("Judge id is required");
      await Judge.findOneAndUpdate({ id: judge.id }, judge, {});
      return await Judge.findOne({ id: judge.id });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async caseView(_idOfJudge, _idOfCase) {
    const judge = await Judge.findOne({ _id: _idOfJudge });
    judge.casesSeen = [...judge.casesSeen, _idOfCase];
    await judge.save();
    return;
  }
  async getSchedule(_idOfJudge) {
    try {
      if (!_idOfJudge) throw new Error("Judge id is required");
      const judge = await Judge.findById(_idOfJudge).populate("schedule");
      if (!judge) throw new Error("Invalid Judge");
      return judge.schedule;
    } catch (error) {
      throw error;
    }
  }
  async addSchedule(_idOfJudge, _idOfSchedule) {
    try {
      if (!_idOfJudge) throw new Error("Judge id is required");
      if (!_idOfSchedule) throw new Error("Schedule is required");
      const judge = await Judge.findById(_idOfJudge);
      if (!judge) throw new Error("Invalid Judge");
      judge.schedule = [...judge.schedule, _idOfSchedule];
      await judge.save();
      return;
    } catch (error) {
      throw error;
    }
  }
  async addSummery(_idOfJudge, _idOfSummery) {
    try {
      if (!_idOfJudge) throw new Error("Judge id is required");
      if (!_idOfSummery) throw new Error("Summery is required");
      const judge = await Judge.findById(_idOfJudge);
      if (!judge) throw new Error("Invalid Judge");
      judge.history = [...judge.history, _idOfSummery];
      await judge.save();
      return;
    } catch (error) {
      throw error;
    }
  }
  async removeSchedule(_idOfJudge, _idOfSchedule) {
    try {
      if (!_idOfJudge) throw new Error("Judge id is required");
      if (!_idOfSchedule) throw new Error("Schedule is required");
      const judge = await Judge.findById(_idOfJudge);
      if (!judge) throw new Error("Invalid Judge");
      judge.schedule = judge.schedule.filter(
        (schedule) => schedule.toString() !== _idOfSchedule.toString()
      );
      await judge.save();
      return;
    } catch (error) {
      throw error;
    }
  }
  async addCase(_idOfJudge, _idOfCase) {
    try {
      if (!_idOfJudge) throw new Error("Judge id is required");
      if (!_idOfCase) throw new Error("Case id is required");
      const judge = await Judge.findById(_idOfJudge);
      if (!judge) throw new Error("Invalid Judge");
      judge.cases = [...judge.cases, _idOfCase];
      await judge.save();
      return;
    } catch (error) {
      throw error;
    }
  }
  async getCompleteDetails(idOfJudge) {
    try {
      if (!idOfJudge) throw new Error("Judge id is required");
      // populate schedule cases column also
      return await Judge.findOne({ id: idOfJudge })
        .populate("cases", "CIN")
        .populate({
          path: "schedule",
          populate: { path: "case", select: "CIN" },
          select: "dateTime case",
        })
        .populate({
          path: "history",
          populate: { path: "case", select: "CIN" },
        })
        .populate("casesSeen", "CIN")
        .populate("court");
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new JudgeRepository();
