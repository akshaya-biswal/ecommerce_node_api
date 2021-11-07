const router = require("express").Router();
const authController = require("./controllers/auth");
const productController = require("./controllers/product");
const userController = require("./controllers/user");
const verifyToken = require("./middlewares/verifyToken");
const verifyAdmin = require("./middlewares/verifyAdmin");
const verifyAuthorization = require("./middlewares/verifyAuthorization");

router.post("/api/register", authController.register);
router.post("/api/login", authController.login);
router.post("/api/products", [verifyToken, verifyAdmin], productController.add);
router.put(
  "/api/user/:id",
  [verifyToken, verifyAuthorization],
  userController.update
);

module.exports = router;
