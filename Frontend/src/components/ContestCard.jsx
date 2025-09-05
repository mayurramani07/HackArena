import React from "react";
import { FaRegBookmark, FaBookmark, FaCalendarAlt, FaClock, FaExternalLinkAlt } from "react-icons/fa";

const getStatus = (startTime, endTime) => {
  const now = new Date();
  if (now < new Date(startTime)) return "Upcoming";
  if (endTime && now > new Date(endTime)) return "Ended";
  return "Ongoing";
};

const ContestCard = ({ contest, onBookmarkToggle, handleVisitContest, isLoggedIn }) => {
  const status = getStatus(contest.startTime, contest.endTime);

  const handleRemindMe = () => {
    alert(`You will be reminded for "${contest.title}"!`);
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-100 text-black rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
      <div>
        <h2 className="text-lg md:text-xl font-bold leading-snug line-clamp-2">{contest.title}</h2>
        <p className="text-sm text-gray-500 mt-1">{contest.platform}</p>
        <span
          className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
            status === "Upcoming"
              ? "bg-blue-100 text-blue-600"
              : status === "Ongoing"
              ? "bg-green-100 text-green-600"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-indigo-500" />
          <span>{new Date(contest.startTime).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaClock className="text-indigo-500" />
          <span>
            {new Date(contest.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}{" "}
            -{" "}
            {contest.endTime
              ? new Date(contest.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : "N/A"}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-5 gap-2">
        <button
          onClick={() => handleVisitContest(contest.url)}
          className="flex items-center gap-2 text-indigo-600 font-medium text-sm hover:underline"
        >
          Visit Contest <FaExternalLinkAlt className="text-xs" />
        </button>

        <div className="flex items-center gap-2">
          {isLoggedIn && (
            <button
              onClick={handleRemindMe}
              className="px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition"
            >
              Remind Me
            </button>
          )}

          <button onClick={() => onBookmarkToggle(contest.id)} className="text-xl">
            {contest.bookmarked ? <FaBookmark className="text-indigo-600" /> : <FaRegBookmark className="text-gray-500 hover:text-indigo-600 transition" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
