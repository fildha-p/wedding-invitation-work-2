import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";

export default function Wishes() {
  const [wish, setWish] = useState("");
  const [wishes, setWishes] = useState<string[]>([]);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wedding_wishes") || "[]");
    setWishes(stored);
  }, []);

  function send() {
    if (!wish.trim()) return;
    const updated = [wish.trim(), ...wishes];
    localStorage.setItem("wedding_wishes", JSON.stringify(updated));
    setWishes(updated);
    setWish("");
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  }

  return (
    <section className="px-6 py-24 text-center" style={{ background: "#FAF7F2" }}>
      <motion.div
        className="mx-auto max-w-xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2
          className="font-serif font-light italic"
          style={{ color: "#2D5016", fontSize: "clamp(28px,5vw,44px)" }}
        >
          Send Your Wishes
        </h2>
        <SectionDivider />
        <textarea
          value={wish}
          onChange={(e) => setWish(e.target.value)}
          placeholder="Write your wishes for the couple..."
          className="w-full resize-none rounded-xl p-4 font-sans text-base"
          style={{
            minHeight: 100,
            border: "1px solid #ddd",
            background: "#fff",
            color: "#2C2C2C",
            marginBottom: 12,
          }}
        />
        <br />
        <button
          onClick={send}
          className="rounded-lg px-10 py-4 font-serif text-white italic"
          style={{
            background: "#2D5016",
            fontSize: 18,
            letterSpacing: 1,
            border: "none",
            cursor: "pointer",
          }}
        >
          Send Message 💌
        </button>
        <div className="mt-8 text-left">
          {wishes.map((w, i) => (
            <div
              key={`${w}-${i}`}
              className="mb-3 px-4 py-3 font-serif italic"
              style={{
                borderLeft: "3px solid #C9A84C",
                borderRadius: "0 8px 8px 0",
                background: "#fff",
                color: "#555",
                fontSize: 16,
              }}
            >
              "{w}"
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full px-7 py-3 font-serif text-white italic"
        style={{ background: "#2D5016", fontSize: 16, pointerEvents: "none" }}
        animate={{ opacity: toast ? 1 : 0, y: toast ? 0 : 10 }}
        transition={{ duration: 0.4 }}
      >
        Wishes sent! 💚
      </motion.div>
    </section>
  );
}
