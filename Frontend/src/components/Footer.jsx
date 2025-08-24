import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">© {new Date().getFullYear()} Hackathon Hub. All rights reserved.</p>
        <div className="flex gap-4 mt-3 md:mt-0">
          <a href="#" className="hover:text-indigo-400">Privacy</a>
          <a href="#" className="hover:text-indigo-400">Terms</a>
          <a href="#" className="hover:text-indigo-400">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
