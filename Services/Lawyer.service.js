const Lawyer = require("../Repository/lawyer.repository");
const Case = require("../Repository/case.repository");
const bcrypt = require("../Utils/bcrypt.class");
const payment = require("../Repository/payment.repository");
const { createLoginToken } = require("../Helper/loginTokenCreater.helper");
const Court = require("../Repository/court.repository");

exports.update = async (lawyer) => {
  try {
    if (!lawyer) throw new Error("Lawyer object is required");
    if (!lawyer.id) throw new Error("Lawyer id is required");
    const data = await Lawyer.getById(lawyer.id);
    if (!data) throw new Error("Invalid Lawyer");
    const dataToUpdate = {};
    if (lawyer.password && lawyer.password.length > 0) {
      dataToUpdate.password = await bcrypt.hashPassword(lawyer.password);
    }
    if (lawyer.name && lawyer.name.length > 0) {
      dataToUpdate.name = lawyer.name;
    }
    if (lawyer.email && lawyer.email.length > 0) {
      dataToUpdate.email = lawyer.email;
    }
    if (lawyer.phone && lawyer.phone.length > 0) {
      dataToUpdate.phone = lawyer.phone;
    }
    if (lawyer.address && lawyer.address.length > 0) {
      dataToUpdate.address = lawyer.address;
    }
    if (lawyer.court && lawyer.court.length > 0) {
      const court = await Court.getCourtById(lawyer.court);
      if (!court) throw new Error("Invalid Court");
      dataToUpdate.court = court._id;
    }
    dataToUpdate._id = data._id;
    dataToUpdate.id = data.id;
    return await Lawyer.update(dataToUpdate);
  } catch (error) {
    throw error;
  }
};

exports.casesView = async (lawyer) => {
  try {
    if (!lawyer) throw new Error("Lawyer object is required");
    if (!lawyer.id) throw new Error("Lawyer id is required");
    if (!lawyer.CIN) throw new Error("Case id is required");
    const lawyerData = await Lawyer.getById(lawyer.id);
    if (!lawyerData) throw new Error("Invalid Lawyer");
    const caseData = await Case.getCaseByCINWithInfo(lawyer.CIN);
    if (!caseData) throw new Error("Invalid Case");
    if (lawyerData.casesSeen.includes(caseData._id)) return caseData;
    await Lawyer.caseView(lawyerData._id, caseData._id);
    return caseData;
  } catch (error) {
    throw error;
  }
};

exports.login = async (email, password) => {
  try {
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");
    const lawyer = await Lawyer.getByEmail(email);
    if (!lawyer) throw new Error("Invalid Email");
    if (!(await bcrypt.comparePassword(password, lawyer.password)))
      throw new Error("Invalid Password");
    lawyer.password = undefined;
    const loginToken = await createLoginToken({
      id: lawyer.id,
    });
    return { user: { ...lawyer._doc }, loginToken };
  } catch (error) {
    throw error;
  }
};

exports.payment = async (paymentData) => {
  try {
    if (!paymentData) throw new Error("paymentData object is required");
    if (!paymentData.id) throw new Error("Lawyer is required");
    if (!paymentData.amount) throw new Error("Amount is required");
    if (!paymentData.status) throw new Error("Status is required");
    let date = Date.now();
    if (paymentData.date) date = paymentData.date;
    const lawyer = await Lawyer.getById(paymentData.id);
    if (!lawyer) throw new Error("Lawyer is Invalid");
    const payment_Data = await payment.create({
      lawyer: lawyer._id,
      amount: paymentData.amount,
      status: paymentData.status,
      date: date,
    });
    await Lawyer.addPaymentHistory(lawyer._id, payment_Data._id);
    if (payment_Data.status === "success") {
      await Lawyer.paid(payment_Data.lawyer, payment_Data.amount);
    }
    return payment_Data;
  } catch (error) {
    throw error;
  }
};

exports.getCompleteDetails = async (lawyer) => {
  try {
    if (!lawyer) throw new Error("Lawyer object is required");
    if (!lawyer.id) throw new Error("Lawyer id is required");
    return await Lawyer.getCompleteDetails(lawyer.id);
  } catch (error) {
    throw error;
  }
};

exports.searchByKeyword = async (data) => {
  try {
    if (!data) throw new Error("Data is required");
    if (!data.keyword) throw new Error("Keyword is required");
    if (!data.id) throw new Error("Lawyer id is required");
    const lawyer = await Lawyer.getById(data.id);
    if (!lawyer) throw new Error("Invalid Lawyer");
    const cases = await Case.searchByKeyword(data.keyword);
    return cases;
  } catch (error) {
    throw error;
  }
};
