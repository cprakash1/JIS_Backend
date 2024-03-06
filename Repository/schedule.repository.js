const Schedule = require("../Models/Schedule.model");

class ScheduleRepository {
  async create(scheduleData) {
    try {
      if (!scheduleData) throw new Error("Schedule data is required");
      if (!scheduleData.court) throw new Error("Court is required");
      if (!scheduleData.date) throw new Error("Date is required");
      if (!scheduleData.judge) throw new Error("Judge is required");
      if (!scheduleData.lawyers || scheduleData.lawyers.length == 0)
        throw new Error("Lawyers are required");
      if (!scheduleData.case) throw new Error("Case is required");
      scheduleData.dateTime = scheduleData.date;
      const newSchedule = new Schedule(scheduleData);
      return await newSchedule.save();
    } catch (err) {
      throw err;
    }
  }
  async removeSchedule(_idOfSchedule) {
    try {
      if (!_idOfSchedule) throw new Error("Schedule id is required");
      return await Schedule.findByIdAndDelete(_idOfSchedule);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ScheduleRepository();
