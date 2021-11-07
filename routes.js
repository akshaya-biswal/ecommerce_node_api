const router = require("express").Router();
const authController = require("./controllers/auth");

router.post("/api/register", authController.register);

module.exports = router;
