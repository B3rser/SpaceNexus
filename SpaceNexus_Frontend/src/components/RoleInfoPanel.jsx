import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Atom, Briefcase } from "lucide-react";

const roleData = {
  scientific: {
    title: "Scientific",
    icon: <Atom size={22} />,
    keywords: ["Analysis", "Discovery", "Technical Data"],
  },
  investor: {
    title: "Investor",
    icon: <Briefcase size={22} />,
    keywords: ["Vision", "Growth", "Opportunity"],
  },
  astronaut: {
    title: "Astronaut",
    icon: <Rocket size={22} />,
    keywords: ["Exploration", "Space", "Mission Architect"],
  },
};

export default function RoleInfoPanel({ hovered }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 40,
        left: "50%",
        transform: "translateX(-50%)",
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            style={{
              background:
                "linear-gradient(135deg, rgba(50,100,255,0.2), rgba(200,0,255,0.2))",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 20,
              padding: "16px 24px",
              backdropFilter: "blur(10px)",
              boxShadow: "0 0 20px rgba(120,200,255,0.5)",
              color: "white",
              textAlign: "center",
              fontFamily: "Orbitron, sans-serif", 
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 10,
                alignItems: "center",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {roleData[hovered].icon}
              {roleData[hovered].title}
            </div>
            <div style={{ marginTop: 10, display: "flex", gap: 10, justifyContent: "center" }}>
              {roleData[hovered].keywords.map((k, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    fontSize: 14,
                  }}
                >
                  {k}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
