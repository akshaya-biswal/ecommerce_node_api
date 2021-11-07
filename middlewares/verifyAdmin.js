const verifyAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "You are not alowed to do that!" });
  }
};

module.exports = verifyAdmin;
