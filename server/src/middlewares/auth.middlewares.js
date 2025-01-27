

import jwt from "jsonwebtoken"




const auth = async (req, res, next) => {
    const token = req.headers.authorization?.replace("Bearer ", "") || req.header("Authorization")?.replace("Bearer ", "");
    console.log("Extracted Token:", token); // Debug token

    if (!token) {
        return res.status(400).json({ message: "Unauthorized - No token provided" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decodedToken); // Debug decoded token
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message); // Log the error
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
};


export {auth}