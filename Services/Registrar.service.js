const Registrar = require("../Repository/registrar.repository");
const Judge = require("../Repository/judge.repository");
const Lawyer = require("../Repository/lawyer.repository");
const Court = require("../Repository/court.repository");
const Case = require("../Repository/case.repository");
const Schedule = require("../Repository/schedule.repository");
const Summery = require("../Repository/summery.repository");
const bcrypt = require("../Utils/bcrypt.class");
const { createLoginToken } = require("../Helper/loginTokenCreater.helper");
const {
  datesToBeScheduled,
  checkGivenDate,
} = require("../Helper/schedulingAlgorithm.helper");

exports.register = async (registrar) => {
  try {
    if (!registrar) throw new Error("Registrar data is required");
    if (!registrar.name) throw new Error("Registrar name is required");
    if (!registrar.email) throw new Error("Registrar email is required");
    if (!registrar.password) throw new Error("Registrar password is required");
    if (!registrar.phone) throw new Error("Registrar phone is required");
    if (!registrar.address) throw new Error("Registrar address is required");
    if (
      (await Registrar.getByEmail(registrar.email)) ||
      (await Registrar.getByPhone(registrar.phone))
    )
      throw new Error("Email or Phone Number already exists");
    registrar.password = await bcrypt.hashPassword(registrar.password);
    if (registrar.court && registrar.court.length !== 0) {
      console.log(registrar.court);
      const court = await Court.getCourtById(registrar.court);
      if (!court) {
        registrar.court = undefined;
      } else {
        registrar.court = court._id;
      }
    } else {
      registrar.court = undefined;
    }
    const newRegistrar = await Registrar.create(registrar);
    newRegistrar.password = undefined;
    return newRegistrar;
  } catch (error) {
    throw error;
  }
};

exports.createJudge = async (judge) => {
  try {
    if (!judge) throw new Error("Judge data is required");
    if (!judge.userId) throw new Error("Registrar id is not given");
    if ((await Registrar.getById(judge.userId)) == null)
      throw new Error("Invalid Registrar");
    judge.userId = undefined;
    if (!judge.name) throw new Error("Judge name is required");
    if (!judge.email) throw new Error("Judge email is required");
    if (!judge.password) throw new Error("Judge password is required");
    if (!judge.phone) throw new Error("Judge phone is required");
    if (!judge.address) throw new Error("Judge address is required");
    if (!judge.court) throw new Error("Judge court is required");
    if (
      (await Judge.getByEmail(judge.email)) ||
      (await Judge.getByPhone(judge.phone))
    )
      throw new Error("Email or Phone Number already exists");
    const court = await Court.getCourtById(judge.court);
    if (!court) throw new Error("Invalid Court");
    judge.court = court._id;
    judge.password = await bcrypt.hashPassword(judge.password);
    const judge_Data = await Judge.create(judge);
    await Court.addJudge(judge.court, judge_Data._id);
    judge_Data.password = undefined;
    return judge_Data;
  } catch (error) {
    throw error;
  }
};

exports.createLawyer = async (lawyer) => {
  try {
    if (!lawyer) throw new Error("Lawyer data is required");
    if (!lawyer.userId) throw new Error("Registrar id is not given");
    if ((await Registrar.getById(lawyer.userId)) == null)
      throw new Error("Invalid Registrar");
    lawyer.userId = undefined;
    if (!lawyer.name) throw new Error("Lawyer name is required");
    if (!lawyer.email) throw new Error("Lawyer email is required");
    if (!lawyer.password) throw new Error("Lawyer password is required");
    if (!lawyer.phone) throw new Error("Lawyer phone is required");
    if (!lawyer.address) throw new Error("Lawyer address is required");
    if (!lawyer.court) throw new Error("Lawyer court is required");
    if (
      (await Lawyer.getByEmail(lawyer.email)) ||
      (await Lawyer.getByPhone(lawyer.phone))
    )
      throw new Error("Email or Phone Number already exists");
    const court = await Court.getCourtById(lawyer.court);
    if (!court) throw new Error("Invalid Court");
    lawyer.court = court._id;
    lawyer.password = await bcrypt.hashPassword(lawyer.password);
    const lawyer_Data = await Lawyer.create(lawyer);
    await Court.addLawyer(lawyer.court, lawyer_Data._id);
    lawyer_Data.password = undefined;
    return lawyer_Data;
  } catch (error) {
    throw error;
  }
};

