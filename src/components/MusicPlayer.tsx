import { useEffect, useRef, useState } from "react";

function MusicIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 18V6l10-2v12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="16" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function MutedIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 18V6l10-2v12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="18" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M15 14l5 5m0-5l-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const [muted, setMuted] = useState(false);

  function stopFade() {
    if (fadeTimerRef.current === null) return;
    window.clearInterval(fadeTimerRef.current);
    fadeTimerRef.current = null;
  }

  function fadeIn(audio: HTMLAudioElement) {
    stopFade();
    audio.volume = 0;
    audio
      .play()
      .then(() => {
        fadeTimerRef.current = window.setInterval(() => {
          audio.volume = Math.min(0.4, audio.volume + 0.025);
          if (audio.volume >= 0.4) {
            stopFade();
          }
        }, 80);
      })
      .catch(() => {});
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const liveAudio = audio;
    liveAudio.volume = 0;

    function tryPlay() {
      fadeIn(liveAudio);
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
    }

    window.addEventListener("click", tryPlay);
    window.addEventListener("touchstart", tryPlay);

    return () => {
      stopFade();
      window.removeEventListener("click", tryPlay);
      window.removeEventListener("touchstart", tryPlay);
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted) {
      fadeIn(audio);
      setMuted(false);
    } else {
      stopFade();
      audio.pause();
      audio.volume = 0;
      setMuted(true);
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/assets/wedding-music.mp3" loop />
      <button
        onClick={toggle}
        title={muted ? "Unmute" : "Mute"}
        aria-label={muted ? "Unmute music" : "Mute music"}
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
          color: "#7B5E2E",
          boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
          transition: "all 0.2s",
        }}
      >
        {muted ? <MutedIcon /> : <MusicIcon />}
      </button>
    </>
  );
}
