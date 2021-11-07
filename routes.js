const router = require("express").Router();
const authController = require("./controllers/auth");

router.post("/api/register", authController.register);
router.post("/api/login", authController.login);

module.exports = router;
