import { MotionConfig } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { FloatingControls } from "./FloatingControls";
import { LeadModal } from "./LeadModal";
import { Faq } from "./sections/Faq";
import { FinalCta } from "./sections/FinalCta";
import { Footer } from "./sections/Footer";
import { ANNOUNCE_KEY, AnnouncementBar, Nav, ScrollProgress } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Method } from "./sections/Method";
import { Problem } from "./sections/Problem";
import { Proof } from "./sections/Proof";
import { Services } from "./sections/Services";
import { Team } from "./sections/Team";
import { Why } from "./sections/Why";

/* ------------- Page composition ------------- */

export function Site() {
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [barVisible, setBarVisible] = useState(true);

  const openModal = useCallback(() => setPremiumModalOpen(true), []);
  const closeModal = useCallback(() => setPremiumModalOpen(false), []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(ANNOUNCE_KEY) === "1") setBarVisible(false);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const dismissBar = () => {
    setBarVisible(false);
    try {
      sessionStorage.setItem(ANNOUNCE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    // Reduced-motion visitors get opacity-only transitions; transforms are skipped.
    <MotionConfig reducedMotion="user">
      <div className="relative bg-[#050505] text-[#f2f2e1]">
        <a href="#main" className="bb-skip">
          Skip to content
        </a>
        <ScrollProgress />
        <AnnouncementBar visible={barVisible} onCTA={openModal} onDismiss={dismissBar} />
        <Nav
          onCTA={openModal}
          barVisible={barVisible}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />

        <main id="main" inert={menuOpen}>
          <Hero onCTA={openModal} />
          <Proof onCTA={openModal} />
          <Problem onCTA={openModal} />
          <Services onCTA={openModal} />
          <Method />
          <Why />
          <Team />
          <Faq />
          <FinalCta onCTA={openModal} />
        </main>
        <div inert={menuOpen}>
          <Footer />
        </div>

        <FloatingControls onCTA={openModal} suppressed={menuOpen || premiumModalOpen} />
        <LeadModal open={premiumModalOpen} onClose={closeModal} />
      </div>
    </MotionConfig>
  );
}
