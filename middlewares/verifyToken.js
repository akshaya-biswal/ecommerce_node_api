const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (authToken) {
    const token = authToken.split(" ")[1];

    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json({ message: "Token is not valid!" });
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: "You are not authenticated!" });
  }
};

module.exports = verifyToken;
