import React from 'react'

const LandingNavbar = () => {
  return (
    <nav className='fixed top-0 w-full flex justify-between items-center px-5 py-6 z-50 bg-black'>
        <div className="text-2xl font-extrabold text-white cursor-pointer">HackArena</div>

        <div className='flex gap-8'>
            <a href='#contact' className='text-white font-normal uppercase tracking-wider hover:text-gray-400 transition-all'>Contact us</a>
            <a href='#developer' className='text-white font-normal uppercase tracking-wider hover:text-gray-400 transition-all'>About Developer</a>

        </div>
        
    </nav>
  )
}

export default LandingNavbar