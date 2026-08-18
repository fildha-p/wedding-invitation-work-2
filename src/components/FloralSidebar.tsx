interface Props {
  side: "left" | "right";
}

export default function FloralSidebar({ side }: Props) {
  const flip = side === "right" ? "scale(-1,1)" : "scale(1,1)";
  return (
    <div
      className="pointer-events-none fixed top-0 z-10 hidden h-full w-28 lg:block"
      style={{ [side]: 0 }}
    >
      <svg
        viewBox="0 0 100 800"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", transform: flip }}
      >
        <g fill="none" stroke="#8BAF5A" strokeWidth="1.5">
          <path
            d="M80 800 Q60 700 70 600 Q80 500 60 400 Q40 300 55 200 Q65 120 50 40"
            strokeWidth="2"
          />
          <ellipse
            cx="60"
            cy="380"
            rx="22"
            ry="11"
            fill="#8BAF5A"
            fillOpacity="0.25"
            transform="rotate(-30 60 380)"
          />
          <ellipse
            cx="68"
            cy="480"
            rx="20"
            ry="10"
            fill="#8BAF5A"
            fillOpacity="0.25"
            transform="rotate(20 68 480)"
          />
          <ellipse
            cx="54"
            cy="240"
            rx="24"
            ry="12"
            fill="#8BAF5A"
            fillOpacity="0.2"
            transform="rotate(-15 54 240)"
          />
          <ellipse
            cx="62"
            cy="600"
            rx="18"
            ry="9"
            fill="#8BAF5A"
            fillOpacity="0.2"
            transform="rotate(10 62 600)"
          />
          <circle cx="50" cy="40" r="7" fill="#8B1A1A" fillOpacity="0.55" />
          <circle cx="58" cy="200" r="5" fill="#8B1A1A" fillOpacity="0.45" />
          <circle cx="62" cy="600" r="5" fill="#C9A84C" fillOpacity="0.6" />
          <circle cx="55" cy="700" r="4" fill="#C9A84C" fillOpacity="0.5" />
        </g>
      </svg>
    </div>
  );
}
