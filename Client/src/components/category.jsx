import React from "react";
import { GiChickenOven, GiFullPizza, GiHamburger, GiFruitBowl } from "react-icons/gi";
import { RiDrinks2Line } from "react-icons/ri";
import { FaFish, FaCookieBite } from "react-icons/fa";
import { Link } from "react-router-dom";
import girlPic from "../assets/woman.png";

const categories = [
  { name: "Bakery", icon: <FaCookieBite className="text-yellow-500" />, path: "/page/" },
  { name: "Burger", icon: <GiHamburger className="text-orange-500" />, path: "/page/Burger" },
  { name: "Pizza", icon: <GiFullPizza className="text-yellow-500" />, path: "/page/Pizza" },
  { name: "Beverage", icon: <RiDrinks2Line className="text-blue-500" />, path: "/page/Beverage" },
  { name: "Chicken", icon: <GiChickenOven className="text-red-500" />, path: "/page/Chicken" },
  { name: "Salads", icon: <GiFruitBowl className="text-green-500" />, path: "/page/Salads" },
];

function Category() {
  return (
    <div className="flex flex-col items-center bg-amber-100 p-4 sm:p-6 w-full">
      <div className="w-full max-w-5xl flex flex-col space-y-6 bg-gray-200 rounded-lg shadow-md p-4 sm:p-6">

        {/* Banner */}
        <div className="w-full bg-yellow-400 text-white p-4 sm:p-6 rounded-xl flex items-center justify-between shadow-md">
          <div className="flex-1 pr-3">
            <h2 className="text-lg sm:text-2xl font-bold">Get Discount Voucher</h2>
            <h3 className="text-base sm:text-xl font-bold">Up To 30%</h3>
            <p className="text-xs sm:text-sm text-yellow-100 mt-1 hidden sm:block">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 flex-shrink-0 overflow-hidden rounded-lg">
            <img className="w-full h-full object-cover" src={girlPic} alt="Discount Offer" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-center border-b-4 border-yellow-500 px-4 sm:px-6 py-2 self-center">
          Our Menu
        </h1>

        {/* Categories Grid */}
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6 md:gap-10">
            {categories.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-white p-3 sm:p-4 rounded-lg shadow-md w-20 h-24 sm:w-24 sm:h-28 transition-transform transform hover:scale-110"
              >
                <Link className="text-3xl sm:text-4xl" to={item.path}>
                  {item.icon}
                </Link>
                <p className="mt-1 sm:mt-2 text-gray-700 font-semibold text-center text-xs sm:text-sm">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Category;