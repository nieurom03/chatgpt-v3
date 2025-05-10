import React,{useState, useRef, useEffect } from "react"
import { useNavigate} from "react-router-dom";
import ActionMenu from "./ActionMenu";

const Header = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
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


    const handleLogout = () => {
        navigate('/login');
        localStorage.removeItem('user');
      };

    //   const handleLogin = () => {
    //     navigate('/login')
    //   }

    return (
    <>
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm" >
            {/* Left */}
            <div className="text-lg font-semibold text-gray-800 w-1/4">
            🧠 Ollama 3
            </div>

            {/* Center - Tìm kiếm */}
            <div className="w-2/4">
            <label class="relative block">
                <span class="sr-only">Search</span>
                    <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                </span>
                    <input class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search"/>
                </label>
            </div>

            {/* Right */}
            <div className="flex text-sm text-gray-500 text-right w-1/4 justify-end space-x-1">
                {/* <div className="w-20 h-10">🧠 Ollama 3</div> */}
               <ActionMenu user={user} handleLogout={handleLogout} />
            </div>
        </div>
    </>
    )
}

export default Header