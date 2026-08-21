import type { CSSProperties } from "react";

const petals = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 9) % 100}%`,
  delay: `${(i * 1.35) % 9}s`,
  duration: `${11 + (i % 6) * 1.8}s`,
  size: `${9 + (i % 4) * 3}px`,
  drift: `${(i % 2 === 0 ? 1 : -1) * (24 + (i % 5) * 9)}px`,
}));

export default function PetalOverlay() {
  return (
    <div className="petal-overlay" aria-hidden="true">
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="petal"
          style={
            {
              "--petal-left": petal.left,
              "--petal-delay": petal.delay,
              "--petal-duration": petal.duration,
              "--petal-size": petal.size,
              "--petal-drift": petal.drift,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
