import React from 'react'
import { Link, useNavigate } from "react-router-dom";
const LandingNavbar = () => {
  return (
    <nav className='fixed top-0 w-full flex justify-between items-center px-6 py-4 z-50 bg-black'>
        <div className="text-2xl font-bold text-white cursor-pointer">HackArena</div>

        <div className='flex gap-8'>
            <Link to="/feedback" className="text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all">
              Give a feedback
            </Link>
            <a href='#developer' className='text-sm text-white font-medium uppercase tracking-tight hover:text-gray-400 transition-all'>About Developer</a>

        </div>
        
    </nav>
  )
}

export default LandingNavbar