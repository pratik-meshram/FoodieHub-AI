
// const mongoose = require("mongoose");

// const paymentSchema = new mongoose.Schema({
//   products: [
//     {
//       productName: { type: String, required: true },
//       price: { type: Number, required: true },
//       quantity: { type: Number, required: true },
//     },
//   ],
//   discountCode: String,
//   totalPrice: Number,
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Payment = mongoose.model("Payments", paymentSchema);
// module.exports = Payment;





const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  products: [
    {
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  discountCode: { type: String, default: null },
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payments", paymentSchema);
