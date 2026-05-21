import { useEffect, useState } from "react";
import { Btn, NAVY2 } from "../components/ui.jsx";

export default function Navbar({ onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth <= 900 : false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = ["Technology", "Implementation", "About NewGen"];

  const handleClick = (page, e) => {
    e.preventDefault();
    onNav(page);
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`} style={{ background: scrolled ? `${NAVY2}f5` : "transparent" }}>
      <div className="navbar__inner">
        <div className="navbar__brand">MicroSort <span>by NewGen</span></div>

        {isMobile && (
          <button
            className="navbar__toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        )}

        <div className={`navbar__links ${isMobile ? (menuOpen ? "navbar__links--open" : "navbar__links--closed") : ""}`}>
          {navItems.map((link) => (
            <a
              key={link}
              href="#"
              className="navbar__link"
              onClick={(e) => handleClick(link, e)}
            >
              {link}
            </a>
          ))}
          <div className="navbar__action">
            <Btn onClick={() => { onNav("Contact"); setMenuOpen(false); }}>
              Partner With Us
            </Btn>
          </div>
        </div>
      </div>
    </nav>
  );
}
