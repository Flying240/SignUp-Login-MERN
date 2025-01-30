const jwt = require("jsonwebtoken");

//what it does?
//  as user need not to always sign-in
// we can just get token from user browser header authoritaion
// and verify it
//so this middleware is used to verify the token

//middle ware so 3 tparameters(req, res, next)
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if(!token){
        return res.status(401).json({message:"Access Denied. No JWT token provided"});
    }

    try {
        //if JWT token can be decoded by our secret key
        // then it is a valid token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.userId = decoded.userId; // Attach user ID to request

        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token or JWT token Expired" });
    }
};

module.exports = { verifyToken };
