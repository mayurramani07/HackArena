import React, { useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

const ContestCard = ({ contest, onBookmarkToggle }) => {
  return (
    <div className="bg-white text-black rounded-xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 transition-transform cursor-pointer">
      <div>
        <h2 className="text-xl font-semibold">{contest.name}</h2>
        <p className="text-sm text-gray-600 mt-1">{contest.platform}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm">
          {contest.startDate} - {contest.endDate}
        </p>
        <button onClick={() => onBookmarkToggle(contest.id)}>
          {contest.bookmarked ? (
            <FaBookmark className="text-indigo-600" />
          ) : (
            <FaRegBookmark />
          )}
        </button>
      </div>
    </div>
  );
};

// Sample data
const sampleContests = [
  {
    id: 1,
    name: "Codeforces Round #123",
    platform: "Codeforces",
    startDate: "2025-08-23",
    endDate: "2025-08-23",
    bookmarked: false,
  },
  {
    id: 2,
    name: "LeetCode Weekly Contest",
    platform: "LeetCode",
    startDate: "2025-08-25",
    endDate: "2025-08-25",
    bookmarked: false,
  },
  {
    id: 3,
    name: "HackerRank 24h Challenge",
    platform: "HackerRank",
    startDate: "2025-08-27",
    endDate: "2025-08-27",
    bookmarked: false,
  },
];

const ContestPage = () => {
  const [contests, setContests] = useState(sampleContests);

  const handleBookmarkToggle = (id) => {
    setContests((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, bookmarked: !c.bookmarked } : c
      )
    );
  };

  return (
    <div className="bg-black min-h-screen text-white pt-20">
      <div className="px-6 md:px-16 pt-12">
        <h1 className="text-4xl font-bold mb-8">All Contests</h1>

        <div className="flex gap-4 mb-8 flex-wrap">
          <button className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition">
            Codeforces
          </button>
          <button className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition">
            LeetCode
          </button>
          <button className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition">
            Upcoming
          </button>
          <button className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition">
            Ongoing
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.map((contest) => (
            <ContestCard
              key={contest.id}
              contest={contest}
              onBookmarkToggle={handleBookmarkToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContestPage;
