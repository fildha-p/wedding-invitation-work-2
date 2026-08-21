import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <img
        src="/assets/couple4.png"
        alt="hero"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        className="absolute inset-0"
        style={{ background: "rgba(250,247,242,0.5)" }}
      />
      <motion.div
        className="relative z-10 px-6 py-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p
          className="mb-3 font-serif italic tracking-widest"
          style={{ color: "#8B1A1A", fontSize: "clamp(12px,2.5vw,15px)" }}
        >
          You're Invited
        </p>
        <h1
          className="font-serif font-light"
          style={{
            color: "#2D5016",
            fontSize: "clamp(44px,9vw,90px)",
            lineHeight: 1.05,
          }}
        >
          Dr Aiswarya
          <span
            className="block"
            style={{ color: "#C9A84C", fontSize: "0.7em" }}
          >
            &
          </span>
          Dr Anugrah
        </h1>
        <p
          className="mt-6 font-serif tracking-widest"
          style={{ fontSize: "clamp(13px,2vw,17px)" }}
        >
          SATURDAY · 5 SEPTEMBER 2026
        </p>
        <p
          className="mt-1 font-serif tracking-widest"
          style={{ color: "#888", fontSize: "clamp(11px,1.8vw,14px)" }}
        >
          1202 ചിങ്ങം 20 · CIAL Convention Centre
        </p>
        <SectionDivider />
      </motion.div>
    </section>
  );
}
