const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/register", authController.showRegisterPage);
router.post("/register", authController.registerUser);
router.get("/dashboard", authController.showDashboard);

module.exports = router;

router.get("/login", authController.showLoginPage);
router.post("/login", authController.loginUser);