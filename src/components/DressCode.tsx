import { useState } from "react";
import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";

const codes = [
  {
    event: "Haldi",
    date: "Sep 1 · 4 PM",
    swatches: [
      { name: "Yellow", color: "#F4C542" },
      { name: "Pink", color: "#F48FB1" },
      { name: "Orange", color: "#FF8C42" },
    ],
    label: "Yellow · Pink · Orange",
    inspiration: ["Light kurta sets", "Floral sarees", "Soft festive linens"],
  },
  {
    event: "Sangeet",
    date: "Sep 2 · 6 PM",
    swatches: [{ name: "Black", color: "#212121" }],
    label: "Black",
    inspiration: ["Black ethnic wear", "Gold details", "Evening silhouettes"],
  },
];

export default function DressCode() {
  const [activeSwatch, setActiveSwatch] = useState("Haldi-Yellow");

  return (
    <section className="px-6 py-24 text-center" style={{ background: "#FAF7F2" }}>
      <h2
        className="font-serif font-light italic"
        style={{
          color: "#D9C48F",
          fontSize: "clamp(28px,5vw,44px)",
          textShadow: "0 2px 16px rgba(20,15,10,0.68)",
        }}
      >
        Dress Code
      </h2>
      <SectionDivider />
      <div
        className="mx-auto grid max-w-3xl gap-5"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}
      >
        {codes.map((c, i) => (
          <motion.div
            key={c.event}
            className="dress-code-card p-5 text-center"
            style={{
              background: "rgba(20,15,10,0.52)",
              border: "1px solid rgba(217,196,143,0.45)",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <p
              className="mb-1 font-serif font-light"
              style={{ color: "#D9C48F", fontSize: 20 }}
            >
              {c.event}
            </p>
            <p className="mb-3 text-xs italic" style={{ color: "#E6DDC3" }}>
              {c.date}
            </p>
            <div className="mb-3 flex min-h-14 items-center justify-center gap-2">
              {c.swatches.map((swatch, swatchIndex) => {
                const swatchId = `${c.event}-${swatch.name}`;
                const isActive = activeSwatch === swatchId;

                return (
                  <motion.button
                    key={swatchId}
                    type="button"
                    className="dress-fabric-swatch"
                    aria-label={`${c.event} dress code color ${swatch.name}`}
                    onClick={() => setActiveSwatch(swatchId)}
                    onFocus={() => setActiveSwatch(swatchId)}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    animate={{
                      width: isActive ? 106 : 36,
                      boxShadow: isActive
                        ? "0 0 24px rgba(217,196,143,0.34)"
                        : "0 0 10px rgba(20,15,10,0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    style={{
                      backgroundColor: swatch.color,
                      animationDelay: `${swatchIndex * 0.16}s`,
                    }}
                  >
                    <span
                      className="dress-swatch-label"
                      style={{ opacity: isActive ? 1 : 0 }}
                    >
                      {swatch.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
            <p className="mb-4 text-xs" style={{ color: "#E6DDC3" }}>
              {c.label}
            </p>
            <div className="grid gap-2">
              {c.inspiration.map((item) => (
                <motion.div
                  key={item}
                  className="dress-inspiration-mini"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
