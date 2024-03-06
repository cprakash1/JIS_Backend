const Payment = require("../Models/Payment.model");

class PaymentRepository {
  async create(payment) {
    try {
      if (!payment) throw new Error("Payment is required");
      if (!payment.lawyer) throw new Error("Lawyer is required");
      if (!payment.amount) throw new Error("Amount is required");
      if (!payment.status) throw new Error("Status is required");
      let date = Date.now();
      if (payment.date) date = payment.date;
      return await Payment.create({
        lawyer: payment.lawyer,
        amount: payment.amount,
        date: date,
        status: payment.status,
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PaymentRepository();
