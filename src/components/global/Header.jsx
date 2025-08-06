import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ fullSidebar, setFullSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="h-[64px] border-b border-b-[#e3e6e8] flex shadow-elevationClose">
      <div
        className={`${
          fullSidebar ? "w-[20%]" : "w-[80px]"
        } h-full flex items-center px-5`}
      >
        <div className="flex items-center gap-5">
          
          {fullSidebar && (
            <h2 className="text-[15px] font-semibold">TimelyTrack</h2>
          )}
        </div>
      </div>

      <div
        className={`${
          fullSidebar ? "w-[80%]" : "w-full"
        } flex items-center px-6`}
      >
        <button
          className="flex items-center gap-x-3 text-grey-500 hover:text-grey-600"
          onClick={() => setFullSidebar(!fullSidebar)}
        >
          {fullSidebar ? (
            <i className="ri-more-2-fill text-[20px]"></i>
          ) : (
            <i className="ri-menu-fill text-[20px]"></i>
          )}
        </button>

        <button
          onClick={handleLogout}
          className="ml-auto flex items-center gap-x-2 text-grey-500 hover:text-grey-600"
        >
          <span>Logout</span>
          <i className="ri-logout-box-r-line text-[18px]"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
