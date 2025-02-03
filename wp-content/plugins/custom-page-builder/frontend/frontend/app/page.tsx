"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <motion.h1
        className="text-4xl font-bold text-primary"
        animate={{ opacity: [0, 1], y: [-10, 0] }}
        transition={{ duration: 0.5 }}
      >
        🚀 Next.js + TailwindCSS + Framer Motion!
      </motion.h1>
      <button
        className="mt-5 bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-secondary transition-all"
        onClick={() => setCount((c) => c + 1)}
      >
        Klik hier ({count})
      </button>
    </main>
  );
}

