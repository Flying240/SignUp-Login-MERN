const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../database/userModel");
const nodemailer = require("nodemailer");

const jwtAssignToken = (res, user, SorL) => {
    try {
        const jwtToken = jwt.sign({ user: user }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        console.log("User " + SorL + " successfully", user);
        return res.status(200).json({
            message: "User " + SorL + " successfully",
            token: jwtToken,
            userInfo: { userId: user._id, name: user.name, email: user.email },
            success: true,
        });
    } catch (error) {
        console.error("Error during sign-up:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// 1)after AuthValidion next():-
// 2)get name, email, password from request
// 3)if user already exists then just tell user to login
// 4)encrypt the password through bcrypt library
// 5)create new user with name, email, hashedPassword
// 6)save the new user
// 7)jwt Assign Token to new user
const SignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const userExist = await UserModel.findOne({ email });

        if (userExist) {
            return res.status(200).json({
                message: "User already exists, you can login now",
                success: false,
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        // Create and assign a token
        return jwtAssignToken(res, newUser, "signed up");
    } catch (error) {
        console.error("Error during sign-up:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// Login Controller
//  1)after AuthValidion next():-
//  2)get email, password from request
//  3)if user does not exists return error
//  4)check password given is correct with hashed password in database by bycrypt compare
//  5)jwt Assign Token to new user
const LogIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user already exists
        const userExist = await UserModel.findOne({ email });

        if (!userExist) {
            console.log("User does not exist");
            return res.status(400).json({
                message: "User/email does not exist",
                success: false,
            });
        }

        // Check if the password is correct
        const validPassword = await bcrypt.compare(
            password,
            userExist.password
        );

        if (!validPassword) {
            console.log("User exist, Invalid password");
            return res.status(400).json({
                message: "User exist, Invalid password",
                success: false,
            });
        }

        // Create and assign a token
        return jwtAssignToken(res, userExist, "logged in");
    } catch (error) {
        console.error("Error during sign-in:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

//how it works
// 1)after AuthValidion next() : (optional)
// 2)get email from request
// 3)if user does not exists return error
// 4)generate resetToken from jwt.sign with user id and secret key
// 5)create a nodemailer transporter which is Authenticated by Gmail SMTP server.
//      this Enables to connect to Gmail SMTP server and Send emails using your Gmail account.
// 6)generate mailoption to userEmail and message with reset link(directs frontend).
// 7) Send email and return a success response if successful.

const ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user)
            return res
                .status(400)
                .json({ message: "User does not exist", success: false });

        // Generate a password reset token with user ID and secret key.
        const resetToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m",
            }
        );

        // Email Configuration
        const transporter = nodemailer.createTransport({
            service: "gmail",

            // Authenticate the sender using Gmail SMTP with provided credentials.
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD, // Use an App Password instead of the actual Gmail password for security.
            },
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: "Password Reset Link for signup-login-app",
            text: `Click this link to reset your password : http://localhost:5173/reset-password/${resetToken}\n\nThis link expires in 15 minutes.`,
            html: `<div style="font-family: Arial, sans-serif;">
                    <p>Click this link to reset your password:</p>
                    <p><a href="http://localhost:5173/reset-password/${resetToken}">Reset Password</a></p>
                    <p>This link expires in 15 minutes.</p>
                </div>`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Password reset email sent successfully!");

        return res
            .status(200)
            .json({ message: "Password reset email sent!", success: true });
    } catch (error) {
        console.error("Error during forgot-password:", error);
        return res
            .status(500)
            .json({ message: "Server error", success: false });
    }
};

//how it works
// 1)after AuthValidion next() : (optional)
// 2)get resetToken from request
//  3)if resetToken is valid then get user id from token
// 4)get password from request
// 5)hash the password
// 6)update user's password in database

const ResetPassword = async (req, res) => {
    try {
        const resetToken = req.params.token;

        const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);

        const user = await UserModel.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        const { password } = req.body;
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password
        await UserModel.findByIdAndUpdate(decoded.userId, {
            password: hashedPassword,
        });

        console.log("Password reset successfully");
        return res
            .status(200)
            .json({ message: "Password reset successfully", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
};

module.exports = { SignUp, LogIn, ForgotPassword, ResetPassword };
