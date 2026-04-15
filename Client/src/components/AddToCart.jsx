import React, { useEffect, useState } from 'react';
import { IoIosArrowBack, IoMdTrash } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import fallbackImg from '../assets/No+Image.png';
import { Toaster, toast } from 'react-hot-toast';
import API from "../api/api";

function AddToCart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('cartItems');
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  // ✅ Discount apply logic here
  const handleApplyDiscount = () => {
    const code = discountCode.toLowerCase();
    if (code === 'save10') {
      setAppliedDiscount(10);
      toast.success('10% discount applied!');
    } else if (code === 'xai42') {
      setAppliedDiscount(42);
      toast.success('🚀 Cosmic discount applied (42%)');
    } else {
      setAppliedDiscount(0);
      toast.error('Invalid discount code ❌');
    }
  };

  // ✅ Delete cart item
  const handleDelete = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
    toast.success('Item removed from cart');
  };

  // ✅ Quantity change
  const handleQuantityChange = (index, newQty) => {
    const updated = [...cartItems];
    updated[index].quantity = newQty;
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  // ✅ Calculate total
  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => {
      const price = Number(item.price) || 0;
      return total + price * (item.quantity || 1);
    }, 0);
    return (subtotal * (1 - appliedDiscount / 100)).toFixed(2);
  };

  // ✅ Payment

  const payNow = async () => {
    try {
      const payload = {
        products: cartItems.map(item => ({
          productName: item.name,
          price: item.price,
          quantity: item.quantity || 1,
        })),
        discountCode: discountCode,
      };

      const { data } = await API.post("/api/order/create", payload);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,  //keyy
        amount: data.amount,
        currency: "INR",
        name: "Food Website",
        description: "Food items order",
        order_id: data.orderId,

        handler: function () {
          alert("✅ Payment Successful!");
          localStorage.removeItem("cartItems");
          setCartItems([]);
        },

        prefill: {
          name: "Admin",
          email: "Admin@example.com",
          contact: "1234567890",
        },

        theme: { color: "#7C3AED" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
    catch (error) {
      console.error("❌ Payment error:", error);
      toast.error("Payment initiation failed.");
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <Toaster />
      <button onClick={() => navigate(-1)} className="text-3xl mb-4 text-gray-700">
        <IoIosArrowBack />
      </button>

      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3 space-y-6 max-h-[80vh] overflow-y-auto pr-2">
            {cartItems.map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row items-start md:items-center gap-4 border p-4 rounded-lg shadow relative">
                <img src={item.image || fallbackImg} alt={item.name} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600 text-sm italic">{item.description}</p>
                  <p className="text-blue-600 font-bold mt-1">₹ {Number(item.price).toFixed(2)}</p>
                  <div className="flex items-center mt-2 gap-2">
                    <label htmlFor={`qty-${i}`} className="text-sm font-medium">Qty:</label>
                    <input
                      type="number"
                      min="1"
                      id={`qty-${i}`}
                      value={item.quantity || 1}
                      onChange={(e) => handleQuantityChange(i, Number(e.target.value))}
                      className="w-16 border rounded px-2 py-1 text-sm bg-gray-100"
                    />
                  </div>
                </div>
                <button onClick={() => handleDelete(i)} className="absolute top-2 right-2 text-red-600 hover:text-red-800">
                  <IoMdTrash size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="w-full lg:w-1/3 border p-6 rounded-lg shadow-md h-fit bg-gray-50 sticky top-6 self-start">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="e.g. SAVE10 or XAI42"
                  className="flex-1 px-3 py-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleApplyDiscount}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                >
                  Apply
                </button>

              </div>
              {appliedDiscount > 0 && (
                <p className="text-sm text-green-600 mt-1">Discount: {appliedDiscount}% applied</p>
              )}
            </div>

            <p className="text-xl font-bold text-gray-800 mb-4">
              Total Amount: ₹{calculateTotal()}
            </p>

            <button
              onClick={payNow}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition transform hover:scale-105"
            >
              Proceed to Payment 💳
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddToCart;
