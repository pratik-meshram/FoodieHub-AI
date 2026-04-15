require("dotenv").config();
const express = require("express");
const app = express();
const Razorpay = require("razorpay");
const cors = require("cors");
const router = require("./Router/auth-router");
const orderRouter = require("./Router/razorpay-route");
const ConnectDb = require("./config/db");
const cookieParser = require ("cookie-parser");
const Port = process.env.PORT || 5000;

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    })
);
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser())

//middleware
app.get("/protected", (req, res) => {
    res.send("protected route");
})

// API Routes
app.use("/api/auth", router);
app.use('/api/order', orderRouter);

ConnectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
