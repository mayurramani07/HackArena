import React from "react";
import { FaExternalLinkAlt, FaCalendarAlt } from "react-icons/fa";

const HackathonCard = ({
  hackathon,
  handleVisitHackathon,
  isLoggedIn,
}) => {
  return (
    <div className="bg-black text-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
      <div>
        <h2 className="text-lg md:text-xl font-bold leading-snug line-clamp-2">
          {hackathon.name}
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          {hackathon.platform}
        </p>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-indigo-400" />
          <span>{new Date(hackathon.date).toLocaleString()}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-5">
        {isLoggedIn ? (
          <button
            onClick={() => handleVisitHackathon(hackathon.link)}
            className="flex items-center gap-2 text-indigo-400 font-medium text-sm hover:underline"
          >
            Visit Hackathon <FaExternalLinkAlt className="text-xs" />
          </button>
        ) : (
          <button
            onClick={() => alert("Login required to view hackathon")}
            className="flex items-center gap-2 text-gray-500 font-medium text-sm cursor-not-allowed"
          >
            Visit Hackathon
          </button>
        )}
      </div>
    </div>
  );
};

export default HackathonCard;
