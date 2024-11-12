import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function ItemsNavBar({ icon, text, route, ativo }) {
  return (
    <Link to={route} className="flex items-center gap-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`relative flex items-center p-2 gap-x-2 rounded-xl cursor-pointer transition-colors group ${
          ativo
            ? "text-emerald-600 font-bold"
            : "text-slate-400 font-medium hover:text-emerald-600"
        }`}
      >
        <span>{icon}</span>
        <span>{text}</span>
      </motion.div>
    </Link>
  );
}
