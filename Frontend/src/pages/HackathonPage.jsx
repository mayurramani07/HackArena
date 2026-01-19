import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HackathonCard from "../components/HackathonCard";
import { fetchHackathons } from "../services/hackathonService";
import { checkUserAuth } from "../services/contestService";

const HackathonPage = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserAuth(setIsLoggedIn, setUser);
  }, []);

  useEffect(() => {
    const loadHackathons = async () => {
      setLoading(true);
      const data = await fetchHackathons();
      setHackathons(data);
      setLoading(false);
    };
    loadHackathons();
  }, []);

  const handleVisitHackathon = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white min-h-screen text-black pt-20">
      <Navbar />

      <div className="px-6 md:px-16 pt-12">
        <h1 className="text-4xl font-bold mb-8">
          All Hackathons
        </h1>

        {loading ? (
          <p className="text-gray-600">Loading hackathons...</p>
        ) : hackathons.length === 0 ? (
          <p className="text-gray-600">No hackathons available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hackathons.map((hackathon, idx) => (
              <HackathonCard
                key={idx}
                hackathon={hackathon}
                handleVisitHackathon={handleVisitHackathon}
                isLoggedIn={isLoggedIn}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default HackathonPage;
