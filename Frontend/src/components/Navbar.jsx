import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-50 bg-black">
      <Link to='/' className="text-2xl font-bold text-white cursor-pointer">
        HackArena
      </Link>
      <div className="flex gap-6">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all">
              Login
            </Link>
            <Link to="/signup" className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all">
              Signup
            </Link>
            <Link to="/more" className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all">
              Explore More
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
