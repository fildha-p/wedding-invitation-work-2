export default function SectionDivider() {
  return (
    <div
      className="my-4 flex items-center justify-center gap-3"
      style={{ color: "#C9A84C" }}
    >
      <span
        className="section-divider-line block h-px w-16"
        style={{
          background: "linear-gradient(to right, transparent, #C9A84C)",
        }}
      />
      <span
        className="section-divider-line block h-px w-16"
        style={{
          background: "linear-gradient(to left, transparent, #C9A84C)",
        }}
      />
    </div>
  );
}
