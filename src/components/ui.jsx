import { useEffect, useRef, useState } from "react";

export const TEAL = "#00C8C0";
export const NAVY = "#0D1B2A";
export const NAVY2 = "#0A1520";
export const NAVY_CARD = "#111F2E";
export const NAVY_CARD2 = "#0F1C2A";

export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

export function AnimCounter({ target, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.3);

  useEffect(() => {
    if (!inView) return;
    let value = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      value += step;
      if (value >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(value);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function Reveal({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export const Label = ({ children, className = "" }) => (
  <span className={`label ${className}`}>{children}</span>
);

export const H2 = ({ children, center = false, className = "" }) => (
  <h2 className={`section-heading ${center ? "section-heading--center" : ""} ${className}`}>
    {children}
  </h2>
);

export const Muted = ({ children, center = false, maxWidth = 520, className = "" }) => (
  <p className={`muted ${center ? "muted--center" : ""} ${className}`} style={{ maxWidth }}>
    {children}
  </p>
);

export function GlassCard({ children, className = "", style = {} }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`glass-card ${hovered ? "glass-card--hover" : ""} ${className}`}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
}

export function Btn({ children, outline = false, onClick, className = "" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      className={`btn ${outline ? "btn--outline" : ""} ${hovered ? "btn--hover" : ""} ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
