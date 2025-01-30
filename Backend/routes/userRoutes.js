const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleWare");

router.get("/", verifyToken, (req, res) => {
    const products = [{name: "Laptop", price: 1000}, {name: "Mobile", price: 500}];
    res.status(200).json({products: products});
});

module.exports = router;
