const Judge = require("../Repository/judge.repository");
const Case = require("../Repository/case.repository");
const bcrypt = require("../Utils/bcrypt.class");
const { createLoginToken } = require("../Helper/loginTokenCreater.helper");

exports.update = async (judge) => {
  try {
    if (!judge) throw new Error("Judge data is required");
    if (!judge.id) throw new Error("Judge Id is required");
    return await Judge.update(judge);
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
    const caseData = await Case.getCaseByCIN(judge.CIN);
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
    if (!bcrypt.comparePassword(password, judge.password))
      throw new Error("Invalid Password");
    judge.password = undefined;
    const loginToken = await createLoginToken({
      id: judge.id,
    });
    return { ...judge._doc, loginToken };
  } catch (error) {
    throw error;
  }
};
