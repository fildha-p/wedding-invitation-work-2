import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";

export default function CoupleIntro() {
  return (
    <section className="px-6 py-24 text-center" style={{ background: "#fff" }}>
      <motion.div
        className="mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p
          className="mb-2 font-serif italic tracking-widest"
          style={{
            color: "#E4B7A1",
            fontSize: "14px",
            fontWeight: 600,
            textShadow: "0 2px 10px rgba(20,15,10,0.55)",
          }}
        >
          WITH JOY WE ANNOUNCE
        </p>
        <SectionDivider />

        <div className="mb-4">
          <p
            className="font-light"
            style={{
              fontFamily: "'Pinyon Script', cursive",
              color: "#D9C48F",
              fontSize: "clamp(58px,9vw,104px)",
              fontWeight: 400,
              lineHeight: 1.05,
              textShadow: "0 2px 16px rgba(20,15,10,0.68)",
            }}
          >
            Dr Aiswarya
          </p>
          <p
            className="mt-2 font-serif italic"
            style={{
              color: "#E6DDC3",
              fontSize: "clamp(16px,2.4vw,21px)",
              fontWeight: 500,
              textShadow: "0 2px 10px rgba(20,15,10,0.6)",
            }}
          >
            Daughter of M. K. Sajeevan & Sumana Sajeevan
          </p>
        </div>

        <span
          className="my-4 block font-serif font-light"
          style={{
            color: "#D9C48F",
            fontSize: "clamp(56px,8vw,88px)",
            fontWeight: 400,
            textShadow: "0 2px 14px rgba(20,15,10,0.68)",
          }}
        >
          &
        </span>

        <div className="mt-4">
          <p
            className="font-light"
            style={{
              fontFamily: "'Pinyon Script', cursive",
              color: "#D9C48F",
              fontSize: "clamp(58px,9vw,104px)",
              fontWeight: 400,
              lineHeight: 1.05,
              textShadow: "0 2px 16px rgba(20,15,10,0.68)",
            }}
          >
            Dr Anugrah
          </p>
          <p
            className="mt-2 font-serif italic"
            style={{
              color: "#E6DDC3",
              fontSize: "clamp(16px,2.4vw,21px)",
              fontWeight: 500,
              textShadow: "0 2px 10px rgba(20,15,10,0.6)",
            }}
          >
            Son of Dr Suresh Babu & Mrs Bindu Suresh Babu
          </p>
        </div>
      </motion.div>
    </section>
  );
}
