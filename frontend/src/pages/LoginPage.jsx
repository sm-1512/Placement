import React, { useState } from "react";
import { Mail, Eye, EyeOff, Check } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-16 items-center justify-center">
        {/* Left: Value Props (Hidden on small screens) */}
        <div className="hidden lg:flex flex-col space-y-10">
          {[
            {
              title: "Faster Access",
              desc: "Jump back into your placement journey in seconds.",
            },
            {
              title: "Mentorship Continuity",
              desc: "Keep the conversation going with your mentors.",
            },
            {
              title: "Stay Connected",
              desc: "Never miss updates or important guidance.",
            },
          ].map(({ title, desc }, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="h-6 w-6 border rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-black dark:text-white" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-black dark:text-white">
                  {title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Login Form */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-10 rounded-xl shadow-lg w-full max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Log in to your account
          </p>

          <form className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-zinc-800 dark:text-zinc-300 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 pr-10 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                />
                <Mail
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400"
                  size={18}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm text-zinc-800 dark:text-zinc-300 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  className="w-full px-4 py-2 pr-10 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-90 transition font-medium"
            >
              Log In
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="underline hover:text-black dark:hover:text-white"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
