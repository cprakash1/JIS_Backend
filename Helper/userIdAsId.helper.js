exports.userIdAsId = (req, res, next) => {
  try {
    if (!req.body.userId) {
      res.status(401).json({ message: "Unauthorized" });
    }
    req.body = { ...req.body, id: req.body.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
