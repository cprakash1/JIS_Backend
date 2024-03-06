const {
  update,
  casesView,
  login,
  payment,
} = require("../Services/Lawyer.service");

exports.update = async (req, res) => {
  try {
    const result = await update(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.casesView = async (req, res) => {
  try {
    const result = await casesView(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    if (!req.body.email) throw new Error("Email is required");
    if (!req.body.password) throw new Error("Password is required");
    const result = await login(req.body.email, req.body.password);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.payment = async (req, res) => {
  try {
    const result = await payment(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
