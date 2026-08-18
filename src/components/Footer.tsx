export default function Footer() {
  return (
    <footer className="px-6 py-16 text-center" style={{ background: "#2D5016" }}>
      <p
        className="mb-3 font-serif font-light italic text-white"
        style={{ fontSize: "clamp(20px,4vw,36px)" }}
      >
        "We can't wait to celebrate with you!"
      </p>
      <p
        className="font-serif font-light"
        style={{ color: "#C9A84C", fontSize: "clamp(18px,3vw,26px)" }}
      >
        Dr Aiswarya & Dr Anugrah
      </p>
      <p
        className="mt-2 text-xs tracking-widest"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        5 SEPTEMBER 2026 · CIAL CONVENTION CENTRE · NEDUMBASSERY
      </p>
      <div className="mt-6 text-2xl" style={{ color: "#8B1A1A" }}>
        ♥
      </div>
    </footer>
  );
}
