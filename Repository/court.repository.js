const Court = require("../models/Court.model");
const Temp = require("../models/Temp.model");

class CourtRepository {
  async create(court) {
    try {
      if (!court) throw new Error("Court data is required");
      if (!court.name) throw new Error("Court name is required");
      if (!court.location) throw new Error("Court location is required");
      const result = await Temp.findOneAndUpdate(
        { name: "court" },
        { $inc: { count: 1 } },
        { upsert: true, new: true }
      );
      const newCourt = new Court({
        ...court,
        id: "C" + result.count,
      });
      return await newCourt.save();
    } catch (error) {
      throw error;
    }
  }

  async getCourtById(id) {
    try {
      if (!id) throw new Error("Id is required");
      return await Court.findOne({ id: id });
    } catch (error) {
      throw error;
    }
  }

  async getAllCourts() {
    try {
      return await Court.find();
    } catch (error) {
      throw error;
    }
  }

  async getCourtByName(name) {
    try {
      if (!name) throw new Error("Name is required");
      return await Court.findOne({ name: name });
    } catch (error) {
      throw error;
    }
  }
  async update(_idOfCourt, court) {
    try {
      if (!_idOfCourt) throw new Error("id of court is required");
      if (!court) throw new Error("Court  is required");
      await Court.findByIdAndUpdate(_idOfCourt, court);
      return await Court.findById(_idOfCourt);
    } catch (error) {
      throw error;
    }
  }
  async addCase(_idOfCourt, _idOfCase) {
    try {
      if (!_idOfCourt) throw new Error("id of court is required");
      if (!_idOfCase) throw new Error("id of case is required");
      const court = await Court.findById(_idOfCourt);
      if (!court) throw new Error("Court not found");
      court.cases = [...court.cases, _idOfCase];
      await court.save();
      return;
    } catch (error) {
      throw error;
    }
  }
  async addLawyer(_idOfCourt, _idOfLawyer) {
    try {
      if (!_idOfCourt) throw new Error("id of court is required");
      if (!_idOfLawyer) throw new Error("id of lawyer is required");
      const court = await Court.findById(_idOfCourt);
      if (!court) throw new Error("Court not found");
      court.lawyers = [...court.lawyers, _idOfLawyer];
      await court.save();
      return;
    } catch (error) {
      throw error;
    }
  }
  async addJudge(_idOfCourt, _idOfJudge) {
    try {
      if (!_idOfCourt) throw new Error("id of court is required");
      if (!_idOfJudge) throw new Error("id of judge is required");
      const court = await Court.findById(_idOfCourt);
      if (!court) throw new Error("Court not found");
      court.judges = [...court.judges, _idOfJudge];
      await court.save();
      return;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CourtRepository();
