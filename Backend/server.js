const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const MdURL = process.env.MONGODB_URL;
const port = process.env.PORT_NO || 8000;

const cors = require("cors");
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
mongoose
    .connect(MdURL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

//server is running fine
app.get("/", (req, res) => {
    res.status(200).json({data: "Welcome to the server"});
});

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const userRouter = require("./routes/userRoutes");
app.use("/user", userRouter)
/**
 * User enters details → Frontend sends POST request → Backend checks for duplicates → Hashes password → Saves user → Returns success message.
 */
