import { useEffect, useState } from "react";

export default function SectionVideoBackdrop() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let frame = 0;

    function updateActiveVideo() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const sections = Array.from(
          document.querySelectorAll<HTMLElement>(".photo-blend-bg > section"),
        );
        const viewportCenter = window.innerHeight / 2;
        let nearestIndex = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;

        sections.forEach((section, index) => {
          const rect = section.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);

          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
          }
        });

        setActiveIndex(nearestIndex);
      });
    }

    updateActiveVideo();
    window.addEventListener("scroll", updateActiveVideo, { passive: true });
    window.addEventListener("resize", updateActiveVideo);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveVideo);
      window.removeEventListener("resize", updateActiveVideo);
    };
  }, []);

  const assetNumber = (activeIndex % 4) + 1;

  return (
    <div className="section-video-backdrop" aria-hidden="true">
      <video
        key={assetNumber}
        className="section-video-backdrop-media"
        autoPlay
        loop
        muted
        playsInline
        poster={`/assets/pic${assetNumber}.jpeg`}
      >
        <source src={`/assets/pic${assetNumber}.mp4`} type="video/mp4" />
      </video>
    </div>
  );
}
