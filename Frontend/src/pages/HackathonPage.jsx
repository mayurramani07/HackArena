import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchHackathons } from "../services/hackathonService";
import { FaExternalLinkAlt, FaCalendarAlt } from "react-icons/fa";

const HackathonCard = ({ hackathon }) => {
  return (
    <div className="bg-black text-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
      <div>
        <h2 className="text-lg md:text-xl font-bold leading-snug line-clamp-2">
          {hackathon.name}
        </h2>
        <p className="text-sm text-gray-400 mt-1">{hackathon.platform}</p>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <FaCalendarAlt className="text-indigo-400" />
          <span>{new Date(hackathon.date).toLocaleString()}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-5">
        <a
          href={hackathon.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-indigo-400 font-medium text-sm hover:underline"
        >
          Visit Hackathon <FaExternalLinkAlt className="text-xs" />
        </a>
      </div>
    </div>
  );
};

const HackathonPage = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHackathons = async () => {
      setLoading(true);
      const data = await fetchHackathons();
      setHackathons(data);
      setLoading(false);
    };
    loadHackathons();
  }, []);

  return (
    <div className="bg-white min-h-screen text-black pt-20">
      <Navbar />
      <div className="px-6 md:px-16 pt-12">
        <h1 className="text-4xl font-bold mb-8">All Hackathons</h1>

        {loading ? (
          <p className="text-gray-600">Loading hackathons...</p>
        ) : hackathons.length === 0 ? (
          <p className="text-gray-600">No hackathons available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hackathons.map((hackathon, idx) => (
              <HackathonCard key={idx} hackathon={hackathon} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HackathonPage;
