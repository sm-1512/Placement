import React, { useState } from "react";
import { Check, Eye, EyeOff, Lock, Mail, User } from "lucide-react";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-16 items-center justify-center">
        {/* Left Section */}
        <div className="hidden lg:flex flex-col space-y-10">
          {[
            {
              title: "Streamlined Signup",
              desc: "Just a few details to get you started on your journey.",
            },
            {
              title: "Connect with Mentors",
              desc: "Direct access to seniors who cracked top offers.",
            },
            {
              title: "Grow with the Community",
              desc: "Placement is a journey. Walk it with others.",
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

        {/* Right Section - Signup Form */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-10 rounded-xl shadow-lg w-full max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-2">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Start building your placement journey today.
          </p>

          <form className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm text-zinc-800 dark:text-zinc-300 mb-1"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  required
                  className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                />
                <User
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400"
                  size={18}
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
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

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-90 transition font-medium"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
