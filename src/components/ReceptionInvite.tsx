import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";

export default function ReceptionInvite() {
  return (
    <section className="flex min-h-screen items-center px-6 py-20 text-center">
      <motion.div
        className="mx-auto max-w-3xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p
          className="mb-4 font-serif tracking-[0.22em]"
          style={{
            color: "#E4B7A1",
            fontSize: "clamp(12px,2vw,15px)",
            lineHeight: 1.8,
            textShadow: "0 2px 10px rgba(20,15,10,0.58)",
          }}
        >
          YOU ARE CORDIALLY INVITED TO CELEBRATE THE WEDDING RECEPTION OF
        </p>
        <div>
          <p
            className="font-light"
            style={{
              fontFamily: "'Pinyon Script', cursive",
              color: "#D9C48F",
              fontSize: "clamp(62px,12vw,126px)",
              lineHeight: 0.95,
              textShadow:
                "0 0 18px rgba(217,196,143,0.34), 0 3px 18px rgba(20,15,10,0.78)",
            }}
          >
            Dr Aiswarya
          </p>
          <p
            className="mt-2 font-serif italic"
            style={{
              color: "#E6DDC3",
              fontSize: "clamp(12px,2vw,15px)",
              lineHeight: 1.5,
              textShadow: "0 2px 10px rgba(20,15,10,0.62)",
            }}
          >
            Daughter of M. K. Sajeevan & Sumana Sajeevan
          </p>
          <span
            className="my-5 block font-serif font-light"
            style={{
              color: "#F3E7C0",
              fontSize: "clamp(42px,7vw,72px)",
              lineHeight: 0.9,
              textShadow: "0 2px 14px rgba(20,15,10,0.68)",
            }}
          >
            &
          </span>
          <p
            className="font-light"
            style={{
              fontFamily: "'Pinyon Script', cursive",
              color: "#D9C48F",
              fontSize: "clamp(62px,12vw,126px)",
              lineHeight: 0.95,
              textShadow:
                "0 0 18px rgba(217,196,143,0.34), 0 3px 18px rgba(20,15,10,0.78)",
            }}
          >
            Dr Anugrah
          </p>
          <p
            className="mt-2 font-serif italic"
            style={{
              color: "#E6DDC3",
              fontSize: "clamp(12px,2vw,15px)",
              lineHeight: 1.5,
              textShadow: "0 2px 10px rgba(20,15,10,0.62)",
            }}
          >
            Son of Dr Suresh Babu & Mrs Bindu Suresh Babu
          </p>
        </div>
        <SectionDivider />
        <p
          className="mx-auto max-w-xl font-serif italic leading-relaxed"
          style={{
            color: "#E6DDC3",
            fontSize: "clamp(15px,2.2vw,22px)",
            textShadow: "0 2px 12px rgba(20,15,10,0.7)",
          }}
        >
          Join us for an evening of joy, laughter, and celebration.
        </p>
      </motion.div>
    </section>
  );
}
