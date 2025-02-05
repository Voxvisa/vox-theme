"use client";
import { motion } from "framer-motion";

export default function TestMotion() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="p-6 bg-blue-500 text-white text-center rounded-lg"
    >
      🎉 Framer Motion werkt!
    </motion.div>
  );
}
