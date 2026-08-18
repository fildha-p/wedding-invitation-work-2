import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";

export default function CoupleIntro() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24 text-center" style={{ background: "#fff" }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p
          className="mb-2 font-serif italic tracking-widest"
          style={{ color: "#8B1A1A", fontSize: "13px" }}
        >
          WITH JOY WE ANNOUNCE
        </p>
        <SectionDivider />

        <div className="mb-4">
          <p
            className="font-serif font-light italic"
            style={{ color: "#C9A84C", fontSize: "clamp(40px,7vw,70px)" }}
          >
            Dr Aiswarya
          </p>
          <p className="mt-1 font-serif text-sm italic text-gray-400">
            Daughter of Mr. & Mrs. [Parent Names] · [Profession]
          </p>
        </div>

        <span
          className="my-4 block font-serif font-light"
          style={{ color: "#2D5016", fontSize: "clamp(48px,8vw,80px)" }}
        >
          &
        </span>

        <div className="mt-4">
          <p
            className="font-serif font-light italic"
            style={{ color: "#C9A84C", fontSize: "clamp(40px,7vw,70px)" }}
          >
            Dr Anugrah
          </p>
          <p className="mt-1 font-serif text-sm italic text-gray-400">
            Son of Mr. & Mrs. [Parent Names] · [Profession]
          </p>
        </div>
      </motion.div>
    </section>
  );
}
