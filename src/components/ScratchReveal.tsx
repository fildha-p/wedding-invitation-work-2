import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";

export default function ScratchReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const scratched = useRef(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const card = cardRef.current;
    if (!canvas || !card) return;

    canvas.width = card.offsetWidth;
    canvas.height = card.offsetHeight;
    const ctx = canvas.getContext("2d")!;

    const coverGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    coverGradient.addColorStop(0, "#3A2416");
    coverGradient.addColorStop(0.48, "#7B5E2E");
    coverGradient.addColorStop(1, "#2A1710");
    ctx.fillStyle = coverGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const glow = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      12,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width * 0.58,
    );
    glow.addColorStop(0, "rgba(217,196,143,0.24)");
    glow.addColorStop(1, "rgba(217,196,143,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(217,196,143,0.75)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(13, 13, canvas.width - 26, canvas.height - 26);
    ctx.strokeStyle = "rgba(230,221,195,0.28)";
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    ctx.fillStyle = "rgba(217,196,143,0.42)";
    for (let i = 0; i < 70; i += 1) {
      const size = Math.random() * 2.2 + 0.8;
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "#F3E7C0";
    ctx.font = "18px 'Cormorant Garamond'";
    ctx.textAlign = "center";
    ctx.fillText("Scratch the Seal", canvas.width / 2, canvas.height / 2 - 6);
    ctx.font = "12px 'Lato'";
    ctx.fillStyle = "rgba(230,221,195,0.82)";
    ctx.fillText("reveal the date & time", canvas.width / 2, canvas.height / 2 + 20);

    let isScratching = false;

    function scratch(x: number, y: number) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 28, 0, Math.PI * 2);
      ctx.fill();
      scratched.current += 1;
      if (scratched.current > 25) {
        canvas!.style.opacity = "0";
        canvas!.style.transition = "opacity 0.6s";
        if (hintRef.current) hintRef.current.textContent = "";
        setRevealed(true);
      }
    }

    const start = () => {
      isScratching = true;
    };
    const stop = () => {
      isScratching = false;
    };
    const move = (e: MouseEvent) => {
      if (!isScratching) return;
      const r = canvas.getBoundingClientRect();
      scratch(e.clientX - r.left, e.clientY - r.top);
    };
    const touchMove = (e: TouchEvent) => {
      e.preventDefault();
      const r = canvas.getBoundingClientRect();
      const t = e.touches[0];
      scratch(t.clientX - r.left, t.clientY - r.top);
    };

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mouseup", stop);
    canvas.addEventListener("mouseleave", stop);
    canvas.addEventListener("mousemove", move);
    canvas.addEventListener("touchmove", touchMove, { passive: false });

    return () => {
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mouseup", stop);
      canvas.removeEventListener("mouseleave", stop);
      canvas.removeEventListener("mousemove", move);
      canvas.removeEventListener("touchmove", touchMove);
    };
  }, []);

  return (
    <section className="px-6 py-24 text-center" style={{ background: "#fff" }}>
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
          Scratch to Reveal
        </h2>
        <SectionDivider />
        <p
          className="mb-5 font-serif text-sm italic"
          style={{
            color: "#E6DDC3",
            textShadow: "0 2px 10px rgba(20,15,10,0.6)",
          }}
        >
          Scratch the card to reveal the reception date and time
        </p>
        <div
          ref={cardRef}
          className="relative mx-auto overflow-hidden"
          style={{
            width: "min(360px, 90vw)",
            height: 200,
            borderRadius: 16,
            boxShadow: "0 18px 46px rgba(20,15,10,0.48)",
            cursor: "crosshair",
            border: "1px solid rgba(217,196,143,0.7)",
          }}
        >
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{
              background:
                "radial-gradient(circle at center, rgba(138,109,59,0.42), rgba(20,15,10,0.78))",
              padding: 24,
            }}
          >
            <p
              className="font-serif font-light"
              style={{ color: "#D9C48F", fontSize: 28, lineHeight: 1.1 }}
            >
              19 September 2026
            </p>
            <div
              className="my-1 h-px w-28"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(217,196,143,0.8), transparent)",
              }}
            />
            <p className="font-serif text-sm italic" style={{ color: "#E6DDC3" }}>
              7:00 PM to 10:00 PM
            </p>
          </div>
          {revealed &&
            Array.from({ length: 14 }, (_, i) => (
              <span
                key={i}
                className="scratch-sparkle"
                style={
                  {
                    "--spark-angle": `${(360 / 14) * i}deg`,
                    "--spark-distance": `${54 + (i % 4) * 12}px`,
                  } as CSSProperties
                }
              />
            ))}
          <canvas ref={canvasRef} className="absolute inset-0" style={{ borderRadius: 16 }} />
        </div>
        <p
          ref={hintRef}
          className="mt-3 font-serif text-sm italic"
          style={{ color: "#E6DDC3", textShadow: "0 2px 10px rgba(20,15,10,0.6)" }}
        >
          scratch with your finger or mouse
        </p>
      </motion.div>
    </section>
  );
}
