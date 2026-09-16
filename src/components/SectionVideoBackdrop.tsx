import { useEffect, useRef, useState } from "react";

const assetNumbers = [1, 2, 3, 4];

export default function SectionVideoBackdrop() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

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

  const activeAssetIndex = activeIndex % assetNumbers.length;

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      const shouldPlay =
        index === activeAssetIndex ||
        index === (activeAssetIndex + 1) % assetNumbers.length;

      if (shouldPlay) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeAssetIndex]);

  return (
    <div className="section-video-backdrop" aria-hidden="true">
      {assetNumbers.map((assetNumber, index) => (
        <video
          key={assetNumber}
          ref={(node) => {
            videoRefs.current[index] = node;
          }}
          className={`section-video-backdrop-media ${
            index === activeAssetIndex ? "is-active" : ""
          }`}
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={`/assets/pic${assetNumber}.mp4`} type="video/mp4" />
        </video>
      ))}
    </div>
  );
}
