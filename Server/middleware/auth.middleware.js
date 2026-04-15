const jwt = require("jsonwebtoken");

const checkForAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    console.log("token found in cookie", token);

    if (!token) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.user = decoded;
    next();
  } 
  
  catch (error) {
    return res.status(403).json({ success: false, message: "forbidden access" });
  }
};

module.exports = { checkForAuth };