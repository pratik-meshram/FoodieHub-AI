const User = require("../Model/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register Controller
// post Api
const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    //  Hash password here
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// Login controller
// post Api

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = {
      userId: user._id,
      email: user.email
    }

    const token = jwt.sign(payload, process.env.JWT_KEY);
    console.log("jwt token", token);

    
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    res.status(200).json({ success: true, message: "Login successful" });
    console.log("Response:", res);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };
