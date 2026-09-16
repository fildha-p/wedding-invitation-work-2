export default function Footer() {
  return (
    <footer
      className="px-6 py-14 text-center"
      style={{
        background: "transparent",
      }}
    >
      <div className="mx-auto max-w-3xl px-6">
        <div
          className="mx-auto mb-7 flex max-w-sm items-center justify-center gap-4"
          style={{ color: "#B8924A" }}
        >
          <span
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(217,196,143,0.72))",
            }}
          />
          <span className="h-1 w-1 rounded-full" style={{ background: "#B8924A" }} />
          <span
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(217,196,143,0.72))",
            }}
          />
        </div>
        <p
          className="font-serif text-sm italic tracking-widest"
          style={{
            color: "#E6DDC3",
            letterSpacing: 3,
            textShadow: "0 2px 10px rgba(20,15,10,0.6)",
          }}
        >
          With best compliments from
        </p>
        <p
          className="footer-signature mt-2 font-light"
          style={{
            fontFamily: "'Pinyon Script', cursive",
            color: "#D9C48F",
            fontSize: "clamp(34px,4.8vw,54px)",
            lineHeight: 1,
            textShadow:
              "0 0 10px rgba(217,196,143,0.28), 0 0 26px rgba(184,146,74,0.22), 0 2px 12px rgba(20,15,10,0.72)",
          }}
        >
          Eversafe Group Of companies
        </p>
        <p
          className="mt-7 text-xs tracking-widest"
          style={{
            color: "#B8924A",
            letterSpacing: 4,
            textShadow: "0 2px 10px rgba(20,15,10,0.6)",
          }}
        >
          AN INVITATION BY @VOW.RA
        </p>
        <div
          className="mx-auto mt-6 h-px max-w-xs"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(217,196,143,0.48), transparent)",
          }}
        />
      </div>
    </footer>
  );
}
