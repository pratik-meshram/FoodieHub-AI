

import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import cakeimg from '../assets/cake.webp';

function Salads() {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []);

  const handleAddToCart = (item) => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const isAlreadyInCart = storedItems.some(
      (cartItem) => cartItem.name === item.name
    );

    if (isAlreadyInCart) {
      toast.error(`${item.name} is already in the cart!`);
      return;
    }

    const newItem = { ...item, quantity: 1 }; // set default quantity
    const updatedCart = [...storedItems, newItem];
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    toast.success(`${item.name} added to cart 🛒`);
  };

  const handleBuyNow = (itemName) => {
    alert(`Buying ${itemName} now!`);
  };

  const foodItems = [
   {
    name: 'Chocolate Truffle Cake',
    price: 399,
    description: 'Rich chocolate cake with frosting.',
    rating: 5,
    image: cakeimg,
  },
  {
    name: 'Classic Margherita Pizza',
    price: 299,
    description: 'Pizza with cheese and basil.',
    rating: 5,
    image: cakeimg,
  },

  {
    name: 'Blueberry Muffin',
    price: 129,
    description: 'Soft muffin with blueberries.',
    rating: 4,
    image: cakeimg,
  },
  {
    name: 'Red Velvet Cupcake',
    price: 99,
    description: 'Cupcake with cream cheese icing.',
    rating: 5,
    image: cakeimg,
  },
  {
    name: 'Garlic Breadsticks',
    price: 149,
    description: 'Breadsticks with garlic butter.',
    rating: 4,
    image: cakeimg,
  },
 
  {
    name: 'Veg Sandwich',
    price: 199,
    description: 'Sandwich with cheese and veggies.',
    rating: 4,
    image: cakeimg,
  }
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-amber-100 p-4">
      <Toaster position="top-center" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
        {foodItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <span className="text-lg font-bold text-gray-700">₹ {item.price}</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              <div className="flex items-center mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <div className="flex space-x-2 mt-auto">
                <button
                  onClick={() => handleBuyNow(item.name)}
                  className="flex-1 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="flex-1 px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 active:scale-95 transform transition-all duration-150 shadow-md hover:shadow-lg"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Salads;





