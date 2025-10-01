import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password || !confirmPassword) {
      setErrorMessage("Please fill all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const data = await registerUser(email, password);
      if (data?.success) {
        navigate("/");
      } else {
        setErrorMessage(data?.message || "Unexpected error occurred.");
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Signup failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {errorMessage && (
        <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded-lg">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Email</span>
          <div className="flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-2 focus-within:ring-2 focus-within:ring-black/80">
            <input
              type="email"
              className="w-full bg-transparent outline-none text-sm"
              placeholder="ramanimayur@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Password</span>
          <div className="flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-2 focus-within:ring-2 focus-within:ring-black/80">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full bg-transparent outline-none text-sm"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="p-1 rounded-lg hover:bg-neutral-100"
            >
              {showPassword ? (
                <FaEyeSlash className="h-4 w-4" />
              ) : (
                <FaEye className="h-4 w-4" />
              )}
            </button>
          </div>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">
            Confirm Password
          </span>
          <div className="flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-2 focus-within:ring-2 focus-within:ring-black/80">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full bg-transparent outline-none text-sm"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-black text-white py-2.5 text-sm font-medium shadow hover:opacity-90 active:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Creating account…" : "Sign Up"}
        </button>
      </form>
    </>
  );
};

export default SignupForm;
