import React,{useState, useEffect} from "react"
import { useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
      };

      const handleLogin = () => {
        navigate('/login')
      }

    return (
    <>
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm">
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
                {!user && (
                    <div>
                      <button 
                        className="hover:bg-gray-300 rounded-2xl bg-gray-100 shadow-md w-20 h-10 hover:text-white" 
                        onClick={handleLogin}>Log in</button>

                     {/* <button 
                        className="hover:bg-gray-300 rounded-2xl bg-blue-100 shadow-md w-20 h-10">Sign up</button> */}
                    </div>
                )}
                {user && (
                        <form class="flex items-center space-x-6">
                            <div class="shrink-0">
                                <img class="h-10 w-10 object-cover rounded-full" src={user?.picture} alt="Current profile photo" />
                            </div>
                        </form>
                )}
            </div>
        </div>
    </>
    )
}

export default Header