import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;

    function tryPlay() {
      audio!.play().catch(() => {});
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
    }

    window.addEventListener("click", tryPlay);
    window.addEventListener("touchstart", tryPlay);

    return () => {
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted) {
      audio.play();
      setMuted(false);
    } else {
      audio.pause();
      setMuted(true);
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/assets/wedding-music.mp3" loop />
      <button
        onClick={toggle}
        title={muted ? "Unmute" : "Mute"}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 40,
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "1.5px solid #C9A84C",
          background: "rgba(250,247,242,0.85)",
          backdropFilter: "blur(8px)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
          transition: "all 0.2s",
        }}
      >
        {muted ? "🔇" : "🎵"}
      </button>
    </>
  );
}
