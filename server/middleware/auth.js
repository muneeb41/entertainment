const jwt = require("jsonwebtoken");


// this auth middleware check Authentication of the user 
// if user is not Authenticate then it send massage to user 
// if user is Authenticate then it allow to go to next function that user want to call
const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]; // Access the Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.SECURE_KEY);
    if (!decoded  || !decoded.email == req.body.email) {
      res.status(400).json({ message: "user is not authenticated" });
    }

    
    next();

  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).json({ message: "Token is not valid" });
  }
};

module.exports = auth;
