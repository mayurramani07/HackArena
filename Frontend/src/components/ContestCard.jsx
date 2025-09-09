import React, { useState, useEffect } from "react";
import {
  FaRegBookmark,
  FaBookmark,
  FaCalendarAlt,
  FaClock,
  FaExternalLinkAlt,
} from "react-icons/fa";
import axios from "axios";

const getStatus = (startTime, endTime) => {
  const now = new Date();
  if (now < new Date(startTime)) return "Upcoming";
  if (endTime && now > new Date(endTime)) return "Ended";
  return "Ongoing";
};

const ContestCard = ({
  contest,
  onBookmarkToggle,
  handleVisitContest,
  isLoggedIn,
  user,
}) => {
  const status = getStatus(contest.startTime, contest.endTime);
  const [reminderSet, setReminderSet] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Check if reminder already exists
  useEffect(() => {
    if (!user) return;

    const checkReminder = async () => {
      try {
        const res = await axios.get(
          `http://localhost:7000/api/reminders/${encodeURIComponent(
            user.email
          )}/${encodeURIComponent(contest.id)}`,
          { withCredentials: true }
        );
        if (res.data && res.data.exists) {
          setReminderSet(true);
        }
      } catch (err) {
        console.error("Failed to fetch reminder status:", err);
      }
    };

    checkReminder();
  }, [user, contest.id]);

  // ✅ Handle reminder creation
  const handleRemindMe = async () => {
    if (!user) return alert("Login required to set a reminder!");

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:7000/api/reminders/remind-me", // ✅ fixed route
        {
          name: user.name || user.email,
          email: user.email,
          contestId: contest.id,
          contestTitle: contest.title,
          contestStartTime: contest.startTime,
        },
        { withCredentials: true }
      );

      setReminderSet(true);
      alert(
        `Reminder set for "${contest.title}"! You'll get an email before the contest starts.`
      );
    } catch (err) {
      console.error("Reminder error:", err);
      alert("Failed to set reminder. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-100 text-black rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
      <div>
        <h2 className="text-lg md:text-xl font-bold leading-snug line-clamp-2">
          {contest.title}
        </h2>
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
            {new Date(contest.startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            -{" "}
            {contest.endTime
              ? new Date(contest.endTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A"}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-5 gap-2">
        {isLoggedIn ? (
          <button
            onClick={() => handleVisitContest(contest.url)}
            className="flex items-center gap-2 text-indigo-600 font-medium text-sm hover:underline"
          >
            Visit Contest <FaExternalLinkAlt className="text-xs" />
          </button>
        ) : (
          <button
            onClick={() => alert("Login required to view contest")}
            className="flex items-center gap-2 text-gray-500 font-medium text-sm cursor-not-allowed"
          >
            Visit Contest
          </button>
        )}

        <div className="flex items-center gap-2">
          {isLoggedIn && (
            <button
              onClick={handleRemindMe}
              disabled={reminderSet || loading}
              className={`px-3 py-1 text-sm font-medium rounded-lg transition ${
                reminderSet
                  ? "bg-green-200 text-green-800 cursor-not-allowed"
                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              }`}
            >
              {loading
                ? "Setting..."
                : reminderSet
                ? "Reminder Set"
                : "Remind Me"}
            </button>
          )}

          <button
            onClick={() => onBookmarkToggle(contest.id)}
            className="text-xl"
          >
            {contest.bookmarked ? (
              <FaBookmark className="text-indigo-600" />
            ) : (
              <FaRegBookmark className="text-gray-500 hover:text-indigo-600 transition" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
