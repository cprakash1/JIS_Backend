const Lawyer = require("../Repository/lawyer.repository");
const Case = require("../Repository/case.repository");
const bcrypt = require("../Utils/bcrypt.class");
const payment = require("../Repository/payment.repository");
const { createLoginToken } = require("../Helper/loginTokenCreater.helper");

exports.update = async (lawyer) => {
  try {
    if (!lawyer) throw new Error("Lawyer object is required");
    if (!lawyer.id) throw new Error("Lawyer id is required");
    return await Lawyer.update(lawyer);
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
    const caseData = await Case.getCaseByCIN(lawyer.CIN);
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
    return { ...lawyer._doc, loginToken };
  } catch (error) {
    throw error;
  }
};

exports.payment = async (paymentData) => {
  try {
    if (!paymentData) throw new Error("paymentData object is required");
    if (!paymentData.lawyer) throw new Error("Lawyer is required");
    if (!paymentData.amount) throw new Error("Amount is required");
    if (!paymentData.status) throw new Error("Status is required");
    let date = Date.now();
    if (paymentData.date) date = paymentData.date;
    const lawyer = await Lawyer.getById(paymentData.lawyer);
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
