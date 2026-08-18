import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SectionDivider from "./SectionDivider";

export default function ScratchReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const scratched = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const card = cardRef.current;
    if (!canvas || !card) return;

    canvas.width = card.offsetWidth;
    canvas.height = card.offsetHeight;
    const ctx = canvas.getContext("2d")!;

    ctx.fillStyle = "#2D5016";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(201,168,76,0.3)";
    for (let i = 0; i < 40; i += 1) {
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }
    ctx.fillStyle = "#FAF7F2";
    ctx.font = "16px 'Lato'";
    ctx.textAlign = "center";
    ctx.fillText("✦ Scratch Here ✦", canvas.width / 2, canvas.height / 2);

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
        if (hintRef.current) hintRef.current.textContent = "💍 Revealed!";
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
          style={{ color: "#2D5016", fontSize: "clamp(28px,5vw,44px)" }}
        >
          Scratch to Reveal
        </h2>
        <SectionDivider />
        <p className="mb-5 font-serif text-sm italic text-gray-400">
          Scratch the card to reveal your invitation details
        </p>
        <div
          ref={cardRef}
          className="relative mx-auto overflow-hidden"
          style={{
            width: "min(320px, 90vw)",
            height: 180,
            borderRadius: 16,
            boxShadow: "0 4px 24px rgba(45,80,22,0.15)",
            cursor: "crosshair",
          }}
        >
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2"
            style={{ background: "#fff" }}
          >
            <p className="font-serif text-xl italic" style={{ color: "#C9A84C" }}>
              💍 You're Invited!
            </p>
            <p
              className="font-serif font-light"
              style={{ color: "#2D5016", fontSize: 18 }}
            >
              Dr Aiswarya & Dr Anugrah
            </p>
            <p className="font-serif text-sm italic text-gray-400">
              5 September 2026 · CIAL Convention Centre
            </p>
          </div>
          <canvas ref={canvasRef} className="absolute inset-0" style={{ borderRadius: 16 }} />
        </div>
        <p ref={hintRef} className="mt-3 font-serif text-sm italic text-gray-400">
          ← scratch with your finger or mouse →
        </p>
      </motion.div>
    </section>
  );
}
