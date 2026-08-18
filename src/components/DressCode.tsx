import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";

const codes = [
  {
    event: "Haldi",
    date: "Sep 1 · 4 PM",
    swatches: ["#F4C542", "#F48FB1", "#FF8C42"],
    label: "Yellow · Pink · Orange",
  },
  {
    event: "Sangeet",
    date: "Sep 2 · 6 PM",
    swatches: ["#1A237E", "#212121"],
    label: "Dark Blue · Black",
  },
  { event: "Wedding", date: "Sep 5 · TBD", swatches: [], label: "To be announced" },
];

export default function DressCode() {
  return (
    <section className="px-6 py-24 text-center" style={{ background: "#FAF7F2" }}>
      <h2
        className="font-serif font-light italic"
        style={{ color: "#2D5016", fontSize: "clamp(28px,5vw,44px)" }}
      >
        Dress Code
      </h2>
      <SectionDivider />
      <div
        className="mx-auto grid max-w-lg gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}
      >
        {codes.map((c, i) => (
          <motion.div
            key={c.event}
            className="rounded-xl p-5 text-center"
            style={{ background: "#fff", border: "1px solid #e8e0d0" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <p
              className="mb-1 font-serif font-light"
              style={{ color: "#2D5016", fontSize: 20 }}
            >
              {c.event}
            </p>
            <p className="mb-3 text-xs italic" style={{ color: "#aaa" }}>
              {c.date}
            </p>
            <div className="mb-2 flex justify-center gap-2">
              {c.swatches.map((s) => (
                <div
                  key={s}
                  className="h-5 w-5 rounded-full border border-black/10"
                  style={{ background: s }}
                />
              ))}
            </div>
            <p className="text-xs" style={{ color: "#999" }}>
              {c.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
