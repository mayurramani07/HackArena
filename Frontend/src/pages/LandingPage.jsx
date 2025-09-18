import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingNavbar from "../components/LandingNavbar";

const LandingPage = () => {
  const navigate = useNavigate();
  const [hoverSide, setHoverSide] = useState(""); 

  return (
    <>
      <LandingNavbar />
      <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden">
        
        <div
          className={`flex-1 md:transition-[flex] duration-1000 flex flex-col items-center justify-center relative cursor-pointer
            ${hoverSide === "left" ? "md:flex-[7]" : hoverSide === "right" ? "md:flex-[3]" : "md:flex-[5]" } bg-white`}
          onMouseEnter={() => setHoverSide("left")}
          onMouseLeave={() => setHoverSide("")}
          onClick={() => navigate("/hackathons")}>

          <h1 className="text-5xl md:text-6xl font-serif text-black mb-6 z-10">Hackathons</h1>
          <button className="px-10 py-6 border-2 border-black rounded-xl font-bold uppercase text-black hover:bg-black hover:text-white transition-all duration-300 z-10">
            Explore
          </button>
        </div>

        <div
          className={`flex-1 md:transition-[flex] duration-1000 flex flex-col items-center justify-center relative cursor-pointer
            ${hoverSide === "right" ? "md:flex-[7]" : hoverSide === "left" ? "md:flex-[3]" : "md:flex-[5]"} bg-black`}
          onMouseEnter={() => setHoverSide("right")}
          onMouseLeave={() => setHoverSide("")}
          onClick={() => navigate("/contests")}>
            
          <h1 className="text-5xl md:text-6xl font-serif text-white mb-6 z-10">Contests</h1>
          <button className="px-10 py-6 border-2 border-white rounded-xl font-bold uppercase text-white hover:bg-white hover:text-black transition-all duration-300 z-10">
            Explore
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
