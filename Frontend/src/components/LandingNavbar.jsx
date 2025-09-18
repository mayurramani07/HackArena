import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { HiMenu, HiX } from 'react-icons/hi';

const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='fixed top-0 w-full z-50 bg-black'>
      <div className='flex justify-between items-center px-6 py-4'>
        <div className="text-2xl font-bold text-white cursor-pointer">HackArena</div>

        <div className='hidden md:flex gap-8'>
          <Link to="/feedback" className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all">
            Give Feedback
          </Link>
          <a href='#developer' className='text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all'>
            About Developer
          </a>
        </div>

        <div className='md:hidden text-white text-2xl cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiX /> : <HiMenu />}
        </div>
      </div>

      {isOpen && (
        <div className='md:hidden flex flex-col gap-4 px-6 pb-4 bg-black'>
          <Link onClick={() => setIsOpen(false)} to="/feedback" className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all">
            Give Feedback
          </Link>
          <a onClick={() => setIsOpen(false)} href='#developer' className='text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all'>
            About Developer
          </a>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
