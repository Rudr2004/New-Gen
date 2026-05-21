import { useEffect, useState } from "react";
import { Btn, Label, NAVY, TEAL } from "../components/ui.jsx";
import bgHero from "../assets/bgHero.svg";

export default function Hero({ onNav }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <section id="hero" className="hero">
      <div
        className="hero__background"
        style={{
          transform: `translateY(${scrollY * 0.25}px)`,
            backgroundImage: `url(${bgHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="hero__image-overlay" />
      <div className="hero__orb" style={{ transform: `translateY(${scrollY * 0.12}px)` }} />

      <div className="hero__content">
        <Label>Clinic Partnership Program · NASDAQ: NIVF</Label>
        <h1 className="hero__heading">
          License MicroSort Technology<br />
          for Your <span>Fertility Center</span>
        </h1>
        <p className="hero__text">
          Differentiate your IVF program with the world's most validated sperm sorting platform. Licensed exclusively to qualified fertility centers.
        </p>
        <div className="hero__actions">
          <Btn onClick={() => onNav("Contact")}>Explore Licensing Opportunities</Btn>
          <Btn outline onClick={() => onNav("Technology")}>View Technology →</Btn>
        </div>
      </div>
    </section>
  );
}
