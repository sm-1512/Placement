import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    //{ label: "Mentors", href: "/mentors" },
    { label: "Blog", href: "/blogs" },
    { label: "Login", href: "/login" },
  ];

  return (
    <header className="w-full bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-black dark:text-white">
          MentorConnect
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="text-sm text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-black dark:text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="flex flex-col gap-4">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="block text-sm text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
