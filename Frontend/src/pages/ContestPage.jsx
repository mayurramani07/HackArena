import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaRegBookmark, FaBookmark, FaCalendarAlt, FaClock, FaExternalLinkAlt } from "react-icons/fa";
import { fetchContests } from "../services/contestService.js";

const getStatus = (startTime, endTime) => {
  const now = new Date();
  if (now < new Date(startTime)) return "Upcoming";
  if (endTime && now > new Date(endTime)) return "Ended";
  return "Ongoing";
};

const ContestCard = ({ contest, onBookmarkToggle, handleVisitContest }) => {
  const status = getStatus(contest.startTime, contest.endTime);

  return (
    <div className="bg-gradient-to-br from-white to-gray-100 text-black rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
      <div>
        <h2 className="text-lg md:text-xl font-bold leading-snug line-clamp-2">
          {contest.title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">{contest.platform}</p>
        <span
          className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
            status === "Upcoming" ? "bg-blue-100 text-blue-600" : status === "Ongoing" ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-600" }`}>
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
            {new Date(contest.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"})}{" "}-{" "}
            {contest.endTime ? new Date(contest.endTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }): "N/A"}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-5">
        <button
          onClick={() => handleVisitContest(contest.url)}
          className="flex items-center gap-2 text-indigo-600 font-medium text-sm hover:underline">
          Visit Contest <FaExternalLinkAlt className="text-xs" /></button>
        <button
          onClick={() => onBookmarkToggle(contest.id)}
          className="text-xl">
          {contest.bookmarked ? ( <FaBookmark className="text-indigo-600" /> ) : (
            <FaRegBookmark className="text-gray-500 hover:text-indigo-600 transition" />
          )}
        </button>
      </div>
    </div>
  );
};

const ContestPage = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/auth/check", {
          withCredentials: true,
        });
        setIsLoggedIn(res.data.loggedIn);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

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
    setContests((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, bookmarked: !c.bookmarked } : c
      )
    );
  };

  const handleVisitContest = (url) => {
    if (isLoggedIn) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      navigate("/login");
    }
  };

  const filteredContests = contests.filter((contest) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Bookmark") return contest.bookmarked;
    return contest.platform === activeFilter;
  });

  return (
    <div className="bg-black min-h-screen text-white pt-20">
      <Navbar />
      <div className="px-6 md:px-16 pt-12">
        <h1 className="text-3xl font-bold mb-8">All Contests</h1>

        <div className="flex gap-3 mb-8 flex-wrap">
          {["All", "Codeforces", "LeetCode", "AtCoder", "Bookmark"].map((filter) => (
              <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-2 rounded-lg transition font-medium ${ activeFilter === filter ? "bg-gray-700 text-white" : "bg-gray-200 text-black hover:bg-gray-300"}`}>
                {filter}
              </button>
            )
          )}
        </div>

        {loading ? (
          <p className="text-gray-400">Loading contests...</p>
        ) : filteredContests.length === 0 ? (
          <p className="text-gray-400">No contests available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContests.map((contest) => (
              <ContestCard
                key={contest.id}
                contest={contest}
                onBookmarkToggle={handleBookmarkToggle}
                handleVisitContest={handleVisitContest}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ContestPage;
