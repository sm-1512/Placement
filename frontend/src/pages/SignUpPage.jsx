import React, { useState } from "react";
import {
  Check,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
  Building2,
  GraduationCap,
  Briefcase,
  Calendar,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student", // default
    college: "",
    rollNo: "",
    graduationYear: "",
    passingYear: "",
    currentCompany: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 8)
      return toast.error("Password must be at least 8 characters");
    if (!formData.college.trim()) return toast.error("College is required");

    if (formData.role === "student") {
      if (!formData.rollNo.trim()) return toast.error("Roll No is required");
      if (!formData.graduationYear)
        return toast.error("Graduation Year is required");
    } else if (formData.role === "mentor") {
      if (!formData.passingYear) return toast.error("Passing Year is required");
      if (!formData.currentCompany.trim())
        return toast.error("Current Company is required");
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success) signup(formData);
    setFormData({
      fullName: "",
      email: "",
      password: "",
      role: "student",
      college: "",
      rollNo: "",
      graduationYear: "",
      passingYear: "",
      currentCompany: "",
    });
    setShowPassword(false);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-16 items-center justify-center">
        {/* Left: Highlights */}
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

        {/* Right: Signup Form */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 p-10 rounded-xl shadow-lg w-full max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-black dark:text-white mb-2">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Start building your placement journey today.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <InputField
              id="fullName"
              label="Full Name"
              icon={<User size={18} />}
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />

            {/* Email */}
            <InputField
              id="email"
              label="Email"
              type="email"
              icon={<Mail size={18} />}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            {/* Password */}
            <div>
              <label
                className="block text-sm text-zinc-800 dark:text-zinc-300 mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-2 pr-10 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                  placeholder="**************"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
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

            {/* Role Select */}
            <div>
              <label className="block text-sm text-zinc-800 dark:text-zinc-300 mb-1">
                Role
              </label>
              <select
                className="w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-black dark:text-white"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
              </select>
            </div>

            {/* College */}
            <InputField
              id="college"
              label="College"
              icon={<Building2 size={18} />}
              value={formData.college}
              onChange={(e) =>
                setFormData({ ...formData, college: e.target.value })
              }
            />

            {/* Student Fields */}
            {formData.role === "student" && (
              <>
                <InputField
                  id="rollNo"
                  label="Roll Number"
                  value={formData.rollNo}
                  onChange={(e) =>
                    setFormData({ ...formData, rollNo: e.target.value })
                  }
                />
                <div>
                  <label
                    htmlFor="graduationYear"
                    className="block text-sm text-zinc-800 dark:text-zinc-300 mb-1"
                  >
                    Graduation Year
                  </label>
                  <div className="relative">
                    <select
                      id="graduationYear"
                      name="graduationYear"
                      required
                      value={formData.graduationYear}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          graduationYear: e.target.value,
                        })
                      }
                      className="w-full appearance-none px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                    >
                      <option value="">Select Year</option>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = new Date().getFullYear() + i;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                    <Calendar
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 pointer-events-none"
                      size={18}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Mentor Fields */}
            {formData.role === "mentor" && (
              <>
                <div>
                  <label
                    htmlFor="passingYear"
                    className="block text-sm text-zinc-800 dark:text-zinc-300 mb-1"
                  >
                    Passing Year
                  </label>
                  <div className="relative">
                    <select
                      id="passingYear"
                      name="passingYear"
                      required
                      value={formData.passingYear}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          passingYear: e.target.value,
                        })
                      }
                      className="w-full appearance-none px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
                    >
                      <option value="">Select Year</option>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                    <Calendar
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 pointer-events-none"
                      size={18}
                    />
                  </div>
                </div>

                <InputField
                  id="currentCompany"
                  label="Current Company"
                  icon={<Briefcase size={18} />}
                  value={formData.currentCompany}
                  onChange={(e) =>
                    setFormData({ ...formData, currentCompany: e.target.value })
                  }
                />
              </>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-90 transition font-medium"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="inline animate-spin mr-2" size={18} />
                  Loading...
                </>
              ) : (
                <>
                  <Lock className="inline mr-2" size={18} /> Sign Up
                </>
              )}
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline hover:text-black dark:hover:text-white"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

const InputField = ({ id, label, icon, type = "text", value, onChange }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm text-zinc-800 dark:text-zinc-300 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        required
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 pr-10 rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
      {icon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400">
          {icon}
        </div>
      )}
    </div>
  </div>
);

export default SignUpPage;
