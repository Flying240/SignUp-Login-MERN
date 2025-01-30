const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello, World!");
});

const {
    SignUp,
    LogIn,
    ForgotPassword,
    ResetPassword
} = require("../controllers/authController");
const {
    SignUpValidation,
    LogInValidation,
} = require("../middleware/AuthValidation");

// Signup Route
router.post("/signup", SignUpValidation, SignUp);

// Login Route
router.post("/login", LogInValidation, LogIn);

router.post("/forgot-password", ForgotPassword);

router.post("/reset-password/:token", ResetPassword);
module.exports = router;
