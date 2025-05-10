import React, { useState, useRef, useEffect } from "react";
import { Edit, LogOut ,Settings} from "lucide-react"; // Bạn có thể dùng Heroicons hoặc Lucide

const ActionMenu = ({user,handleLogout}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target )) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <form class="flex items-center space-x-6">
            <div class="shrink-0">
                <img class="h-10 w-10 object-cover rounded-full" src={user?.picture} alt="Current profile photo" />
            </div>
        </form>
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 text-gray-700">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>

            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <Edit className="w-4 h-4 mr-2" />
              Profile
            </button>
            <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-100 " onClick={handleLogout}>
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg> */}
                <LogOut className="w-4 h-4 mr-2"/>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
