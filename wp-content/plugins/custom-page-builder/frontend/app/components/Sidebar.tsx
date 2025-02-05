"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiHome, FiSettings, FiMenu, FiX } from "react-icons/fi";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Sidebar Container */}
      <motion.div
        initial={false}
        animate={{ width: isOpen ? "180px" : "60px" }} // ✅ Sidebar smaller
        className="fixed top-0 left-0 h-full bg-gray-900 text-white flex flex-col items-start shadow-lg"
      >
        {/* Knop om Sidebar te openen/sluiten */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-4 right-4 text-white"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Sidebar Navigatie */}
        <nav className="mt-20 flex flex-col space-y-4 w-full">
          <a href="#" className="flex items-center gap-3 px-6 py-3 hover:bg-gray-700 w-full">
            <FiHome size={24} />
            {isOpen && <span>Dashboard</span>}
          </a>
          <a href="#" className="flex items-center gap-3 px-6 py-3 hover:bg-gray-700 w-full">
            <FiSettings size={24} />
            {isOpen && <span>Instellingen</span>}
          </a>
        </nav>
      </motion.div>
    </div>
  );
}
