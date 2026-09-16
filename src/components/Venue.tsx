import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";

export default function Venue() {
  return (
    <section className="px-6 py-24 text-center" style={{ background: "#fff" }}>
      <motion.div
        className="mx-auto max-w-2xl"
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
          Venue
        </h2>
        <SectionDivider />
        <p
          className="mb-1 font-serif font-light"
          style={{ color: "#D9C48F", fontSize: "clamp(22px,4vw,38px)" }}
        >
          Arzahna Ballroom
        </p>
        <p
          className="mb-6 font-serif italic"
          style={{ color: "#E6DDC3", fontSize: 14, letterSpacing: 2 }}
        >
          Sheraton Hotel, Corniche, Abu Dhabi
        </p>
        <iframe
          title="Arzahna Ballroom Sheraton Hotel Corniche Abu Dhabi"
          src="https://www.google.com/maps?q=Arzahna%20Ballroom%20Sheraton%20Hotel%20Corniche%20Abu%20Dhabi&output=embed"
          className="mb-6 w-full rounded-xl"
          style={{ height: 260, border: "1px solid rgba(217,196,143,0.45)" }}
          allowFullScreen
          loading="lazy"
        />
        <a
          href="https://maps.google.com/?q=Arzahna+Ballroom+Sheraton+Hotel+Corniche+Abu+Dhabi"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg px-10 py-4 font-serif text-white italic"
          style={{ background: "rgba(20,15,10,0.68)", border: "1px solid rgba(217,196,143,0.55)", fontSize: 18, letterSpacing: 1 }}
        >
          Open Reception Location
        </a>
      </motion.div>
    </section>
  );
}
