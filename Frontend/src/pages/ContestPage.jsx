import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContestCard from "../components/ContestCard";
import {
  loadContests,
  handleBookmarkToggle,
  handleVisitContest,
  checkUserAuth,
} from "../services/contestService";

const ContestPage = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    checkUserAuth(setIsLoggedIn, setUser);
  }, []);


  useEffect(() => {
    loadContests(setContests, setLoading);
  }, []);

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
          {["All", "Codeforces", "LeetCode", "AtCoder", "Bookmark"].map(
            (filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg transition font-medium ${
                  activeFilter === filter
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
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
                onBookmarkToggle={(id) =>
                  handleBookmarkToggle(id, contests, setContests)
                }
                handleVisitContest={(url) =>
                  handleVisitContest(url, isLoggedIn, navigate)
                }
                isLoggedIn={isLoggedIn}
                user={user}
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
