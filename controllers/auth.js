const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
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

  async login(req, res) {
    const { username, password: InputPassword } = req.body;

    try {
      const getUser = await User.findOne({ username });
      !getUser && res.status(401).json({ message: "No user found" });

      const hashedPassword = CryptoJS.AES.decrypt(
        getUser.password,
        process.env.PASS_SEC
      );
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      if (originalPassword !== InputPassword) {
        res.status(401).json({ message: "Wrong Password" });
      }

      const accessToken = jwt.sign(
        { id: getUser._id, isAdmin: getUser.isAdmin },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
      );

      const { password, ...others } = getUser._doc;
      res.status(200).json({ ...others, accessToken });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new AuthController();
