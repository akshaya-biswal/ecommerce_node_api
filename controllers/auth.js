const CryptoJS = require("crypto-js");
const User = require("../models/User");

class AuthController {
  async register(req, res) {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
    });

    try {
      const saveUser = await newUser.save();
      res.status(201).json(saveUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new AuthController();
