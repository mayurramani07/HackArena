import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; 

import SignupForm from "../components/SignupForm";

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-black text-white grid place-items-center p-4">
      <button
        onClick={() => navigate(-1)} 
        className="absolute top-4 left-4 flex items-center gap-1 text-white hover:text-gray-300">
        <ArrowLeft size={18} /> 
        <span className="text-sm">Back</span>
      </button>

      <div className="w-full max-w-md">
        <div className="bg-white text-black rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold">HackArena</h1>
            <p className="text-sm text-neutral-600 mt-1">
              Create your account
            </p>
          </div>

          <SignupForm />

          <div className="mt-6 text-center text-sm text-neutral-600">
            Already have an account?{" "}
            <a href="/login" className="text-black underline">
              Login
            </a>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-neutral-400">
          © {new Date().getFullYear()} HackArena. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
