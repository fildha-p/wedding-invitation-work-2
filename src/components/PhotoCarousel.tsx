import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionDivider from "./SectionDivider";

const images = [
  "/assets/couple1.png",
  "/assets/couple2.png",
  "/assets/couple3.png",
  "/assets/couple4.png",
];

export default function PhotoCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % images.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="px-6 py-16 text-center" style={{ background: "#FAF7F2" }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2
          className="font-serif font-light italic"
          style={{
            color: "#D9C48F",
            fontSize: "clamp(28px,5vw,44px)",
            textShadow: "0 2px 16px rgba(20,15,10,0.68)",
          }}
        >
          Our Journey
        </h2>
        <SectionDivider />
        <div
          className="relative mx-auto overflow-hidden"
          style={{
            width: "min(400px, 90vw)",
            aspectRatio: "4/5",
            borderRadius: 16,
            boxShadow: "0 16px 42px rgba(20,15,10,0.45)",
            background: "rgba(20,15,10,0.45)",
            border: "1px solid rgba(217,196,143,0.45)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={images[current]}
              alt={`couple ${current + 1}`}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </AnimatePresence>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Show image ${i + 1}`}
              className="h-2 w-2 rounded-full transition-colors"
              style={{ background: i === current ? "#D9C48F" : "rgba(230,221,195,0.45)" }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
