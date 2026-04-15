const Razorpay = require("razorpay");
const Payment = require("../Model/Payment-model");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const createOrder = async (req, res) => {
  console.log(" Incoming Order Body:", req.body);

  try {
    let { products, product, quantity, discountCode, amount } = req.body;

    // 1️⃣ CASE 1: Frontend sends direct amount (no product)
    if (amount && !products && !product) {
      const order = await razorpay.orders.create({
        amount: Math.round(amount * 100),
        currency: "INR",
        receipt: "rcptid_" + Date.now(),
      });

      return res.status(200).json({
        message: "Order created with amount only",
        amount: order.amount,
        orderId: order.id,
      });
    }

    // 2️⃣ CASE 2: Single product format
    if (!products && product) {
      products = [
        {
          productName: product.name,
          price: product.price,
          quantity: quantity || 1,
        },
      ];
    }

    // 3️⃣ CASE 3: No products → error
    if (!products || products.length === 0) {
      return res.status(400).json({ error: "No products provided" });
    }

    // 4️⃣ Calculate total price
    let total = products.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

    // 5️⃣ Apply discount
    if (discountCode === "SAVE10") {
      total = total - total * 0.1;
    }

    // 6️⃣ Create Razorpay Order
    const order = await razorpay.orders.create({
      amount: Math.round(total * 100),
      currency: "INR",
      receipt: "rcptid_" + Date.now(),
    });

    // 7️⃣ Save to MongoDB
    const newOrder = await Payment.create({
      products,
      discountCode: discountCode || null,
      totalPrice: total.toFixed(2),
    });

    res.status(200).json({
      message: "Order created & saved successfully 🎉",
      amount: order.amount,
      orderId: order.id,
      currency: order.currency,
      orderDetails: newOrder,
    });

  } catch (error) {
    console.error("❌ Order creation error:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

const fetchOrder = async (req, res) => {
  try {
    const Data = await Payment.find();

    // console.log("data is", Data);

    res.status(200).json({
      message: "order data fetching successfully",
      orderData: Data,
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to Fetch data" });
  }
};

module.exports = { createOrder, fetchOrder };
