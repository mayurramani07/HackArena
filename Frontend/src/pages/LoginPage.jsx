import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const Login = () => {
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
      const res = await axios.post("http://localhost:7000/api/auth/login", {
        email,
        password,
      });

      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      } else {
        setErrorMessage("Unexpected response from server.");
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Login failed. Please try again.");
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
            <p className="text-sm text-neutral-600 mt-1">Login to continue</p>
          </div>

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
                  autoComplete="email"/>
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
                  {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                </button>
              </div>
            </label>

            {/* <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-neutral-300" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-black/70 hover:text-black underline">
                Forgot password?
              </a>
            </div> */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-black text-white py-2.5 text-sm font-medium shadow hover:opacity-90 active:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? "Signing in…" : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-neutral-600">
            Don’t have an account?{" "}
            <a href="#" className="text-black underline">Sign up</a>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-neutral-400">
          © {new Date().getFullYear()} HackArena. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
