import React from "react";
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-10 py-4 z-50 bg-black">
      <div className="text-2xl font-bold text-white cursor-pointer">HackArena</div>
      <div className="flex gap-6">
         <Link to="/login"className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all">Login</Link>
         <Link to="/logout" className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all">Logout</Link>
         <Link to="/more" className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all">Explore More</Link>
      </div>
    </nav>
  );
};

export default Navbar;
