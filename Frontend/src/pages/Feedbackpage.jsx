import React, { useState } from "react";
import axios from "axios";
// import Footer from "../components/Footer";

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.feedback) {
      setErrorMessage("Please enter your feedback before submitting.");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:7000/api/feedback", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", feedback: "" });
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white grid place-items-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white text-black rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold">HackArena</h1>
            <p className="text-sm text-neutral-600 mt-1">We value your feedback</p>
          </div>

          {errorMessage && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded-lg">
              {errorMessage}
            </div>
          )}

          {submitted ? (
            <p className="text-green-600 text-center font-medium">
              Thank you for your feedback! We’ll use it to improve HackArena 
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="mb-1 block text-sm font-medium">Name</span>
                <div className="rounded-xl border border-neutral-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-black/80">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name (optional)"
                    className="w-full bg-transparent outline-none text-sm"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium">Email</span>
                <div className="rounded-xl border border-neutral-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-black/80">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-transparent outline-none text-sm"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium">Feedback</span>
                <div className="rounded-xl border border-neutral-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-black/80">
                  <textarea
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    placeholder="Your Feedback or Suggestion *"
                    required
                    className="w-full bg-transparent outline-none text-sm h-28 resize-none"
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-black text-white py-2.5 text-sm font-medium shadow hover:opacity-90 active:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Sending…" : "Submit Feedback"}
              </button>
            </form>
          )}
        </div>

        {/* <Footer/> */}

        <p className="mt-6 text-center text-xs text-neutral-400">
          © {new Date().getFullYear()} HackArena. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default FeedbackPage;
