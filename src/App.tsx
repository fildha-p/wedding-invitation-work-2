import { useState } from "react";
import CinematicIntro from "./components/CinematicIntro";
import ReceptionInvite from "./components/ReceptionInvite";
import WelcomeMessage from "./components/WelcomeMessage";
import ScratchReveal from "./components/ScratchReveal";
import CountdownTimer from "./components/CountdownTimer";
import Venue from "./components/Venue";
import Wishes from "./components/Wishes";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import PetalOverlay from "./components/PetalOverlay";
import SectionVideoBackdrop from "./components/SectionVideoBackdrop";

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
            <SectionVideoBackdrop />
            <ReceptionInvite />
            <WelcomeMessage />
            <ScratchReveal />
            <CountdownTimer />
            <Venue />
            <Wishes />
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}
