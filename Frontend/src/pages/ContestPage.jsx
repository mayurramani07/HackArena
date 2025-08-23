import React, { useState, useEffect } from "react";
import ContestNavbar from "../components/ContestNavbar";
import ContestFooter from "../components/ContestFooter";
import { FaRegBookmark, FaBookmark, FaCalendarAlt, FaClock, FaExternalLinkAlt } from "react-icons/fa";
import { fetchContests } from "../services/contestService.js";

const getStatus = (startTime, endTime) => {
  const now = new Date();
  if (now < new Date(startTime)) return "Upcoming";
  if (endTime && now > new Date(endTime)) return "Ended";
  return "Ongoing";
};

const ContestCard = ({ contest, onBookmarkToggle }) => {
  const status = getStatus(contest.startTime, contest.endTime);

  return (
    <div className="bg-gradient-to-br from-white to-gray-100 text-black rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
      <div>
        <h2 className="text-lg md:text-xl font-bold leading-snug line-clamp-2">{contest.title}</h2>
        <p className="text-sm text-gray-500 mt-1">{contest.platform}</p>
        <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${status === "Upcoming" ? "bg-blue-100 text-blue-600" : status === "Ongoing" ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-600"}`}>
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
            {contest.endTime ? new Date(contest.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "N/A"}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-5">
        <a href={contest.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 font-medium text-sm hover:underline">
          Visit Contest <FaExternalLinkAlt className="text-xs" />
        </a>
        <button onClick={() => onBookmarkToggle(contest.id)} className="text-xl">
          {contest.bookmarked ? <FaBookmark className="text-indigo-600" /> : <FaRegBookmark className="text-gray-500 hover:text-indigo-600 transition" />}
        </button>
      </div>
    </div>
  );
};

const ContestPage = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContests = async () => {
      setLoading(true);
      const data = await fetchContests(); 
      setContests(data);
      setLoading(false);
    };
    loadContests();
  }, []);

  const handleBookmarkToggle = (id) => {
    setContests((prev) => prev.map((c) => (c.id === id ? { ...c, bookmarked: !c.bookmarked } : c)));
  };

  return (
    <div className="bg-black min-h-screen text-white pt-20">
      <ContestNavbar />
      <div className="px-6 md:px-16 pt-12">
        <h1 className="text-4xl font-bold mb-8">All Contests</h1>

        <div className="flex gap-4 mb-8 flex-wrap">
          {["Codeforces", "LeetCode", "AtCoder", "Upcoming", "Ongoing"].map((filter) => (
            <button key={filter} className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition">{filter}</button>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-400">Loading contests...</p>
        ) : contests.length === 0 ? (
          <p className="text-gray-400">No contests available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contests.map((contest) => (
              <ContestCard key={contest.id} contest={contest} onBookmarkToggle={handleBookmarkToggle} />
            ))}
          </div>
        )}
      </div>
      <ContestFooter />
    </div>
  );
};

export default ContestPage;
