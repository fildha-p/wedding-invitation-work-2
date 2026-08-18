import { useState } from "react";
import CinematicIntro from "./components/CinematicIntro";
import Hero from "./components/Hero";
import CoupleIntro from "./components/CoupleIntro";
import WelcomeMessage from "./components/WelcomeMessage";
import ScratchReveal from "./components/ScratchReveal";
import PhotoCarousel from "./components/PhotoCarousel";
import CountdownTimer from "./components/CountdownTimer";
import ProgramTimeline from "./components/ProgramTimeline";
import DressCode from "./components/DressCode";
import Venue from "./components/Venue";
import Wishes from "./components/Wishes";
import Footer from "./components/Footer";
import FloralSidebar from "./components/FloralSidebar";
import MusicPlayer from "./components/MusicPlayer";

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
          <FloralSidebar side="left" />
          <FloralSidebar side="right" />
          <Hero />
          <CoupleIntro />
          <WelcomeMessage />
          <ScratchReveal />
          <PhotoCarousel />
          <CountdownTimer />
          <ProgramTimeline />
          <DressCode />
          <Venue />
          <Wishes />
          <Footer />
        </div>
      )}
    </>
  );
}
