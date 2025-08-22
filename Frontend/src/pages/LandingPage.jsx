import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingNavbar from "../components/LandingNavbar";

const LandingPage = () => {
  const navigate = useNavigate();
  const [hoverSide, setHoverSide] = useState(""); 

  return (
    <>
    <LandingNavbar />
    <div
      className={`relative w-full h-screen flex overflow-hidden transition-all duration-1000 ${hoverSide === "left" ? "hover-left" : hoverSide === "right" ? "hover-right" : "" }`}>
      <div
        className="split left w-1/2 h-full relative bg-white flex flex-col items-center justify-center transition-all duration-1000 cursor-pointer"
        onMouseEnter={() => setHoverSide("left")}
        onMouseLeave={() => setHoverSide("")}
        onClick={() => navigate("/hackathons")}>

        <h1 className="text-5xl md:text-6xl font-serif absolute top-1/3 text-black">Hackathons</h1>
        <button className="btn absolute top-1/2 px-10 py-6 border-2 border-black rounded-xl font-bold uppercase text-black hover:bg-black hover:text-white transition-all duration-300">
          Explore
        </button>
      </div>
      <div
        className="split right w-1/2 h-full relative bg-black flex flex-col items-center justify-center transition-all duration-1000 cursor-pointer"
        onMouseEnter={() => setHoverSide("right")}
        onMouseLeave={() => setHoverSide("")}
        onClick={() => navigate("/contests")}
      >
        <h1 className="text-5xl md:text-6xl font-serif absolute top-1/3 text-white">
          Contests
        </h1>
        <button className="btn absolute top-1/2 px-10 py-6 border-2 border-white rounded-xl font-bold uppercase text-white hover:bg-white hover:text-black transition-all duration-300">
          Explore
        </button>
      </div>
      <style>{`
        .hover-left .left { width: 70% !important; }
        .hover-left .right { width: 30% !important; }
        .hover-right .right { width: 70% !important; }
        .hover-right .left { width: 30% !important; }
      `}</style>
    </div>
    </>
  );
};

export default LandingPage;
