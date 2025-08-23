import React from "react";

const ContestFooter = () => {
  return (
    <footer className="bg-black text-white text-center py-6 mt-12">
      <p className="text-sm"> &copy; {new Date().getFullYear()} HackArena. All rights reserved.</p>
    </footer>
  );
};

export default ContestFooter;
