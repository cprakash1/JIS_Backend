const {
  update,
  caseView,
  login,
  getCompleteDetails,
  searchByKeyword,
} = require("../Services/Judge.service");

exports.update = async (req, res) => {
  try {
    const result = await update(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.caseView = async (req, res) => {
  try {
    const result = await caseView(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await login(req.body.email, req.body.password);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompleteDetails = async (req, res) => {
  try {
    const result = await getCompleteDetails(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchByKeyword = async (req, res) => {
  try {
    const result = await searchByKeyword(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
