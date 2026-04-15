
import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Sidebar from './Sidebar.jsx';
import Navbar from './Navbar.jsx';
import Category from './category.jsx';
import Bekrey from './Bekrey.jsx';
import Burger from './Burger.jsx';
import Beverage from './Beverage.jsx';
import Chicken from './Chicken.jsx';
import Pizza from './Pizza.jsx';
import Salads from './Salads.jsx';

function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="relative h-full w-full bg-amber-100">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className={`transition-all duration-300 md:ml-64 mt-[80px] p-4`}>
        <Category />
        <Routes>
          <Route path="/" element={<Bekrey />} />
          <Route path="/Burger" element={<Burger />} />
          <Route path="/Beverage" element={<Beverage />} />
          <Route path="/Chicken" element={<Chicken />} />
          <Route path="/Pizza" element={<Pizza />} />
          <Route path="/Salads" element={<Salads />} />
        </Routes>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}

export default Page;
 