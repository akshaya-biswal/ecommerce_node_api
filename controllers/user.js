const CryptoJS = require("crypto-js");
const User = require("../models/User");

class UserController {
  async update(req, res) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getUser(req, res) {
    try {
      const getUser = await User.findById(req.params.id);
      const { password, ...others } = getUser._doc;
      res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new UserController();
