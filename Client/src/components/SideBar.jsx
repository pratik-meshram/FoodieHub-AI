
import { MdOutlineDashboard, MdFavorite, MdOutlineManageHistory } from "react-icons/md";
import { FaRobot  } from "react-icons/fa";
import { LiaMoneyBillSolid } from "react-icons/lia";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <div
      className={`
        fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        flex flex-col
      `}
    >
      {/* Close button for mobile */}
      <div className="absolute top-4 right-4 md:hidden">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          ✕
        </button>
      </div>

      {/* Sidebar Title */}
      <div className="text-center text-3xl md:text-3xl font-bold text-gray-800 py-6 border-b">
        D-Meal
      </div>

      {/* Menu Items */}
      <div className="flex flex-col mt-4 md:mt-8 gap-2 md:gap-4 px-2 md:px-4 flex-1">
        {[
          { icon: <MdOutlineDashboard />, label: "Dashboard" },
          { icon: <FaRobot />, label: "Chat With AI" },
          { icon: <MdFavorite />, label: "Favorites" },
          { icon: <MdOutlineManageHistory />, label: "History" },
          { icon: <LiaMoneyBillSolid />, label: "Billing" }
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 md:gap-4 w-full text-gray-700 text-sm md:text-lg
                       transition-all duration-300 hover:bg-gray-200 hover:text-yellow-500
                       cursor-pointer rounded-md p-2 md:p-3"
          >
            <span className="text-xl md:text-2xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
