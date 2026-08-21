import { useState } from "react";
import CinematicIntro from "./components/CinematicIntro";
import CoupleIntro from "./components/CoupleIntro";
import WelcomeMessage from "./components/WelcomeMessage";
import ScratchReveal from "./components/ScratchReveal";
import CountdownTimer from "./components/CountdownTimer";
import ProgramTimeline from "./components/ProgramTimeline";
import DressCode from "./components/DressCode";
import Venue from "./components/Venue";
import Wishes from "./components/Wishes";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import PetalOverlay from "./components/PetalOverlay";

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <MusicPlayer />
      {!introComplete && (
        <CinematicIntro onComplete={() => setIntroComplete(true)} />
      )}
      {introComplete && (
        <div className="relative">
          <PetalOverlay />
          <div className="photo-blend-bg">
            <CoupleIntro />
            <WelcomeMessage />
            <ScratchReveal />
            <CountdownTimer />
            <ProgramTimeline />
            <DressCode />
            <Venue />
            <Wishes />
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}
