import { useState, useEffect, useRef } from "react";
import {
  Menu, X, ChevronRight, ArrowRight, FlaskConical, Microscope,
  Shield, Zap, Globe, BarChart3, CheckCircle, Clock, Users,
  Building2, Award, Phone, Mail, ExternalLink, ChevronDown,
  Layers, Activity, Lock, Star
} from "lucide-react";
import "./App.css";
import bgHero from "./assets/bgHero.svg";

/* ─── Animated Counter ─── */
function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  const decimals = Number.isInteger(end) ? 0 : 1;
  const factor = 10 ** decimals;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = performance.now();
        const tick = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = Math.round(eased * end * factor) / factor;
          setCount(value);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.25, rootMargin: "0px 0px -8% 0px" });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, factor]);

  return (
    <span ref={ref}>
      {count.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/* ─── Scroll Reveal ─── */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "revealed" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Technology", href: "#technology", id: "technology" },
    { label: "Implementation", href: "#implementation", id: "implementation" },
    { label: "About NewGen", href: "#about", id: "about" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
    setActive(id);
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <a href="#home" className="navbar__logo" onClick={() => scrollTo("home")}>
          <span className="navbar__logo-mark">M</span>
          <div>
            <span className="navbar__logo-name">MicroSort</span>
            <span className="navbar__logo-by"> by NewGen</span>
          </div>
        </a>

        <ul className="navbar__links">
          {links.map((l) => (
            <li key={l.id}>
              <button
                className={`navbar__link ${active === l.id ? "navbar__link--active" : ""}`}
                onClick={() => scrollTo(l.id)}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <button className="btn btn--primary btn--sm" onClick={() => scrollTo("contact")}>
          Partner With Us
        </button>

        <button className="navbar__burger" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="navbar__mobile">
          {links.map((l) => (
            <button key={l.id} className="navbar__mobile-link" onClick={() => scrollTo(l.id)}>
              {l.label}
            </button>
          ))}
          <button className="btn btn--primary" onClick={() => scrollTo("contact")}>
            Partner With Us
          </button>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="hero">
      <div
        className="hero__background"
        style={{
          backgroundImage: `url(${bgHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="hero__image-overlay" />
      <div className="hero__grid-overlay" />
      <div className="hero__strand hero__strand--1" />
      <div className="hero__strand hero__strand--2" />
      <div className="hero__cell hero__cell--1" />
      <div className="hero__cell hero__cell--2" />
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />

      <div className="hero__content container">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          <span>NASDAQ: NIVF · Licensed Technology Platform</span>
        </div>

        <h1 className="hero__heading">
          License <span className="hero__heading--accent">MicroSort</span> Technology<br />
          for Your Fertility Center
        </h1>

        <p className="hero__text">
          The world's most clinically validated sperm sorting platform — now available
          for licensing to elite IVF centers globally. Differentiate your clinic.
          Grow your practice.
        </p>
        <div className="hero__ctas">
          <button className="btn btn--primary btn--lg" onClick={() => scrollTo("contact")}>
            Explore Licensing Opportunities
            <ArrowRight size={18} />
          </button>
          <button className="btn btn--outline btn--lg" onClick={() => scrollTo("technology")}>
            View Technology
          </button>
        </div>

        {/* hero scroll chevron removed per request */}
      </div>
    </section>
  );
}

/* ─── Stats Bar ─── */
function StatsBar() {
  const stats = [
    { value: 430000, suffix: "+", label: "Annual IVF Cycles (U.S.)" },
    { value: 94.4, suffix: "%", label: "Sort Accuracy" },
    { value: 6, suffix: "", label: "Active Patents" },
    { value: 18, suffix: "+", label: "Deployed Cytometers" },
  ];

  return (
    <section id="stats" className="stats-bar">
      <div className="container stats-bar__grid">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 100} className="stats-bar__item">
            <div className="stats-bar__value">
              <Counter end={s.value} suffix={s.suffix} />
            </div>
            <div className="stats-bar__label">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Partnership Advantages ─── */
function PartnershipAdvantages() {
  const cards = [
    { icon: <BarChart3 size={28} />, title: "Revenue Differentiation", body: "Introduce a premium, billable service that the vast majority of competing centers cannot offer — commanding higher per-cycle revenue." },
    { icon: <Shield size={28} />, title: "IP-Backed Platform", body: "Six active patents covering advanced microfluidic systems ensure your clinic accesses technology with genuine competitive moats." },
    { icon: <Zap size={28} />, title: "Rapid Clinical Integration", body: "From agreement to first sort in as little as 10 weeks. Minimal infrastructure requirements and under 2-minute setup time." },
    { icon: <Users size={28} />, title: "Patient Acquisition", body: "Attract family balancing patients and families managing X-linked genetic conditions who actively seek this capability." },
    { icon: <Globe size={28} />, title: "Global Regulatory Support", body: "Experienced across Asia, U.S., and GCC jurisdictions. We provide jurisdiction-appropriate regulatory guidance throughout." },
    { icon: <Award size={28} />, title: "NASDAQ-Listed Partner", body: "Partner with a publicly accountable, NASDAQ-listed company with transparent financials and institutional governance." },
  ];

  return (
    <section className="section" id="advantages">
      <div className="container">
        <Reveal>
          <div className="section__label">Partnership Advantages</div>
          <h2 className="section__title">Why Leading Fertility Centers<br />Partner With NewGen</h2>
          <p className="section__sub">Six dimensions of differentiation that matter to clinic directors and clinic owners.</p>
        </Reveal>

        <div className="card-grid card-grid--3">
          {cards.map((c, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="card">
                <div className="card__icon">{c.icon}</div>
                <h3 className="card__title">{c.title}</h3>
                <p className="card__body">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Ideal Partners ─── */
function IdealPartners() {
  const profiles = [
    "High-volume IVF centers processing 200+ cycles annually",
    "Clinics serving international patients seeking gender selection",
    "Centers treating families with X-linked genetic conditions",
    "Fertility groups seeking premium service differentiation",
    "Hospital-based reproductive medicine departments",
    "Private equity-backed fertility networks",
    "IVF centers entering the GCC, Southeast Asia, or U.S. markets",
  ];

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="section section--alt" id="ideal">
      <div className="container ideal__layout">
        <Reveal className="ideal__left">
          <div className="section__label">Ideal Partners</div>
          <h2 className="section__title">Is MicroSort Right<br />for Your Clinic?</h2>
          <p className="section__sub">
            MicroSort licensing is designed for established IVF centers with the infrastructure, patient volume,
            and clinical ambition to lead their market.
          </p>
          <button className="btn btn--primary" onClick={() => scrollTo("contact")}>
            Request Partnership Information <ArrowRight size={16} />
          </button>
        </Reveal>

        <Reveal delay={150} className="ideal__right">
          <div className="checklist">
            {profiles.map((p, i) => (
              <div key={i} className="checklist__item">
                <CheckCircle size={18} className="checklist__icon" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Technology Heritage ─── */
function TechHeritage() {
  return (
    <section className="section heritage">
      <div className="container">
        <Reveal>
          <div className="section__label">Technology Heritage</div>
          <h2 className="section__title">Decades of Science.<br />Now Available to Your Clinic.</h2>
        </Reveal>

        <div className="heritage__timeline">
          {[
            { phase: "Foundation", years: "Research & Development", desc: "Flow cytometry combined with fluorescent DNA staining methodology refined across thousands of clinical cycles — establishing the precision benchmark for sperm sorting." },
            { phase: "Acquisition", years: "Strategic IP Transfer", desc: "NewGenIVF Group acquires the full cytometry patent portfolio in July 2025, securing 6 active patents and 18 deployed units across Asia and Central Asia." },
            { phase: "Deployment", years: "Global Licensing", desc: "MicroSort technology made available to elite fertility centers worldwide through a structured licensing program with full clinical and operational support." },
          ].map((t, i) => (
            <Reveal key={i} delay={i * 120} className="heritage__step">
              <div className="heritage__step-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="heritage__step-content">
                <div className="heritage__step-phase">{t.phase}</div>
                <div className="heritage__step-years">{t.years}</div>
                <p>{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Technology Section ─── */
function Technology() {
  const advantages = [
    { icon: <FlaskConical size={24} />, title: "Microfluidic Precision", body: "Gentle < 1 PSI sample pressure preserves cell viability throughout the sorting process — no compromise on sperm quality." },
    { icon: <Microscope size={24} />, title: "Flow Cytometry Core", body: "Fluorescent DNA staining methodology provides chromosomal-level precision, not estimation. Sort X-bearing from Y-bearing sperm with clinical reliability." },
    { icon: <Activity size={24} />, title: "94.4% Validated Accuracy", body: "Accuracy figures validated across multiple deployed units — not a theoretical figure from a single prototype." },
    { icon: <Shield size={24} />, title: "Zero Cross-Contamination", body: "Single-use cartridge system eliminates cross-contamination risk entirely. No reprocessing. No compromise." },
    { icon: <Zap size={24} />, title: "< 2 Minute Setup", body: "From power-on to first sort in under two minutes. Designed for integration into existing IVF workflows without disruption." },
    { icon: <Layers size={24} />, title: "Lab Integration Ready", body: "Compatible with standard IVF laboratory configurations. Minimal infrastructure requirements for clinical deployment." },
  ];

  const specs = [
    ["Sort Accuracy", "94.4%", "Validated across deployed units"],
    ["Sample Pressure", "< 1 PSI", "Microfluidic, cell-viability preserving"],
    ["Setup Time", "< 2 minutes", "Power-on to first sort"],
    ["Cartridge Type", "Single-use", "Zero cross-contamination"],
    ["Patents", "6 Active", "Covering microfluidic systems"],
    ["Deployed Units", "18+", "Asia & Central Asia operations"],
    ["Documentation", "Under NDA", "For qualified clinic partners"],
    ["Integration", "Lab-compatible", "Standard IVF workflow compatible"],
  ];

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="section section--alt" id="technology">
      <div className="container">
        <Reveal>
          <div className="section__label">Clinical Technology</div>
          <h2 className="section__title">The Science Behind MicroSort</h2>
          <p className="section__sub">Six clinical advantages that distinguish MicroSort from every alternative on the market.</p>
        </Reveal>

        <div className="card-grid card-grid--3">
          {advantages.map((a, i) => (
            <Reveal key={i} delay={i * 70}>
              <div className="card card--sm">
                <div className="card__icon card__icon--sm">{a.icon}</div>
                <h3 className="card__title card__title--sm">{a.title}</h3>
                <p className="card__body">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="spec-table-wrap">
            <div className="section__label" style={{ marginBottom: "1.5rem" }}>Key Performance Parameters</div>
            <table className="spec-table">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Value</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {specs.map(([param, val, note], i) => (
                  <tr key={i}>
                    <td className="spec-table__param">{param}</td>
                    <td className="spec-table__val">{val}</td>
                    <td className="spec-table__note">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="spec-table__cta">
              <Lock size={14} />
              <span>Full technical documentation available under NDA to qualified clinic partners.</span>
              <button className="btn btn--outline btn--sm" onClick={() => scrollTo("contact")}>
                Request Documentation
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Implementation ─── */
function Implementation() {
  const pillars = [
    { icon: <Users size={24} />, title: "Training Program", body: "Comprehensive on-site and remote training for lab directors and embryologists. Protocol certification included." },
    { icon: <Activity size={24} />, title: "Workflow Integration", body: "Our implementation team designs your clinic's specific workflow integration plan before go-live." },
    { icon: <FlaskConical size={24} />, title: "Consumables Supply", body: "Ongoing supply of single-use cartridges and reagents managed through our logistics network." },
    { icon: <Phone size={24} />, title: "Dedicated Support", body: "Named account support contact, remote diagnostics, and on-site response SLA from go-live." },
  ];

  const timeline = [
    { week: "Week 1–2", step: "Initial Consultation & Assessment", desc: "Technical and commercial needs assessment with your medical and operations team." },
    { week: "Week 2–4", step: "Technical & Commercial Evaluation", desc: "Detailed site assessment, workflow mapping, and commercial term structuring." },
    { week: "Week 4–6", step: "Licensing Agreement Execution", desc: "Legal review, agreement execution, and pre-installation planning." },
    { week: "Week 6–8", step: "Equipment Installation & Validation", desc: "On-site installation, system validation, and QC sign-off by our technical team." },
    { week: "Week 8–10", step: "Clinical Training & Protocol Certification", desc: "Full team training, protocol documentation, and clinical readiness certification." },
    { week: "Week 10+", step: "Clinical Go-Live & Ongoing Support", desc: "First patient sorts, real-time support, and ongoing performance monitoring." },
  ];

  const faqs = [
    { q: "What infrastructure does MicroSort require?", a: "Standard IVF laboratory electrical and bench space. No specialized plumbing, gases, or cleanroom requirements beyond your existing lab environment." },
    { q: "How long does training take?", a: "Clinical training and protocol certification is completed within a 2-week window during weeks 8–10 of the implementation timeline." },
    { q: "How do regulatory requirements vary by jurisdiction?", a: "Applications and availability vary by jurisdiction. Our regulatory team provides guidance specific to your country's fertility regulatory framework as part of the partnership program." },
    { q: "How are consumables supplied?", a: "Single-use cartridges and reagents are supplied through our logistics network on a regular replenishment schedule, calibrated to your case volume." },
    { q: "What is the minimum case volume required?", a: "We recommend a minimum of 200 IVF cycles annually for MicroSort integration to deliver meaningful clinical and commercial impact." },
    { q: "What throughput can we expect?", a: "MicroSort is designed for integration into high-volume IVF workflows with case-appropriate throughput. Specific capacity planning is conducted during the assessment phase." },
  ];

  return (
    <section className="section" id="implementation">
      <div className="container">
        <Reveal>
          <div className="section__label">Clinical Implementation</div>
          <h2 className="section__title">Operational Simplicity.<br />Full Support.</h2>
          <p className="section__sub">The #1 concern from clinic directors is disruption. Our implementation program is designed to eliminate it.</p>
        </Reveal>

        <Reveal>
          <div className="quickbar">
            {["< 2 Min Setup", "Full Training Included", "Dedicated Account Support", "10-Week Go-Live"].map((item, i) => (
              <div key={i} className="quickbar__item">
                <CheckCircle size={16} className="quickbar__icon" />
                {item}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="card-grid card-grid--4" style={{ marginTop: "3rem" }}>
          {pillars.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="card">
                <div className="card__icon card__icon--sm">{p.icon}</div>
                <h3 className="card__title card__title--sm">{p.title}</h3>
                <p className="card__body">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="section__label" style={{ margin: "4rem 0 2rem" }}>Implementation Timeline</div>
          <h3 className="section__title section__title--sm">From First Contact to Clinical Go-Live</h3>
        </Reveal>

        <div className="timeline">
          {timeline.map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="timeline__item">
                <div className="timeline__left">
                  <div className="timeline__week">{t.week}</div>
                  <div className="timeline__connector" />
                </div>
                <div className="timeline__right">
                  <div className="timeline__step">{t.step}</div>
                  <p className="timeline__desc">{t.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="section__label" style={{ margin: "4rem 0 2rem" }}>FAQ</div>
          <h3 className="section__title section__title--sm">Frequently Asked by Clinic Directors</h3>
        </Reveal>

        <div className="faq-grid">
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 60}>
              <FaqItem q={f.q} a={f.a} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "faq-item--open" : ""}`}>
      <button className="faq-item__q" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <ChevronDown size={18} className={`faq-item__chevron ${open ? "faq-item__chevron--open" : ""}`} />
      </button>
      {open && <div className="faq-item__a">{a}</div>}
    </div>
  );
}

/* ─── Global Reach ─── */
function GlobalReach() {
  const markets = [
    { region: "Asia Pacific", flag: "🌏", desc: "Thailand, Cambodia, Kyrgyzstan operations. Serving a rapidly growing IVF market with increasing demand for family balancing services.", status: "Active" },
    { region: "United States", flag: "🇺🇸", desc: "2026 market entry targeting the 430,000+ annual IVF cycle opportunity. Regulatory pathway assessment underway.", status: "2026 Entry" },
    { region: "GCC Markets", flag: "🌍", desc: "UAE, Saudi Arabia, and Qatar represent high-potential markets with significant patient demand and favorable regulatory environments.", status: "Expanding" },
  ];

  return (
    <section className="section section--alt" id="global">
      <div className="container">
        <Reveal>
          <div className="section__label">Global Presence</div>
          <h2 className="section__title">A Platform Built<br />for International Reach</h2>
          <p className="section__sub">MicroSort licensing is structured for deployment across multiple jurisdictions with appropriate regulatory support in each market.</p>
        </Reveal>

        <div className="card-grid card-grid--3">
          {markets.map((m, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="card card--market">
                <div className="card__flag">{m.flag}</div>
                <div className="card__status">{m.status}</div>
                <h3 className="card__title">{m.region}</h3>
                <p className="card__body">{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About ─── */
function About() {
  const facts = [
    ["Stock Listing", "NASDAQ: NIVF"],
    ["Headquarters", "Bangkok, Thailand"],
    ["Operations", "Thailand · Cambodia · Kyrgyzstan"],
    ["Deployed Units", "18 cytometers + 8 partially constructed"],
    ["Active Patents", "6 covering advanced microfluidic systems"],
    ["U.S. Market Entry", "2026 — targeting 430,000+ annual cycles"],
  ];

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="section" id="about">
      <div className="container">
        <Reveal>
          <div className="section__label">Corporate Profile</div>
          <h2 className="section__title">The Company Behind MicroSort</h2>
          <p className="section__sub">
            NewGenIVF Group Limited (NASDAQ: NIVF) is a publicly listed fertility technology company
            headquartered in Bangkok with operations across Asia and Central Asia.
          </p>
        </Reveal>

        <div className="about__layout">
          <Reveal className="about__facts">
            <div className="section__label" style={{ marginBottom: "1.5rem" }}>Corporate Facts</div>
            <div className="fact-table">
              {facts.map(([k, v], i) => (
                <div key={i} className="fact-row">
                  <span className="fact-row__key">{k}</span>
                  <span className="fact-row__val">{v}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="about__pillars">
            {[
              { icon: <Building2 size={28} />, title: "Public Company Accountability", body: "NASDAQ-listed with transparent financial reporting, institutional governance, and the accountability of public markets." },
              { icon: <Clock size={28} />, title: "Decade of Expertise", body: "Deep operational experience in fertility technology across multiple Asian and Central Asian markets." },
              { icon: <Star size={28} />, title: "Commercially Validated Technology", body: "18 deployed cytometers across active clinical operations — not a proof-of-concept. A proven commercial platform." },
            ].map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="about__pillar">
                  <div className="card__icon card__icon--sm">{p.icon}</div>
                  <div>
                    <h3 className="card__title card__title--sm">{p.title}</h3>
                    <p className="card__body">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={300}>
              <a
                href="https://www.globenewswire.com"
                target="_blank"
                rel="noopener noreferrer"
                className="press-link"
              >
                <div>
                  <div className="press-link__label">Official Press Release · July 29, 2025</div>
                  <div className="press-link__title">Strategic Acquisition of Cytometry Technology</div>
                  <div className="press-link__source">GlobeNewswire · NewGenIVF Group Limited</div>
                </div>
                <ExternalLink size={18} />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Clinical Applications ─── */
function ClinicalApplications() {
  return (
    <section className="section section--alt" id="applications">
      <div className="container">
        <Reveal>
          <div className="section__label">Clinical Applications</div>
          <h2 className="section__title">Meeting Real Patient Demand<br />at Your Clinic</h2>
        </Reveal>

        <div className="applications__grid">
          {[
            {
              title: "Family Balancing",
              icon: "👨‍👩‍👧‍👦",
              body: "The largest patient segment globally. Families who have children of one sex and desire a child of the other. A growing, underserved demand in most IVF markets.",
              tag: "Primary Market"
            },
            {
              title: "X-Linked Genetic Risk Reduction",
              icon: "🧬",
              body: "Families carrying X-linked genetic conditions — Duchenne muscular dystrophy, haemophilia, Fragile X — who seek to reduce transmission risk through sex selection.",
              tag: "Medical Indication"
            },
            {
              title: "International Patient Acquisition",
              icon: "✈️",
              body: "Patients traveling internationally specifically for gender selection services. A premium segment that actively selects destination clinics by capability.",
              tag: "High-Value Segment"
            },
          ].map((a, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="application-card">
                <div className="application-card__emoji">{a.icon}</div>
                <div className="application-card__tag">{a.tag}</div>
                <h3 className="application-card__title">{a.title}</h3>
                <p className="application-card__body">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ─── */
function Contact() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", clinic: "",
    role: "", country: "", volume: "", inquiry: "", context: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <Reveal>
          <div className="section__label">Partner With Us</div>
          <h2 className="section__title">Request Clinic Partnership<br />Information</h2>
          <p className="section__sub">
            Complete the form below and a member of our clinic partnerships team will respond within one business day.
          </p>
        </Reveal>

        <div className="contact__layout">
          <Reveal className="contact__form-wrap">
            {submitted ? (
              <div className="contact__success">
                <CheckCircle size={48} className="contact__success-icon" />
                <h3>Inquiry Received</h3>
                <p>Thank you. A member of our clinic partnerships team will be in touch within one business day.</p>
              </div>
            ) : (
              <form className="contact__form" onSubmit={submit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input name="firstName" value={form.firstName} onChange={handle} required placeholder="Dr. Sarah" />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input name="lastName" value={form.lastName} onChange={handle} placeholder="Chen" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Professional Email Address *</label>
                  <input type="email" name="email" value={form.email} onChange={handle} required placeholder="director@fertilitycenter.com" />
                </div>
                <div className="form-group">
                  <label>Clinic / Center Name *</label>
                  <input name="clinic" value={form.clinic} onChange={handle} required placeholder="Pacific Fertility Center" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Role *</label>
                    <select name="role" value={form.role} onChange={handle} required>
                      <option value="">Select role</option>
                      <option>Medical Director</option>
                      <option>Lab Director</option>
                      <option>Clinic Owner</option>
                      <option>Operations / COO</option>
                      <option>Business Development</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Country / Region</label>
                    <input name="country" value={form.country} onChange={handle} placeholder="United States" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Annual IVF Cycle Volume</label>
                    <select name="volume" value={form.volume} onChange={handle} required>
                      <option value="">Select volume</option>
                      <option>Under 200</option>
                      <option>200–500</option>
                      <option>500–1,000</option>
                      <option>Over 1,000</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Primary Inquiry</label>
                    <select name="inquiry" value={form.inquiry} onChange={handle} required>
                      <option value="">Select type</option>
                      <option>Licensing</option>
                      <option>Technical</option>
                      <option>Implementation</option>
                      <option>Regulatory</option>
                      <option>General</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Additional Context</label>
                  <textarea name="context" value={form.context} onChange={handle} rows={4} placeholder="Tell us about your clinic, patient population, or specific questions..." />
                </div>
                <button type="submit" className="btn btn--primary btn--full">
                  Submit Partnership Inquiry <ArrowRight size={18} />
                </button>
              </form>
            )}
          </Reveal>

          <div className="contact__sidebar">
            <Reveal delay={100}>
              <div className="sidebar-card">
                <h4 className="sidebar-card__title">What to Expect</h4>
                {[
                  "Inquiry review within 1 business day",
                  "Introductory call with clinic partnerships team",
                  "Technical & commercial assessment",
                  "Tailored partnership proposal",
                ].map((step, i) => (
                  <div key={i} className="sidebar-step">
                    <div className="sidebar-step__num">{i + 1}</div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="sidebar-card">
                <h4 className="sidebar-card__title">Direct Contact</h4>
                <a href="mailto:clinics@newgenivf.com" className="sidebar-contact">
                  <Mail size={16} />
                  clinics@newgenivf.com
                </a>
                <a href="https://newgenivf.com" target="_blank" rel="noopener noreferrer" className="sidebar-contact">
                  <Globe size={16} />
                  newgenivf.com
                </a>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="sidebar-disclaimer">
                <Lock size={14} />
                <p>
                  This platform is intended for licensed fertility centers and qualified medical professionals only.
                  Applications and availability vary by jurisdiction.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ─── */
function FinalCTA() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="final-cta">
      <div className="final-cta__orb" />
      <div className="container final-cta__content">
        <Reveal>
          <div className="section__label">Ready to Start?</div>
          <h2 className="final-cta__title">Ready to Differentiate<br />Your Fertility Center?</h2>
          <p className="final-cta__sub">
            Join leading fertility centers in Asia, the U.S., and the GCC who have chosen
            MicroSort as their platform for clinical differentiation.
          </p>
          <div className="hero__ctas">
            <button className="btn btn--primary btn--lg" onClick={() => scrollTo("contact")}>
              Request Partnership Information <ArrowRight size={18} />
            </button>
            <button className="btn btn--outline btn--lg" onClick={() => scrollTo("technology")}>
              View Technology
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="navbar__logo" style={{ marginBottom: "1rem" }}>
            <span className="navbar__logo-mark">M</span>
            <div>
              <span className="navbar__logo-name">MicroSort</span>
              <span className="navbar__logo-by"> by NewGen</span>
            </div>
          </div>
          <p className="footer__tagline">
            Licensed clinical sperm sorting technology<br />for elite fertility centers worldwide.
          </p>
          <div className="footer__nasdaq">NASDAQ: NIVF · NewGenIVF Group Limited</div>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <div className="footer__col-title">Platform</div>
            {["Technology", "Implementation", "Clinical Applications", "Global Reach"].map(l => (
              <button key={l} className="footer__link" onClick={() => scrollTo(l.toLowerCase().replace(" ", ""))}>{l}</button>
            ))}
          </div>
          <div className="footer__col">
            <div className="footer__col-title">Company</div>
            {["About NewGen", "Partner With Us", "Press Release"].map(l => (
              <button key={l} className="footer__link" onClick={() => scrollTo(l === "About NewGen" ? "about" : "contact")}>{l}</button>
            ))}
          </div>
          <div className="footer__col">
            <div className="footer__col-title">Contact</div>
            <a href="mailto:clinics@newgenivf.com" className="footer__link">clinics@newgenivf.com</a>
            <a href="https://newgenivf.com" className="footer__link" target="_blank" rel="noopener noreferrer">newgenivf.com</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© 2026 NewGenIVF Group Limited. All rights reserved.</p>
          <p className="footer__disclaimer">
            Intended for licensed fertility centers and qualified medical professionals only.
            Applications vary by jurisdiction. This platform does not constitute medical advice to patients.
            Technical documentation provided under NDA to qualified clinics only.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── App ─── */
export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <PartnershipAdvantages />
      <IdealPartners />
      <TechHeritage />
      <Technology />
      <Implementation />
      <GlobalReach />
      <About />
      <ClinicalApplications />
      <FinalCTA />
      <Contact />
      <Footer />
    </>
  );
}
