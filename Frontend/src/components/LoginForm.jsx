import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../services/authService";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      const data = await loginUser(email, password);

      if (data?.success) {
        window.location.href = "/";
      } else {
        setErrorMessage(data?.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Login failed. Please try again."
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

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Email</span>
          <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-black/80">
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
          <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-black/80">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full bg-transparent outline-none text-sm"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"/>
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="p-1 rounded-lg hover:bg-neutral-100"
              aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? (
                <FaEyeSlash className="h-4 w-4" />
              ) : (
                <FaEye className="h-4 w-4" />
              )}
            </button>
          </div>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-black text-white py-2.5 text-sm font-medium shadow hover:opacity-90 active:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed">
          {loading ? "Signing in…" : "Login"}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
