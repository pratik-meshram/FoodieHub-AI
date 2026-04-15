
import React from "react";
import { SlBasket } from "react-icons/sl";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

function Navbar({ sidebarOpen, toggleSidebar }) {
  return (
    <div
      className="
        fixed top-0 left-0 w-full bg-white shadow-md 
        h-[65px] md:h-[84px]
        flex items-center
        z-30             /* sidebar ke niche */
      "
    >
      {/* INNER BOX */}
      <div
        className="
          flex items-center justify-between 
          w-full px-4 md:px-6
          md:ml-64     /* sidebar ke right se start */
        "
      >
        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-700 p-2 rounded hover:bg-gray-200"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>

        {/* Hello Text */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex-1 text-center md:text-left">
          Hello, <span className="text-blue-500">Rohit</span>
        </h1>

        {/* Basket */}
        <Link to="/AddToCart">
          <div className="p-3 rounded-full bg-gray-100 hover:bg-blue-100 transition cursor-pointer">
            <SlBasket className="text-2xl text-gray-700 hover:text-blue-600" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