exports.updateRegistrar = async (registrar) => {
  try {
    if (!registrar) throw new Error("Registrar object is required");
    if (!registrar.id) throw new Error("Registrar id is required");
    const data = await Registrar.getById(registrar.id);
    if (!data) throw new Error("Invalid Registrar");
    const dataToUpdate = {};
    if (registrar.password && registrar.password.length > 0) {
      dataToUpdate.password = await bcrypt.hashPassword(registrar.password);
    }
    if (registrar.name && registrar.name.length > 0) {
      dataToUpdate.name = registrar.name;
    }
    if (registrar.email && registrar.email.length > 0) {
      dataToUpdate.email = registrar.email;
    }
    if (registrar.phone && registrar.phone.length > 0) {
      dataToUpdate.phone = registrar.phone;
    }
    if (registrar.address && registrar.address.length > 0) {
      dataToUpdate.address = registrar.address;
    }
    if (registrar.court && registrar.court.length > 0) {
      const court = await Court.getCourtById(registrar.court);
      if (!court) throw new Error("Invalid Court");
      dataToUpdate.court = court._id;
    }
    dataToUpdate._id = data._id;
    dataToUpdate.id = data.id;
    return await Registrar.update(dataToUpdate);
  } catch (error) {
    throw error;
  }
};

exports.createCase = async (caseData) => {
  try {
    if (!caseData) throw new Error("Case data is required");
    if (!caseData.userId) throw new Error("Registrar id is not given");
    if ((await Registrar.getById(caseData.userId)) == null)
      throw new Error("Invalid Registrar");
    caseData.userId = undefined;
    if (!caseData.defendantName) throw new Error("Defendant name is required");
    if (!caseData.defendantAddress)
      throw new Error("Defendant address is required");
    if (!caseData.crimeType) throw new Error("Crime type is required");
    if (!caseData.dateCommitted) throw new Error("Date committed is required");
    if (!caseData.locationCommitted)
      throw new Error("Location committed is required");
    if (!caseData.arrestingOfficer)
      throw new Error("Arresting officer is required");
    if (!caseData.arrestDate) throw new Error("Arrest date is required");
    if (!caseData.judge) throw new Error("Judge is required");
    if (!caseData.lawyers) throw new Error("Lawyers are required");
    if (!caseData.court) throw new Error("Court is required");
    if (!caseData.victim) throw new Error("Victim is required");
    const court = await Court.getCourtById(caseData.court);
    if (court == null) throw new Error("Invalid Court");
    caseData.court = court._id;
    const judge = await Judge.getById(caseData.judge);
    if (judge == null) throw new Error("Invalid Judge");
    caseData.judge = judge._id;
    for (let i = 0; i < caseData.lawyers.length; i++) {
      const lawyer = await Lawyer.getById(caseData.lawyers[i]);
      if (lawyer == null) throw new Error("Invalid Lawyer");
      caseData.lawyers[i] = lawyer._id;
    }
    const case_DATA = await Case.create(caseData);
    await Judge.addCase(caseData.judge, case_DATA._id);
    for (let i = 0; i < caseData.lawyers.length; i++) {
      await Lawyer.addCase(caseData.lawyers[i], case_DATA._id);
    }
    await Court.addCase(caseData.court, case_DATA._id);
    return case_DATA;
  } catch (error) {
    throw error;
  }
};

exports.createCourt = async (court) => {
  try {
    if (!court) throw new Error("Court data is required");
    if (!court.userId) throw new Error("Registrar id is not given");
    if ((await Registrar.getById(court.userId)) == null)
      throw new Error("Invalid Registrar");
    court.userId = undefined;
    if (!court.name) throw new Error("Court name is required");
    if (!court.location) throw new Error("Court address is required");
    if ((await Court.getCourtByName(court.name)) != null)
      throw new Error("Court already exists");
    return await Court.create(court);
  } catch (error) {
    throw error;
  }
};

exports.updateCourt = async (court) => {
  try {
    if (!court) throw new Error("Court data is required");
    if (!court.userId) throw new Error("Registrar id is not given");
    if ((await Registrar.getById(court.userId)) == null)
      throw new Error("Invalid Registrar");
    court.userId = undefined;
    if (!court.id) throw new Error("Court id is required");
    const oldCourt = await Court.getCourtById(court.id);
    if (oldCourt == null) throw new Error("Invalid Court");
    return await Court.update(oldCourt._id, court);
  } catch (error) {
    throw error;
  }
};

exports.login = async (email, password) => {
  try {
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");
    const registrar = await Registrar.getByEmail(email);
    if (!registrar) throw new Error("Invalid Email");
    if (!(await bcrypt.comparePassword(password, registrar.password)))
      throw new Error("Invalid Password");
    registrar.password = undefined;
    const loginToken = await createLoginToken({ id: registrar.id });
    return { user: { ...registrar._doc }, loginToken };
  } catch (error) {
    throw error;
  }
};

exports.getSchedule = async (caseData) => {
  try {
    if (!caseData) throw new Error("Case data is required");
    if (!caseData.CIN) throw new Error("CIN is required");
    if (!caseData.userId) throw new Error("Registrar id is not given");
    if ((await Registrar.getById(caseData.userId)) == null)
      throw new Error("Invalid Registrar");
    const case_DATA = await Case.getCaseByCIN(caseData.CIN);
    if (!case_DATA) throw new Error("Invalid CIN");
    let date = Date.now();
    if (caseData.date) date = new Date(caseData.date);
    const judgeSchedule = await Judge.getSchedule(case_DATA.judge);
    const lawyersSchedule = [];
    for (let i = 0; i < case_DATA.lawyers.length; i++) {
      lawyersSchedule.push(await Lawyer.getSchedule(case_DATA.lawyers[i]));
    }
    const result = datesToBeScheduled(judgeSchedule, lawyersSchedule, date);
    return result;
  } catch (error) {
    throw error;
  }
};

exports.assignDate = async (caseData) => {
  try {
    if (!caseData) throw new Error("Case data is required");
    if (!caseData.CIN) throw new Error("Case id is required");
    if (!caseData.dateSelected) throw new Error("Date Selected is required");
    let date = Date.now();
    if (caseData.date) date = new Date(caseData.date);
    if (!caseData.userId) throw new Error("Registrar id is not given");
    if ((await Registrar.getById(caseData.userId)) == null)
      throw new Error("Invalid Registrar");
    const case_DATA = await Case.getCaseByCIN(caseData.CIN);
    if (!case_DATA) throw new Error("Invalid CIN");
    if (case_DATA.nextHearing) throw new Error("Date already assigned");
    if (caseData.date) date = new Date(caseData.date);
    const judgeSchedule = await Judge.getSchedule(case_DATA.judge);
    const lawyersSchedule = [];
    for (let i = 0; i < case_DATA.lawyers.length; i++) {
      lawyersSchedule.push(await Lawyer.getSchedule(case_DATA.lawyers[i]));
    }
    if (
      !checkGivenDate(
        caseData.dateSelected,
        judgeSchedule,
        lawyersSchedule,
        date
      )
    )
      throw new Error("Invalid Date");
    const scheduleData = {
      court: case_DATA.court,
      date: caseData.dateSelected,
      judge: case_DATA.judge,
      lawyers: case_DATA.lawyers,
      case: case_DATA._id,
    };
    const schedule = await Schedule.create(scheduleData);
    await Case.assignDate(caseData.CIN, schedule._id);
    Judge.addSchedule(case_DATA.judge, schedule._id);
    for (let i = 0; i < case_DATA.lawyers.length; i++) {
      Lawyer.addSchedule(case_DATA.lawyers[i], schedule._id);
    }
    return { message: "Date Assigned" };
  } catch (error) {
    throw error;
  }
};

exports.caseSummery = async (summeryData) => {
  try {
    if (!summeryData) throw new Error("Summery data is required");
    if (!summeryData.CIN) throw new Error("Case id is required");
    if (!summeryData.comment) throw new Error("Comment is required");
    if (
      !summeryData.status ||
      (!summeryData.status === "Summery" && !summeryData.status === "Adjourned")
    )
      throw new Error("Status is required");
    if (!summeryData.userId) throw new Error("Registrar id is not given");
    if ((await Registrar.getById(summeryData.userId)) == null)
      throw new Error("Invalid Registrar");
    const case_DATA = await Case.getCaseByCINWithSchedule(summeryData.CIN);
    if (!case_DATA) throw new Error("Invalid CIN");
    if (case_DATA.nextHearing == null) throw new Error("Date not assigned yet");
    summeryData.case = case_DATA._id;
    summeryData.date = case_DATA.nextHearing.dateTime;
    const summery = await Summery.create(summeryData);
    await Case.addSummery(case_DATA._id, summery._id);
    await Judge.addSummery(case_DATA.judge, summery._id);
    for (let i = 0; i < case_DATA.lawyers.length; i++) {
      await Lawyer.addSummery(case_DATA.lawyers[i], summery._id);
    }
    // delete the schedule
    // remove schedule from judge and lawyers
    await Judge.removeSchedule(case_DATA.judge, case_DATA.nextHearing._id);
    for (let i = 0; i < case_DATA.lawyers.length; i++) {
      await Lawyer.removeSchedule(
        case_DATA.lawyers[i],
        case_DATA.nextHearing._id
      );
    }
    await Case.removeSchedule(case_DATA._id, case_DATA.nextHearing._id);
    await Schedule.removeSchedule(case_DATA.nextHearing._id);
    return { message: "Summery added" };
  } catch (error) {
    throw error;
  }
};

exports.getCompleteDetails = async (data) => {
  try {
    if (!data) throw new Error("Data is required");
    if (!data.userId) throw new Error("Registrar id is required");
    return await Registrar.getCompleteInfoById(data.userId);
  } catch (error) {
    throw error;
  }
};
