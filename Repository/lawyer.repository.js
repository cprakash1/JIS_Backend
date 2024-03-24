const Lawyer = require("../Models/Lawyer.model");
const Temp = require("../Models/Temp.model");
const { caseView } = require("./judge.repository");
const caseCost = process.env.CASE_PER_COST || 1000;

class LawyerRepository {
  async create(lawyer) {
    try {
      if (!lawyer) throw new Error("Lawyer data is required");
      if (!lawyer.name) throw new Error("Lawyer name is required");
      if (!lawyer.email) throw new Error("Lawyer email is required");
      if (!lawyer.password) throw new Error("Lawyer password is required");
      if (!lawyer.phone) throw new Error("Lawyer phone is required");
      if (!lawyer.address) throw new Error("Lawyer address is required");
      if (!lawyer.court) throw new Error("Lawyer court is required");
      const result = await Temp.findOneAndUpdate(
        { name: "lawyer" },
        { $inc: { count: 1 } },
        { upsert: true, new: true }
      );
      const newLawyer = new Lawyer({
        ...lawyer,
        id: "L" + result.count,
      });
      return await newLawyer.save();
    } catch (error) {
      throw error;
    }
  }
  async getByEmail(email) {
    try {
      if (!email) throw new Error("Email is required");
      return await Lawyer.findOne({ email });
    } catch (error) {
      throw error;
    }
  }
  async getById(id) {
    try {
      if (!id) throw new Error("Id is required");
      return await Lawyer.findOne({ id: id });
    } catch (error) {
      throw error;
    }
  }
  async getByObjectIdWithSchedule(_id) {
    try {
      if (!_id) throw new Error("Id is required");
      return await Lawyer.findById(_id).populate("schedule");
    } catch (error) {
      throw error;
    }
  }
  async getByPhone(phone) {
    try {
      if (!phone) throw new Error("Phone is required");
      return await Lawyer.findOne({ phone });
    } catch (error) {
      throw error;
    }
  }
  async getAll() {
    try {
      return await Lawyer.find();
    } catch (error) {
      throw error;
    }
  }
  async update(lawyer) {
    try {
      if (!lawyer) throw new Error("Registrar object is required");
      if (!lawyer.id) throw new Error("Lawyer id is required");
      await Lawyer.findOneAndUpdate({ id: lawyer.id }, lawyer, {});
      return await Lawyer.findOne({ id: lawyer.id }).populate(
        "court",
        "name location id"
      );
    } catch (error) {
      throw error;
    }
  }
  async caseView(_idOfLawyer, _idOfCase) {
    try {
      if (!_idOfLawyer) throw new Error("Lawyer id is required");
      if (!_idOfCase) throw new Error("Case id is required");
      const lawyer = await Lawyer.findById(_idOfLawyer);
      if (!lawyer) throw new Error("Invalid Lawyer");
      lawyer.casesSeen = [...lawyer.casesSeen, _idOfCase];
      lawyer.paymentLeft += parseInt(caseCost);
      await lawyer.save();
      return;
    } catch (error) {
      throw error;
    }
  }
  async getSchedule(_idOfLawyer) {
    try {
      if (!_idOfLawyer) throw new Error("Lawyer id is required");
      const lawyer = await Lawyer.findById(_idOfLawyer).populate("schedule");
      if (!lawyer) throw new Error("Invalid Lawyer");
      return lawyer.schedule;
    } catch (error) {
      throw error;
    }
  }
  async addSchedule(_idOfLawyer, _idOfSchedule) {
    try {
      if (!_idOfLawyer) throw new Error("Lawyer id is required");
      if (!_idOfSchedule) throw new Error("Schedule id is required");
      const lawyer = await Lawyer.findById(_idOfLawyer);
      if (!lawyer) throw new Error("Invalid Lawyer");
      lawyer.schedule = [...lawyer.schedule, _idOfSchedule];
      await lawyer.save();
      return;
    } catch (error) {
      throw error;
    }
  }
  async addSummery(_idOfLawyer, _idOfsummery) {
    try {
      if (!_idOfLawyer) throw new Error("Lawyer id is required");
      if (!_idOfsummery) throw new Error("Summery id is required");
      const lawyer = await Lawyer.findById(_idOfLawyer);
      if (!lawyer) throw new Error("Invalid Lawyer");
      lawyer.history = [...lawyer.history, _idOfsummery];
      await lawyer.save();
      return;
    } catch (error) {
      throw error;
    }
  }
  async removeSchedule(_idOfLawyer, _idOfSchedule) {
    try {
      if (!_idOfLawyer) throw new Error("Lawyer id is required");
      if (!_idOfSchedule) throw new Error("Schedule id is required");
      const lawyer = await Lawyer.findById(_idOfLawyer);
      if (!lawyer) throw new Error("Invalid Lawyer");
      lawyer.schedule = lawyer.schedule.filter(
        (schedule) => schedule.toString() !== _idOfSchedule.toString()
      );
      await lawyer.save();
      return;
    } catch (error) {
      throw error;
    }
  }
  async paid(_idOfLawyer, amount) {
    try {
      if (!_idOfLawyer) throw new Error("Lawyer id is required");
      if (!amount && parseInt(amount) >= 0)
        throw new Error("Amount is required");
      const lawyer = await Lawyer.findById(_idOfLawyer);
      if (!lawyer) throw new Error("Invalid Lawyer");
      lawyer.paymentLeft -= parseInt(amount);
      await lawyer.save();
      return;
    } catch (error) {
      throw error;
    }
  }
  async addPaymentHistory(_idOfLawyer, _idOfPayment) {
    try {
      if (!_idOfLawyer) throw new Error("Lawyer id is required");
      if (!_idOfPayment) throw new Error("Payment id is required");
      const lawyer = await Lawyer.findById(_idOfLawyer);
      if (!lawyer) throw new Error("Invalid Lawyer");
      lawyer.paymentHistory = [...lawyer.paymentHistory, _idOfPayment];
      await lawyer.save();
      return;
    } catch (error) {
      throw error;
    }
  }
  async addCase(_idOfLawyer, _idOfCase) {
    try {
      if (!_idOfLawyer) throw new Error("Lawyer id is required");
      if (!_idOfCase) throw new Error("Case id is required");
      const lawyer = await Lawyer.findById(_idOfLawyer);
      if (!lawyer) throw new Error("Invalid Lawyer");
      lawyer.cases = [...lawyer.cases, _idOfCase];
      await lawyer.save();
      return;
    } catch (error) {
      throw error;
    }
  }
  async getCompleteDetails(idOfLawyer) {
    try {
      if (!idOfLawyer) throw new Error("Lawyer id is required");
      // populate schedule cases column also
      return await Lawyer.findOne({ id: idOfLawyer })
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
        .populate("paymentHistory")
        .populate("court");
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new LawyerRepository();
