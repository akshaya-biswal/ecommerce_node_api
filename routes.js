const router = require("express").Router();
const authController = require("./controllers/auth");
const productController = require("./controllers/product");
const verifyToken = require("./middlewares/verifyToken");
const verifyAdmin = require("./middlewares/verifyAdmin");

router.post("/api/register", authController.register);
router.post("/api/login", authController.login);
router.post("/api/products", [verifyToken, verifyAdmin], productController.add);

module.exports = router;
