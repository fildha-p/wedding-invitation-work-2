import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";

export default function WelcomeMessage() {
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
          style={{
            color: "#D9C48F",
            fontSize: "clamp(28px,5vw,44px)",
            textShadow: "0 2px 16px rgba(20,15,10,0.68)",
          }}
        >
          A Blessed Occasion
        </h2>
        <SectionDivider />
        <p
          className="font-serif italic leading-relaxed"
          style={{
            color: "#E6DDC3",
            fontSize: "clamp(16px,2.5vw,22px)",
            textShadow: "0 2px 10px rgba(20,15,10,0.6)",
          }}
        >
          We are honored to welcome you to the wedding ceremony of Dr Aiswarya &
          Dr Anugrah. As they begin their journey together in faith and love, we
          thank you for being part of this blessed occasion.
        </p>
      </motion.div>
    </section>
  );
}
