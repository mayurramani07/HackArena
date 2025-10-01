import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/auth/check", {
          withCredentials: true,
        });
        if (res.data.loggedIn) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:7000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-white cursor-pointer"
        >
          HackArena
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all"
              >
                Signup
              </Link>
              <Link
                to="/more"
                className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all"
              >
                Explore More
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div
          className="md:hidden text-white text-2xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4 bg-black">
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all text-left"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                onClick={() => setIsOpen(false)}
                to="/login"
                className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all"
              >
                Login
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                to="/signup"
                className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all"
              >
                Signup
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                to="/more"
                className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all"
              >
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
