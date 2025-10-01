import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { checkAuth, logoutUser } from "../services/authService";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const data = await checkAuth();
        setIsLoggedIn(data.loggedIn);
      } catch {
        setIsLoggedIn(false);
      }
    };
    verifyAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black">
      <div className="flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-white">
          HackArena
        </Link>

        <div className="hidden md:flex gap-6">
          {isLoggedIn ? (
            <button onClick={handleLogout}
              className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login"
                className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all">
                Login
              </Link>
              <Link to="/signup"
                className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all">
                Signup
              </Link>
              <Link to="/more"
                className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all">
                Explore More
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden text-white text-2xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX /> : <HiMenu />}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 bg-black">
          {isLoggedIn ? (
            <button onClick={() => {
                handleLogout();
                setIsOpen(false);
            }}
              className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all text-left">
              Logout
            </button>
          ) : (
            <>
              <Link onClick={() => setIsOpen(false)} to="/login"
                className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all">
                Login
              </Link>
              <Link onClick={() => setIsOpen(false)}
                to="/signup"
                className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all">
                Signup
              </Link>
              <Link onClick={() => setIsOpen(false)}
                to="/more"
                className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all">
                Explore More
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
