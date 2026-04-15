const express = require("express");
const router = express.Router();

const { register, login } = require("../Controllers/auth-controller");
const { checkForAuth } = require("../middleware/auth.Middleware");

router.post("/register", register);
router.post("/login", login);

// jwt route
router.get("/me", checkForAuth, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
});

module.exports = router;