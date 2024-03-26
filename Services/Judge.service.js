const Judge = require("../Repository/judge.repository");
const Case = require("../Repository/case.repository");
const bcrypt = require("../Utils/bcrypt.class");
const { createLoginToken } = require("../Helper/loginTokenCreater.helper");
const Court = require("../Repository/court.repository");

exports.update = async (judge) => {
  try {
    if (!judge) throw new Error("Judge data is required");
    if (!judge.id) throw new Error("Judge Id is required");
    const data = await Judge.getById(judge.id);
    if (!data) throw new Error("Invalid Judge");
    const dataToUpdate = {};
    if (judge.password && judge.password.length > 0) {
      dataToUpdate.password = await bcrypt.hashPassword(judge.password);
    }
    if (judge.name && judge.name.length > 0) {
      dataToUpdate.name = judge.name;
    }
    if (judge.email && judge.email.length > 0) {
      dataToUpdate.email = judge.email;
    }
    if (judge.phone && judge.phone.length > 0) {
      dataToUpdate.phone = judge.phone;
    }
    if (judge.address && judge.address.length > 0) {
      dataToUpdate.address = judge.address;
    }
    if (judge.court && judge.court.length > 0) {
      const court = await Court.getCourtById(judge.court);
      if (!court) throw new Error("Invalid Court");
      dataToUpdate.court = court._id;
    }
    dataToUpdate._id = data._id;
    dataToUpdate.id = data.id;
    return await Judge.update(dataToUpdate);
  } catch (error) {
    throw error;
  }
};

exports.caseView = async (judge) => {
  try {
    if (!judge) throw new Error("Judge data is required");
    if (!judge.id) throw new Error("Judge Id is required");
    if (!judge.CIN) throw new Error("Case Id is required");
    const judgeData = await Judge.getById(judge.id);
    if (!judgeData) throw new Error("Invalid Judge");
    const caseData = await Case.getCaseByCINWithInfo(judge.CIN);
    if (!caseData) throw new Error("Invalid Case");
    if (judgeData.casesSeen.includes(caseData._id)) return caseData;
    await Judge.caseView(judgeData._id, caseData._id);
    return caseData;
  } catch (error) {
    throw error;
  }
};

exports.login = async (email, password) => {
  try {
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");
    const judge = await Judge.getByEmail(email);
    if (!judge) throw new Error("Invalid Email");
    if (!(await bcrypt.comparePassword(password, judge.password)))
      throw new Error("Invalid Password");
    judge.password = undefined;
    const loginToken = await createLoginToken({
      id: judge.id,
    });
    return { user: { ...judge._doc }, loginToken };
  } catch (error) {
    throw error;
  }
};

exports.getCompleteDetails = async (judge) => {
  try {
    if (!judge) throw new Error("Lawyer object is required");
    if (!judge.id) throw new Error("Lawyer id is required");
    return await Judge.getCompleteDetails(judge.id);
  } catch (error) {
    throw error;
  }
};

exports.searchByKeyword = async (keyword) => {
  try {
    if (!keyword) throw new Error("Keyword is required");
    if (!keyword.id) throw new Error("Judge id is required");
    if (!keyword.keyword) throw new Error("Keyword is required");
    const judgeData = await Judge.getById(keyword.id);
    if (!judgeData) throw new Error("Invalid Judge");
    return await Case.searchByKeyword(keyword.keyword);
  } catch (error) {
    throw error;
  }
};
