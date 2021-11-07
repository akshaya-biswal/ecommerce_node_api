const verifyAuthorization = (req, res, next) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "You are not alowed to do that!" });
  }
};

module.exports = verifyAuthorization;
