"use client";
import { useEffect, useState } from "react";
import {
  Cpu, Wrench, Network, Code2, Zap, ChevronDown,
  Mail, Linkedin, Github, Download, ArrowRight,
  Activity, Settings, BookOpen, X, ExternalLink,
  Target, GraduationCap, Heart,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════════ */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&display=swap');

  :root {
    --bg:        #0e1012;
    --bg2:       #13171a;
    --bg3:       #1a1f24;
    --border:    rgba(255,255,255,0.07);
    --blue:      #3d8ef0;
    --blue-dim:  rgba(61,142,240,0.15);
    --blue-glow: rgba(61,142,240,0.06);
    --text:      #f0f2f5;
    --muted:     #8a94a6;
    --accent:    #c8d8f0;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 16px; line-height: 1.6; overflow-x: hidden; }

  body::before {
    content: ''; position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 9999; opacity: 0.6;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: #2a3040; border-radius: 2px; }

  .display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; line-height: 0.92; }
  .section { padding: 130px 8%; border-bottom: 1px solid var(--border); position: relative; }
  @media (max-width: 900px) { .section { padding: 90px 6%; } }

  .label { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--blue); margin-bottom: 20px; }
  .label::before { content: ''; display: block; width: 24px; height: 1px; background: var(--blue); }

  .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.75s cubic-bezier(.22,1,.36,1), transform 0.75s cubic-bezier(.22,1,.36,1); }
  .reveal.visible { opacity: 1; transform: none; }
  .reveal-delay-1 { transition-delay: 0.08s; }
  .reveal-delay-2 { transition-delay: 0.16s; }
  .reveal-delay-3 { transition-delay: 0.24s; }
  .reveal-delay-4 { transition-delay: 0.36s; }
  .reveal-delay-5 { transition-delay: 0.5s; }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  @media (max-width: 860px) { .grid-2 { grid-template-columns: 1fr; gap: 48px; } }

  /* CARD */
  .card { background: var(--bg2); border: 1px solid var(--border); border-radius: 20px; padding: 32px; transition: border-color 0.3s, transform 0.4s cubic-bezier(.22,1,.36,1), box-shadow 0.4s; position: relative; overflow: hidden; }
  .card::before { content: ''; position: absolute; inset: 0; background: radial-gradient(500px circle at var(--mx,50%) var(--my,50%), var(--blue-glow), transparent 60%); opacity: 0; transition: opacity 0.4s; pointer-events: none; border-radius: inherit; }
  .card:hover { border-color: rgba(61,142,240,0.3); transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
  .card:hover::before { opacity: 1; }

  /* BUTTONS */
  .btn-primary { display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px; background: var(--blue); color: #fff; border: none; border-radius: 50px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; text-decoration: none; transition: background 0.2s, transform 0.2s, box-shadow 0.2s; }
  .btn-primary:hover { background: #5a9ff2; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(61,142,240,0.35); }
  .btn-ghost { display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px; background: transparent; color: var(--text); border: 1px solid rgba(255,255,255,0.15); border-radius: 50px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; text-decoration: none; transition: border-color 0.2s, color 0.2s, transform 0.2s; }
  .btn-ghost:hover { border-color: rgba(61,142,240,0.5); color: var(--blue); transform: translateY(-2px); }

  /* HERO */
  .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(61,142,240,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(61,142,240,0.04) 1px, transparent 1px); background-size: 60px 60px; mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%); pointer-events: none; }
  @keyframes scan { from { transform: translateY(0); } to { transform: translateY(100vh); } }
  .scan-line { position: absolute; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(61,142,240,0.3), transparent); animation: scan 6s linear infinite; pointer-events: none; }

  /* ── NAVBAR ── */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 5%; height: 68px;
    transition: background 0.4s, border-color 0.4s;
    border-bottom: 1px solid transparent;
  }
  .navbar.scrolled {
    background: rgba(10,12,14,0.92);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-color: rgba(255,255,255,0.1);
  }
  .nav-logo-btn {
    background: none; border: none; cursor: pointer;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 24px;
    letter-spacing: 0.1em;
    color: #ffffff;
    padding: 0;
    line-height: 1;
  }
  .nav-links { display: flex; align-items: center; gap: 6px; list-style: none; }
  .nav-btn {
    background: none; border: none; padding: 8px 14px; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: rgba(240,242,245,0.75);
    border-radius: 8px;
    transition: color 0.2s, background 0.2s;
    white-space: nowrap;
  }
  .nav-btn:hover { color: #ffffff; background: rgba(255,255,255,0.07); }
  @media (max-width: 900px) { .nav-links { display: none; } }

  /* SKILL BAR — reset complet pour fiabilité */
  .skill-bar-track {
    height: 4px;
    background: rgba(255,255,255,0.08);
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
    position: relative;
  }
  .skill-bar-fill {
    position: absolute;
    top: 0; left: 0;
    height: 100%;
    background: linear-gradient(90deg, #3d8ef0, #8ab4f8);
    border-radius: 4px;
    width: 0%;
    transition: width 1.3s cubic-bezier(.22,1,.36,1);
  }

  /* TIMELINE */
  .timeline-wrapper { position: relative; padding-left: 40px; }
  .timeline-line { position: absolute; left: 6px; top: 6px; bottom: 6px; width: 1px; background: linear-gradient(to bottom, var(--blue), transparent); }
  .timeline-item { position: relative; margin-bottom: 44px; }
  .timeline-item:last-child { margin-bottom: 0; }
  .timeline-dot { position: absolute; left: -37px; top: 3px; width: 12px; height: 12px; border-radius: 50%; background: var(--blue); border: 3px solid var(--bg); box-shadow: 0 0 10px rgba(61,142,240,0.5); }

  /* PROJECT CARD */
  .project-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 24px; overflow: hidden; transition: border-color 0.3s, transform 0.4s cubic-bezier(.22,1,.36,1), box-shadow 0.4s; cursor: pointer; }
  .project-card:hover { border-color: rgba(61,142,240,0.35); transform: translateY(-6px); box-shadow: 0 24px 80px rgba(0,0,0,0.5); }
  .project-thumb { width: 100%; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; font-size: 64px; position: relative; overflow: hidden; }
  .project-thumb::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, var(--bg2) 100%); }
  .project-content { padding: 28px 32px 32px; }
  .project-tag { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue); background: var(--blue-dim); padding: 4px 10px; border-radius: 4px; margin-bottom: 14px; }
  .click-hint { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: var(--blue); margin-top: 16px; opacity: 0.7; transition: opacity 0.2s; }
  .project-card:hover .click-hint { opacity: 1; }

  /* MODAL */
  .modal-backdrop { position: fixed; inset: 0; z-index: 5000; background: rgba(0,0,0,0.82); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 24px; animation: mdFadeIn 0.2s ease; }
  @keyframes mdFadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal-panel { background: var(--bg2); border: 1px solid rgba(61,142,240,0.2); border-radius: 28px; width: 100%; max-width: 780px; max-height: 90vh; overflow-y: auto; scrollbar-width: thin; animation: mdSlideUp 0.3s cubic-bezier(.22,1,.36,1); }
  @keyframes mdSlideUp { from { opacity: 0; transform: translateY(32px) scale(0.97); } to { opacity: 1; transform: none; } }
  .modal-header { display: flex; align-items: center; justify-content: space-between; padding: 28px 36px 0; }
  .modal-close { width: 36px; height: 36px; border-radius: 50%; background: var(--bg3); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--muted); transition: background 0.2s, color 0.2s; }
  .modal-close:hover { background: rgba(61,142,240,0.15); color: var(--blue); }
  .modal-body { padding: 28px 36px 40px; }
  .modal-thumb { width: 100%; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; border-radius: 16px; overflow: hidden; margin-bottom: 28px; font-size: 80px; }
  .modal-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 24px; }
  @media (max-width: 580px) { .modal-detail-grid { grid-template-columns: 1fr; } }
  .modal-detail-box { background: var(--bg3); border: 1px solid var(--border); border-radius: 14px; padding: 18px 20px; }

  /* STAT BOX */
  .stat-box { background: var(--bg3); border: 1px solid var(--border); border-radius: 16px; padding: 28px; text-align: center; }
  .stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 52px; line-height: 1; color: var(--blue); }
  .stat-label { font-size: 12px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-top: 6px; }

  /* INSTALLATION CARD */
  .install-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 14px; padding: 16px 20px; display: flex; align-items: center; gap: 12px; font-size: 14px; color: var(--text); cursor: pointer; transition: border-color 0.25s, background 0.25s, transform 0.25s; font-weight: 500; }
  .install-card:hover { border-color: rgba(61,142,240,0.4); background: var(--bg3); transform: translateY(-2px); }
  .install-card .install-arrow { color: var(--blue); opacity: 0; transition: opacity 0.2s, transform 0.2s; }
  .install-card:hover .install-arrow { opacity: 1; transform: translateX(3px); }

  /* LOISIR CARD */
  .loisir-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 20px; padding: 32px; transition: border-color 0.3s, transform 0.3s; }
  .loisir-card:hover { border-color: rgba(61,142,240,0.25); transform: translateY(-4px); }
  .loisir-icon { font-size: 44px; margin-bottom: 16px; display: block; }

  /* CONTACT */
  .contact-link { display: flex; align-items: center; gap: 20px; padding: 24px 32px; background: var(--bg2); border: 1px solid var(--border); border-radius: 16px; text-decoration: none; color: var(--text); transition: border-color 0.3s, transform 0.3s, background 0.3s; }
  .contact-link:hover { border-color: rgba(61,142,240,0.3); background: var(--bg3); transform: translateX(6px); }
  .contact-icon { width: 48px; height: 48px; border-radius: 12px; background: var(--blue-dim); display: flex; align-items: center; justify-content: center; color: var(--blue); flex-shrink: 0; transition: background 0.3s; }
  .contact-link:hover .contact-icon { background: var(--blue); color: #fff; }

  /* PRO BOX */
  .pro-box { background: linear-gradient(135deg, rgba(61,142,240,0.08) 0%, rgba(61,142,240,0.02) 100%); border: 1px solid rgba(61,142,240,0.25); border-radius: 20px; padding: 36px 40px; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
  .hero-word { display: inline-block; animation: fadeUp 0.8s cubic-bezier(.22,1,.36,1) both; }
  @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

  footer { padding: 40px 8%; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; border-top: 1px solid var(--border); }
  .glow-circle { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
`;

/* ═══════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const run = () => {
      const els = document.querySelectorAll<HTMLElement>(".reveal");
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
        { threshold: 0.08 }
      );
      els.forEach((el) => io.observe(el));
      return io;
    };
    const io = run();
    return () => io.disconnect();
  }, []);
}

function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    h();
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return scrolled;
}

function useCardGlow() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".card");
    const handlers: [HTMLElement, EventListener][] = [];
    cards.forEach((card) => {
      const fn: EventListener = (e) => {
        const me = e as MouseEvent;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", ((me.clientX - r.left) / r.width) * 100 + "%");
        card.style.setProperty("--my", ((me.clientY - r.top) / r.height) * 100 + "%");
      };
      card.addEventListener("mousemove", fn);
      handlers.push([card, fn]);
    });
    return () => handlers.forEach(([el, fn]) => el.removeEventListener("mousemove", fn));
  }, []);
}

/* Skill bars — driven by JS width, not CSS transform, for full reliability */
function useSkillBars() {
  useEffect(() => {
    const bars = document.querySelectorAll<HTMLElement>(".skill-bar-fill");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const target = el.dataset.level ?? "0";
            // small rAF delay so the transition fires visually
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                el.style.width = target + "%";
              });
            });
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );
    bars.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" });
}

/* ═══════════════════════════════════════════════════════════
   NAVBAR  — with mobile hamburger
═══════════════════════════════════════════════════════════ */
const navLinks = [
  { label: "Accueil",     id: "accueil"    },
  { label: "À propos",   id: "apropos"    },
  { label: "Compétences", id: "competences"},
  { label: "Projets",    id: "projets"    },
  { label: "Alternance", id: "alternance" },
  { label: "Loisirs",    id: "loisirs"    },
  { label: "CV",         id: "cv"         },
  { label: "Contact",    id: "contact"    },
];

function Navbar() {
  const scrolled = useNavScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleNav(id: string) {
    setMenuOpen(false);
    setTimeout(() => scrollTo(id), 10);
  }

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar${scrolled || menuOpen ? " scrolled" : ""}`}>
        <button className="nav-logo-btn" onClick={() => handleNav("accueil")}>CVP</button>

        {/* Desktop links */}
        <ul className="nav-links">
          {navLinks.map((l) => (
            <li key={l.id}>
              <button className="nav-btn" onClick={() => handleNav(l.id)}>{l.label}</button>
            </li>
          ))}
        </ul>

        {/* Hamburger button — mobile only */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
          style={{
            display: "none",
            background: "none", border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 8, padding: "8px 10px", cursor: "pointer", color: "var(--text)",
            flexDirection: "column", gap: 5, alignItems: "center", justifyContent: "center",
          }}
          className="hamburger-btn"
        >
          <span style={{ display: "block", width: 20, height: 2, background: menuOpen ? "var(--blue)" : "var(--text)", borderRadius: 2, transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none", transition: "all 0.25s" }} />
          <span style={{ display: "block", width: 20, height: 2, background: menuOpen ? "transparent" : "var(--text)", borderRadius: 2, transition: "all 0.25s" }} />
          <span style={{ display: "block", width: 20, height: 2, background: menuOpen ? "var(--blue)" : "var(--text)", borderRadius: 2, transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none", transition: "all 0.25s" }} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 999,
            background: "rgba(10,12,14,0.97)",
            backdropFilter: "blur(20px)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 8,
            animation: "mdFadeIn 0.2s ease",
          }}
        >
          {navLinks.map((l, i) => (
            <button
              key={l.id}
              onClick={() => handleNav(l.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(36px, 8vw, 52px)",
                letterSpacing: "0.06em",
                color: "rgba(240,242,245,0.85)",
                padding: "8px 24px",
                transition: "color 0.2s",
                animation: `fadeUp 0.4s ${i * 0.05 + 0.05}s both`,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--blue)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,242,245,0.85)")}
            >
              {l.label}
            </button>
          ))}
          <div style={{ marginTop: 24, fontSize: 12, color: "var(--muted)", animation: "fadeUp 0.4s 0.5s both" }}>
            charlyverdiere.pro@gmail.com
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="accueil" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 8%", position: "relative", overflow: "hidden" }}>
      <div className="hero-grid" />
      <div className="scan-line" />
      <div className="glow-circle" style={{ width: 700, height: 700, background: "rgba(61,142,240,0.07)", top: -200, left: "40%" }} />
      <div className="glow-circle" style={{ width: 400, height: 400, background: "rgba(100,160,240,0.05)", bottom: 0, right: "10%" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100 }}>
        <div className="label" style={{ animation: "fadeUp 0.6s both" }}>BUT GEII — Automatisme &amp; Informatique Industrielle</div>
        <h1 className="display" style={{ fontSize: "clamp(72px, 12vw, 160px)", color: "#fff", marginBottom: 24 }}>
          {"Charly".split("").map((c, i) => <span key={i} className="hero-word" style={{ animationDelay: `${0.05 * i + 0.2}s` }}>{c}</span>)}
          <br />
          <span style={{ color: "var(--blue)", opacity: 0.9 }}>
            {"VERDIERE".split("").map((c, i) => <span key={i} className="hero-word" style={{ animationDelay: `${0.04 * i + 0.7}s` }}>{c}</span>)}
          </span>
          <span style={{ color: "var(--muted)" }}>
            {"‑PARENT".split("").map((c, i) => <span key={i} className="hero-word" style={{ animationDelay: `${0.04 * i + 1.0}s` }}>{c}</span>)}
          </span>
        </h1>
        <p style={{ fontSize: "clamp(16px, 1.4vw, 20px)", color: "var(--muted)", maxWidth: 600, lineHeight: 1.7, marginBottom: 48, animation: "fadeUp 0.8s 1.3s both" }}>
          Étudiant passionné par l'automatisme industriel, les systèmes embarqués et les technologies de demain.
          Futur ingénieur — Alternant chez <span style={{ color: "var(--accent)" }}>Renault Douai</span>.
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "fadeUp 0.8s 1.5s both" }}>
          <button className="btn-primary" onClick={() => scrollTo("projets")}>Voir mes projets <ArrowRight size={16} /></button>
          <button className="btn-ghost" onClick={() => scrollTo("contact")}>Me contacter</button>
        </div>
      </div>
      <button onClick={() => scrollTo("apropos")} style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "var(--muted)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", animation: "fadeUp 1s 2s both", background: "none", border: "none", cursor: "pointer" }}>
        <span>Scroll</span>
        <ChevronDown size={16} style={{ animation: "bounce 2s infinite" }} />
      </button>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ABOUT  — narrative redesign, photo placeholder, story cards
═══════════════════════════════════════════════════════════ */
function About() {
  return (
    <section id="apropos" className="section">
      <div className="glow-circle" style={{ width: 500, height: 500, background: "rgba(61,142,240,0.04)", top: 0, right: -100 }} />

      {/* ── Header ── */}
      <div style={{ marginBottom: 64 }}>
        <div className="label reveal">À propos</div>
        <h2 className="display reveal reveal-delay-1" style={{ fontSize: "clamp(48px, 6vw, 80px)", color: "#fff" }}>
          De la robotique<br /><span style={{ color: "var(--blue)" }}>à ma vocation</span>
        </h2>
      </div>

      {/* ── Main layout: photo + story ── */}
      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 60, alignItems: "start", marginBottom: 64 }}>

        {/* Photo placeholder */}
        <div className="reveal" style={{ position: "sticky", top: 90 }}>
          <div style={{
            width: "100%", aspectRatio: "3/4",
            background: "var(--bg2)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 12, color: "var(--muted)",
            position: "relative", overflow: "hidden",
          }}>
            {/* Circuit bg */}
            <svg width="100%" height="100%" viewBox="0 0 200 267" style={{ position: "absolute", inset: 0, opacity: 0.04 }}>
              <circle cx="100" cy="133" r="80" stroke="#3d8ef0" strokeWidth="1" fill="none" strokeDasharray="4 6"/>
              <path d="M20 133h30l15-25h30l15 25h30" stroke="#3d8ef0" strokeWidth="0.8" fill="none"/>
              <path d="M100 50v30l20 10v20l-20 10v30" stroke="#3d8ef0" strokeWidth="0.8" fill="none"/>
            </svg>
            <div style={{ fontSize: 48, position: "relative" }}>👤</div>
            <span style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", padding: "0 20px", position: "relative" }}>
              Photo à venir
            </span>
            {/* Name tag */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 20px", background: "linear-gradient(to top, rgba(14,16,18,0.95), transparent)" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>Charly VERDIERE-PARENT</div>
              <div style={{ fontSize: 11, color: "var(--blue)" }}>BUT GEII · 3ème année · IUT UPHF</div>
            </div>
          </div>

          {/* Stats sous la photo */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
            {[{ num: "5", label: "Projets" }, { num: "840", label: "TOEIC" }].map((s) => (
              <div key={s.label} className="stat-box" style={{ padding: "18px 12px" }}>
                <div className="stat-num" style={{ fontSize: 36 }}>{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Story narrative */}
        <div>
          {/* Étape 1 — La graine */}
          <div className="reveal reveal-delay-1" style={{ marginBottom: 36, paddingLeft: 24, borderLeft: "2px solid rgba(61,142,240,0.3)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 10 }}>Le déclic</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>Un frère, un robot, une passion</h3>
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.85 }}>
              Tout a commencé grâce à mon frère, véritable source d'inspiration. Voir un robot qu'il avait entièrement conçu et programmé résoudre un Rubik's Cube sous mes yeux a été un choc. C'est à ce moment que j'ai compris que je voulais moi aussi <strong style={{ color: "var(--accent)" }}>créer des machines qui pensent et agissent</strong>. La robotique est devenue mon objectif.
            </p>
          </div>

          {/* Étape 2 — La découverte inattendue */}
          <div className="reveal reveal-delay-2" style={{ marginBottom: 36, paddingLeft: 24, borderLeft: "2px solid rgba(61,142,240,0.6)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 10 }}>La révélation</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>L'automatisme : une découverte inattendue</h3>
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.85, marginBottom: 12 }}>
              En entrant en BUT GEII avec la robotique en tête, je n'imaginais pas que l'automatisme industriel allait me révéler ma vocation. Ce premier contact avec les GRAFCET, les automates, les systèmes de production réels… c'était une évidence.
            </p>
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.85 }}>
              L'automatisme n'est pas juste de la robotique appliquée à l'industrie — c'est une discipline à part entière, avec sa rigueur, sa logique, ses enjeux concrets. <strong style={{ color: "var(--accent)" }}>J'avais trouvé ma voie.</strong>
            </p>
          </div>

          {/* Étape 3 — Aujourd'hui */}
          <div className="reveal reveal-delay-3" style={{ marginBottom: 36, paddingLeft: 24, borderLeft: "2px solid var(--blue)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 10 }}>Aujourd'hui</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>Du terrain, de l'autonomie, de la passion</h3>
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.85 }}>
              Mon alternance chez Renault à Douai a transformé la théorie en pratique réelle : presses d'emboutissage, découpes laser, automates Siemens, modifications d'IHM en conditions de production. Chaque intervention renforce ma conviction : <strong style={{ color: "var(--accent)" }}>l'industrie est mon environnement naturel.</strong>
            </p>
          </div>

          {/* Projet pro box */}
          <div className="reveal reveal-delay-4 pro-box">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <Target size={20} color="var(--blue)" />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blue)" }}>Projet professionnel</span>
            </div>
            <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.8, marginBottom: 10 }}>
              Poursuivre en <strong style={{ color: "var(--accent)" }}>école d'ingénieur</strong> spécialisée en Génie Électrique et Informatique Industrielle, avec une spécialisation en automatisme.
            </p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginTop: 16 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>Court terme</div>
                <div style={{ fontSize: 13, color: "var(--accent)" }}>BUT GEII + École d'ingénieur</div>
              </div>
              <div style={{ width: 1, background: "var(--border)" }} />
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>Long terme</div>
                <div style={{ fontSize: 13, color: "var(--accent)" }}>Ingénieur en automatisme industriel</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Formation + intérêts ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="reveal">
        <div style={{ padding: "22px 28px", background: "var(--blue-dim)", borderRadius: 16, border: "1px solid rgba(61,142,240,0.2)", display: "flex", alignItems: "center", gap: 16 }}>
          <GraduationCap size={24} color="var(--blue)" />
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)" }}>BUT GEII — 3ème année</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Génie Électrique &amp; Informatique Industrielle · IUT UPHF</div>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "18px 24px", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 16, alignContent: "center" }}>
          {["Automatisme", "Robotique", "Formule 1", "Musculation", "Jeux vidéo", "Mangas"].map((item) => (
            <span key={item} style={{ padding: "5px 12px", borderRadius: 50, border: "1px solid var(--border)", fontSize: 12, color: "var(--muted)", background: "var(--bg3)" }}>{item}</span>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          #apropos > div:nth-child(2) { grid-template-columns: 1fr !important; }
          #apropos > div:nth-child(2) > div:first-child { position: static !important; }
          #apropos > div:nth-child(3) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SKILLS  — niveau nommé au lieu de % arbitraires
═══════════════════════════════════════════════════════════ */
type SkillLevel = "Notions" | "Pratique" | "Maîtrise" | "Expert";
const LEVEL_MAP: Record<SkillLevel, { pct: number; color: string }> = {
  "Notions":  { pct: 25,  color: "#6080a0" },
  "Pratique": { pct: 55,  color: "#3d8ef0" },
  "Maîtrise": { pct: 80,  color: "#3d8ef0" },
  "Expert":   { pct: 100, color: "#40c0f0" },
};

const technicalSkills: { icon: React.ReactNode; name: string; desc: string; level: SkillLevel }[] = [
  { icon: <Zap size={22} />,      name: "Automatisme",              desc: "GRAFCET, Ladder, API Siemens & TSX Premium, PL7 Pro",     level: "Maîtrise" },
  { icon: <Network size={22} />,  name: "Réseaux industriels",      desc: "Communication automate/IHM, diagnostic réseau industriel", level: "Pratique" },
  { icon: <Code2 size={22} />,    name: "Programmation",            desc: "Python, C, Arduino, Unity Pro, PL7 Pro",                   level: "Pratique" },
  { icon: <Activity size={22} />, name: "Électronique",             desc: "Montages analogiques, numériques, capteurs industriels",   level: "Pratique" },
  { icon: <Settings size={22} />, name: "Supervision / IHM",       desc: "WIN CC, création et modification d'interfaces opérateur",  level: "Maîtrise" },
  { icon: <Wrench size={22} />,   name: "Maintenance industrielle", desc: "Dépannage méthodique, presses, découpes laser, relais",    level: "Maîtrise" },
  { icon: <Cpu size={22} />,      name: "Électricité industrielle", desc: "Câblage, cartes analogiques, relais, plans électriques",   level: "Pratique" },
  { icon: <BookOpen size={22} />, name: "Anglais — TOEIC 840",     desc: "Lecture de documentation technique, communication pro",     level: "Maîtrise" },
];

const softSkills: { name: string; level: SkillLevel; desc: string }[] = [
  { name: "Travail en équipe",        level: "Maîtrise", desc: "Projets académiques et missions entreprise" },
  { name: "Résolution de problèmes",  level: "Maîtrise", desc: "Diagnostics terrain, approche méthodique" },
  { name: "Rigueur & méthode",        level: "Expert",   desc: "Exigence industrielle au quotidien" },
  { name: "Autonomie",                level: "Maîtrise", desc: "Missions en production sans encadrement" },
  { name: "Communication technique",  level: "Pratique", desc: "Rédaction de rapports, échanges fabricants" },
  { name: "Capacité d'adaptation",    level: "Maîtrise", desc: "Environnements variés, nouveaux outils" },
];

function LevelBadge({ level }: { level: SkillLevel }) {
  const { color } = LEVEL_MAP[level];
  return (
    <span style={{
      display: "inline-block", padding: "2px 10px", borderRadius: 20,
      fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
      color, border: `1px solid ${color}50`, background: `${color}12`,
    }}>
      {level}
    </span>
  );
}

function SkillCard({ icon, name, desc, level }: { icon: React.ReactNode; name: string; desc: string; level: SkillLevel }) {
  const { pct, color } = LEVEL_MAP[level];
  return (
    <div className="card reveal">
      <div style={{ color: "var(--blue)", marginBottom: 16 }}>{icon}</div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)" }}>{name}</h3>
        <LevelBadge level={level} />
      </div>
      <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 16 }}>{desc}</p>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" data-level={pct} style={{ background: `linear-gradient(90deg, ${color}, ${color}bb)` }} />
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="competences" className="section">
      <div style={{ textAlign: "center", marginBottom: 80 }}>
        <div className="label reveal" style={{ justifyContent: "center" }}>Compétences</div>
        <h2 className="display reveal reveal-delay-1" style={{ fontSize: "clamp(42px, 5.5vw, 72px)", color: "#fff" }}>
          Techniques &amp; <span style={{ color: "var(--blue)" }}>Transversales</span>
        </h2>
        {/* Légende */}
        <div className="reveal reveal-delay-2" style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", marginTop: 20 }}>
          {(Object.entries(LEVEL_MAP) as [SkillLevel, { pct: number; color: string }][]).map(([lbl, { color }]) => (
            <div key={lbl} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--muted)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "inline-block" }} />
              {lbl}
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 60 }}>
        <p className="reveal" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 28 }}>— Compétences techniques</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 20 }}>
          {technicalSkills.map((s, i) => (
            <div key={s.name} className={`reveal reveal-delay-${(i % 4) + 1}`}><SkillCard {...s} /></div>
          ))}
        </div>
      </div>

      <div className="reveal" style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 24, padding: "48px 48px 44px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 40 }}>— Compétences transversales</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "28px 48px" }}>
          {softSkills.map((s) => (
            <div key={s.name}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 15, color: "var(--text)", fontWeight: 600 }}>{s.name}</span>
                <LevelBadge level={s.level} />
              </div>
              <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>{s.desc}</p>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-level={LEVEL_MAP[s.level].pct} style={{ background: `linear-gradient(90deg, ${LEVEL_MAP[s.level].color}, ${LEVEL_MAP[s.level].color}bb)` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROJECTS + MODAL
═══════════════════════════════════════════════════════════ */
type Project = {
  tag: string; title: string; desc: string; icon: string;
  bg: string; highlights: string[]; color: string;
  context: string; objectifs: string[]; technologies: string[];
  resultats: string; competence: string;
  lecons?: string;
};

const projects: Project[] = [
  {
    tag: "Formation — 1ère année",
    title: "Découverte de l'automatisme",
    desc: "Initiation aux logigrammes, portes logiques, GRAFCET et langage Ladder sur maquettes industrielles.",
    icon: "🔌",
    bg: "linear-gradient(135deg, #0e1a14 0%, #162a1e 100%)",
    highlights: ["GRAFCET", "Ladder", "Logigrammes", "Maquettes"],
    color: "#40c070",
    context: "Premier module d'automatisme du BUT GEII. Point de départ de ma passion pour les systèmes automatisés — passage de la théorie à la pratique sur des maquettes industrielles réelles.",
    objectifs: ["Maîtriser la logique câblée et les logigrammes", "Concevoir des GRAFCET séquentiels", "Programmer en Ladder sur automate d'initiation", "Valider les programmes sur maquettes industrielles"],
    technologies: ["GRAFCET", "Ladder", "Logigrammes", "Portes logiques", "Automate didactique", "Maquettes"],
    resultats: "Socle de toutes mes compétences en automatisme. Ce module a confirmé mon orientation et m'a fourni les bases pour les projets suivants.",
    competence: "C1 — Analyser un système automatisé",
  },
  {
    tag: "Projet académique — 2ème année",
    title: "Dimensionnement électrique d'une maison",
    desc: "Dimensionnement complet de l'installation électrique d'une maison individuelle : éclairage, chauffage, calculs de puissance et schémas.",
    icon: "🏠",
    bg: "linear-gradient(135deg, #1a0e2e 0%, #2e1a4a 100%)",
    highlights: ["Éclairage", "Chauffage", "Schémas élec.", "Dimensionnement"],
    color: "#b060f0",
    context: "Projet académique de 2ème année consistant à dimensionner l'intégralité de l'installation électrique d'une maison individuelle. Ce projet couvre la distribution électrique, le dimensionnement des circuits d'éclairage et de chauffage, en respectant la norme NF C 15-100.",
    objectifs: [
      "Analyser les besoins en puissance de l'installation (éclairage + chauffage)",
      "Dimensionner les câbles, disjoncteurs et protections adaptés",
      "Concevoir les schémas unifilaires et de tableau électrique",
      "Respecter les normes en vigueur (NF C 15-100)",
      "Calculer les sections de câbles selon les charges et longueurs",
    ],
    technologies: ["NF C 15-100", "Schémas unifilaires", "Calcul de puissance", "Dimensionnement câbles", "Tableaux électriques", "Logiciel de schématique"],
    resultats: "Installation électrique complète dimensionnée et documentée. Acquisition d'une méthodologie rigoureuse pour l'analyse des besoins, le calcul des protections et la rédaction de schémas aux normes.",
    competence: "C1 — Concevoir une installation électrique",
  },
  {
    tag: "Projet académique — 3ème année",
    title: "Palettiseur industriel",
    desc: "Programmation automate TSX Premium (Unity Pro), création d'une IHM et communication bidirectionnelle. Normes européennes respectées.",
    icon: "⚙️",
    bg: "linear-gradient(135deg, #0e1a2e 0%, #1a2e4a 100%)",
    highlights: ["IHM", "TSX Premium", "Unity Pro", "Normes EU", "Équipe"],
    color: "#3d8ef0",
    context: "Projet en groupe : automatisation d'un palettiseur industriel empilant des produits sur des palettes, en conformité avec les normes européennes de sécurité.",
    objectifs: ["Programmer l'automate TSX Premium avec Unity Pro", "Créer une IHM logiciel intuitive", "Assurer la communication bidirectionnelle automate ↔ IHM", "Respecter les normes européennes"],
    technologies: ["Automate TSX Premium", "Unity Pro", "Logiciel IHM", "GRAFCET", "Ladder", "Normes EN"],
    resultats: "Installation opérationnelle validée sur maquette. Renforcement des compétences en travail d'équipe et programmation automate.",
    competence: "C2 — Concevoir et programmer un système automatisé",
  },
  {
    tag: "Projet entreprise · Renault — Alternance",
    title: "Économie d'énergie — Éclairage retourneur",
    desc: "Gestion de l'économie d'énergie de l'éclairage d'un retourneur de flans via radar Sick, relais et modification du programme PL7 Pro.",
    icon: "💡",
    bg: "linear-gradient(135deg, #1a150a 0%, #2a2212 100%)",
    highlights: ["PL7 Pro", "Radar Sick", "Relais", "Câblage", "Plans élec."],
    color: "#f0a030",
    context: "Le retourneur est une installation permettant de retourner des paquets de flans (état précédent d'une pièce de véhicule). L'objectif était de mettre en place une gestion d'économie d'énergie sur l'éclairage de cette installation, de la façon la plus simple et efficace possible.",
    objectifs: [
      "Trouver une solution simple et efficace (radar de présence Sick)",
      "Faire valider la solution théoriquement puis auprès du fabricant",
      "Modifier le programme automate en PL7 Pro (ajout de temporisations)",
      "Ajouter un relais pour commander l'éclairage",
      "Câbler, repérer les câbles et modifier les plans électriques",
    ],
    technologies: ["PL7 Pro (Schneider)", "Radar Sick", "Relais industriel", "Câblage armoire", "Plans électriques", "Borniers"],
    resultats: "Système opérationnel en production. Réduction effective de la consommation énergétique de l'éclairage du retourneur. Autonomie totale sur l'ensemble de la mission.",
    competence: "C3 — Mettre en service et maintenir un système industriel",
    lecons: "Ne pas chercher trop compliqué : aller à l'essentiel, valider une chose simple, puis augmenter la complexité étape par étape.",
  },
  {
    tag: "Projet entreprise · Renault — Alternance",
    title: "Sonde de température — Presse",
    desc: "Ajout d'une sonde PT100 sur la poulie moteur d'une presse d'emboutissage, modification IHM WIN CC et programme automate Siemens.",
    icon: "🌡️",
    bg: "linear-gradient(135deg, #1a1800 0%, #2a2600 100%)",
    highlights: ["Presse Renault", "Carte analogique", "WIN CC", "Siemens"],
    color: "#f0c040",
    context: "Face à des surchauffes répétées sur la poulie du moteur principal d'une presse d'emboutissage à l'usine George Besse de Renault, mission d'instrumenter ce point critique avec une sonde de température.",
    objectifs: ["Installer une sonde PT100 sur la poulie moteur", "Intégrer une carte analogique dans l'armoire", "Modifier le programme automate Siemens", "Mettre à jour l'IHM WIN CC (affichage + alarmes)"],
    technologies: ["Sonde PT100", "Carte analogique", "Automate Siemens", "WIN CC (IHM)", "Câblage industriel"],
    resultats: "Sonde opérationnelle en production. Surveillance en temps réel de la température, alertes automatiques avant surchauffe. Mission en totale autonomie.",
    competence: "C4 — Améliorer et optimiser un système en production",
  },
];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="project-tag" style={{ marginBottom: 0 }}>{project.tag}</span>
          <button className="modal-close" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="modal-body">
          <div className="modal-thumb" style={{ background: project.bg }}><span>{project.icon}</span></div>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>{project.title}</h2>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 8, background: `${project.color}15`, border: `1px solid ${project.color}35`, marginBottom: 20 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: project.color }}>{project.competence}</span>
          </div>
          <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, marginBottom: 24 }}>{project.context}</p>
          <div className="modal-detail-grid">
            <div className="modal-detail-box">
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: project.color, marginBottom: 14 }}>Objectifs</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {project.objectifs.map((o, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>
                    <span style={{ color: project.color, flexShrink: 0, fontWeight: 700 }}>→</span>{o}
                  </li>
                ))}
              </ul>
            </div>
            <div className="modal-detail-box">
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: project.color, marginBottom: 14 }}>Technologies</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {project.technologies.map((t) => (
                  <span key={t} style={{ padding: "5px 12px", borderRadius: 6, border: `1px solid ${project.color}40`, fontSize: 12, color: "var(--text)", background: `${project.color}12` }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 16, background: `${project.color}0a`, border: `1px solid ${project.color}28`, borderRadius: 14, padding: "18px 22px" }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: project.color, marginBottom: 10 }}>Résultats &amp; apports</p>
            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>{project.resultats}</p>
          </div>
          {project.lecons && (
            <div style={{ marginTop: 14, background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: 14, padding: "16px 20px", display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 6 }}>Leçon retenue</p>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, fontStyle: "italic" }}>{project.lecons}</p>
              </div>
            </div>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
            {project.highlights.map((h) => (
              <span key={h} style={{ padding: "4px 10px", borderRadius: 6, border: "1px solid var(--border)", fontSize: 11, color: "var(--muted)", background: "var(--bg3)" }}>{h}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);
  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <>
      <section id="projets" className="section">
        <div className="glow-circle" style={{ width: 600, height: 600, background: "rgba(61,142,240,0.04)", bottom: 0, left: -100 }} />
        <div style={{ marginBottom: 72 }}>
          <div className="label reveal">Projets</div>
          <h2 className="display reveal reveal-delay-1" style={{ fontSize: "clamp(42px, 5.5vw, 72px)", color: "#fff", maxWidth: 700 }}>
            Réalisations &amp; <span style={{ color: "var(--blue)" }}>Expériences</span>
          </h2>
          <p className="reveal reveal-delay-2" style={{ color: "var(--muted)", fontSize: 14, marginTop: 12 }}>Cliquez sur un projet pour découvrir tous les détails.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 28 }}>
          {projects.map((p, i) => (
            <div key={p.title} className={`project-card reveal reveal-delay-${(i % 3) + 1}`} onClick={() => setSelected(p)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setSelected(p)}>
              <div className="project-thumb" style={{ background: p.bg }}>
                <span style={{ fontSize: 72, position: "relative", zIndex: 1 }}>{p.icon}</span>
              </div>
              <div className="project-content">
                <span className="project-tag">{p.tag}</span>
                <h3 style={{ fontSize: 21, fontWeight: 700, marginBottom: 10, color: "var(--text)" }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 14 }}>
                  {p.highlights.map((h) => (
                    <span key={h} style={{ padding: "3px 9px", borderRadius: 6, border: "1px solid var(--border)", fontSize: 11, color: "var(--muted)", background: "var(--bg3)" }}>{h}</span>
                  ))}
                </div>
                <div className="click-hint"><ExternalLink size={13} /> Voir les détails</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   INSTALLATION SVG ILLUSTRATIONS
═══════════════════════════════════════════════════════════ */
function PresseSVG() {
  return (
    <svg viewBox="0 0 480 270" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", background: "#0d1520" }}>
      {/* Structure frame */}
      <rect x="60" y="20" width="360" height="230" rx="4" fill="none" stroke="#2a4060" strokeWidth="2"/>
      {/* Colonnes */}
      <rect x="60" y="20" width="30" height="230" fill="#1a2535" stroke="#2a4060" strokeWidth="1.5"/>
      <rect x="390" y="20" width="30" height="230" fill="#1a2535" stroke="#2a4060" strokeWidth="1.5"/>
      {/* Traverse haute */}
      <rect x="60" y="20" width="360" height="40" rx="2" fill="#1e2e44" stroke="#3a5070" strokeWidth="1.5"/>
      {/* Vérin hydraulique */}
      <rect x="210" y="60" width="60" height="80" rx="4" fill="#243040" stroke="#3d6090" strokeWidth="1.5"/>
      <rect x="225" y="55" width="30" height="15" rx="2" fill="#3d8ef0" opacity="0.8"/>
      <rect x="230" y="70" width="20" height="60" fill="#1a2535" stroke="#3a5070" strokeWidth="1"/>
      {/* Piston */}
      <rect x="215" y="140" width="50" height="18" rx="3" fill="#3d6090" stroke="#5080b0" strokeWidth="1.5"/>
      {/* Outil / matrice */}
      <path d="M205 158 L275 158 L265 178 L215 178 Z" fill="#2a4060" stroke="#4070a0" strokeWidth="1.5"/>
      {/* Flan / pièce */}
      <rect x="150" y="195" width="180" height="12" rx="2" fill="#c0a830" opacity="0.9"/>
      {/* Table de presse */}
      <rect x="90" y="207" width="300" height="28" rx="3" fill="#1a2535" stroke="#2a4060" strokeWidth="1.5"/>
      {/* Pieds */}
      <rect x="110" y="235" width="20" height="15" fill="#151e2a" stroke="#2a4060" strokeWidth="1"/>
      <rect x="350" y="235" width="20" height="15" fill="#151e2a" stroke="#2a4060" strokeWidth="1"/>
      {/* Vérins latéraux */}
      <rect x="90" y="80" width="14" height="100" rx="3" fill="#1e3048" stroke="#2a5080" strokeWidth="1"/>
      <rect x="376" y="80" width="14" height="100" rx="3" fill="#1e3048" stroke="#2a5080" strokeWidth="1"/>
      {/* Panneau de contrôle */}
      <rect x="320" y="30" width="70" height="28" rx="3" fill="#0e1825" stroke="#3d8ef0" strokeWidth="1"/>
      <circle cx="335" cy="44" r="5" fill="#40c070" opacity="0.9"/>
      <circle cx="352" cy="44" r="5" fill="#e04040" opacity="0.9"/>
      <rect x="362" y="38" width="20" height="12" rx="2" fill="#3d8ef0" opacity="0.6"/>
      {/* Sonde de température (highlight) */}
      <circle cx="270" cy="175" r="5" fill="#f0c040" opacity="0.9"/>
      <line x1="270" y1="175" x2="310" y2="155" stroke="#f0c040" strokeWidth="1.5" strokeDasharray="3 2"/>
      <text x="314" y="152" fill="#f0c040" fontSize="9" fontFamily="monospace">PT100</text>
      {/* Labels */}
      <text x="165" y="265" fill="#4a6080" fontSize="9" fontFamily="sans-serif">PRESSE D'EMBOUTISSAGE</text>
      <text x="168" y="276" fill="#3d8ef0" fontSize="8" fontFamily="sans-serif">Renault George Besse · Douai</text>
    </svg>
  );
}

function LaserSVG() {
  return (
    <svg viewBox="0 0 480 270" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", background: "#0d1520" }}>
      {/* Bâti machine */}
      <rect x="40" y="30" width="400" height="200" rx="6" fill="none" stroke="#1e3a50" strokeWidth="2"/>
      {/* Portique X */}
      <rect x="40" y="30" width="400" height="20" rx="3" fill="#1a2e44" stroke="#2a4860" strokeWidth="1.5"/>
      <rect x="40" y="220" width="400" height="10" rx="2" fill="#1a2e44" stroke="#2a4860" strokeWidth="1.5"/>
      {/* Guides latéraux */}
      <rect x="40" y="50" width="16" height="170" fill="#152030" stroke="#1e3a50" strokeWidth="1.5"/>
      <rect x="424" y="50" width="16" height="170" fill="#152030" stroke="#1e3a50" strokeWidth="1.5"/>
      {/* Rail Y */}
      <rect x="56" y="105" width="368" height="18" rx="3" fill="#1e3555" stroke="#2e5080" strokeWidth="1.5"/>
      {/* Tête laser sur rail */}
      <rect x="200" y="95" width="80" height="38" rx="4" fill="#243050" stroke="#3d70a0" strokeWidth="2"/>
      <rect x="230" y="133" width="20" height="25" rx="2" fill="#1a2535" stroke="#3d6090" strokeWidth="1.5"/>
      {/* Faisceau laser */}
      <line x1="240" y1="158" x2="240" y2="195" stroke="#00d4ff" strokeWidth="2.5" opacity="0.9"/>
      <ellipse cx="240" cy="197" rx="8" ry="3" fill="#00d4ff" opacity="0.6"/>
      {/* Étincelles */}
      <line x1="236" y1="193" x2="226" y2="205" stroke="#ffcc00" strokeWidth="1" opacity="0.8"/>
      <line x1="244" y1="193" x2="254" y2="202" stroke="#ffcc00" strokeWidth="1" opacity="0.8"/>
      <line x1="240" y1="194" x2="233" y2="208" stroke="#ff8800" strokeWidth="1" opacity="0.7"/>
      <line x1="240" y1="194" x2="248" y2="206" stroke="#ff8800" strokeWidth="1" opacity="0.7"/>
      {/* Pièce à couper */}
      <rect x="100" y="195" width="280" height="14" rx="2" fill="#2a3a50" stroke="#3a5070" strokeWidth="1"/>
      <line x1="100" y1="197" x2="380" y2="197" stroke="#4a6080" strokeWidth="0.5"/>
      {/* Fibre optique */}
      <path d="M240 95 C240 70 320 70 360 50" fill="none" stroke="#3d8ef0" strokeWidth="2" strokeDasharray="4 3" opacity="0.7"/>
      {/* Générateur laser */}
      <rect x="340" y="30" width="80" height="40" rx="3" fill="#0e1825" stroke="#3d8ef0" strokeWidth="1.5"/>
      <text x="354" y="48" fill="#3d8ef0" fontSize="9" fontFamily="monospace" fontWeight="bold">LASER</text>
      <text x="352" y="60" fill="#5090c0" fontSize="8" fontFamily="monospace">GENERATOR</text>
      {/* Capteurs */}
      <circle cx="80" cy="100" r="6" fill="#40c070" opacity="0.8"/>
      <circle cx="400" cy="100" r="6" fill="#40c070" opacity="0.8"/>
      {/* Labels */}
      <text x="155" y="262" fill="#4a6080" fontSize="9" fontFamily="sans-serif">DÉCOUPE LASER CNC</text>
      <text x="165" y="273" fill="#3d8ef0" fontSize="8" fontFamily="sans-serif">Renault George Besse · Douai</text>
      {/* Glow effet laser */}
      <ellipse cx="240" cy="175" rx="4" ry="20" fill="#00d4ff" opacity="0.08"/>
    </svg>
  );
}

function InjectionSVG() {
  return (
    <svg viewBox="0 0 480 270" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", background: "#0d1520" }}>
      {/* Bâti principal */}
      <rect x="30" y="60" width="420" height="160" rx="5" fill="none" stroke="#1e3a30" strokeWidth="2"/>
      {/* Unité d'injection (droite) */}
      <rect x="300" y="80" width="130" height="60" rx="4" fill="#1a2e24" stroke="#2a4840" strokeWidth="1.5"/>
      {/* Vis d'injection */}
      <rect x="310" y="100" width="110" height="18" rx="8" fill="#0e1a14" stroke="#2a5040" strokeWidth="1.5"/>
      <line x1="325" y1="100" x2="325" y2="118" stroke="#2a5040" strokeWidth="1"/>
      <line x1="340" y1="100" x2="340" y2="118" stroke="#2a5040" strokeWidth="1"/>
      <line x1="355" y1="100" x2="355" y2="118" stroke="#2a5040" strokeWidth="1"/>
      <line x1="370" y1="100" x2="370" y2="118" stroke="#2a5040" strokeWidth="1"/>
      <line x1="385" y1="100" x2="385" y2="118" stroke="#2a5040" strokeWidth="1"/>
      {/* Trémie */}
      <path d="M390 60 L420 60 L410 80 L400 80 Z" fill="#1e3028" stroke="#2a5040" strokeWidth="1.5"/>
      <rect x="400" y="52" width="15" height="10" rx="2" fill="#152520" stroke="#2a5040" strokeWidth="1"/>
      {/* Buse d'injection */}
      <path d="M310 105 L295 109 L295 111 L310 114 Z" fill="#3d8060" stroke="#40c080" strokeWidth="1"/>
      {/* Unité de fermeture (gauche) */}
      <rect x="60" y="75" width="220" height="130" rx="4" fill="#152030" stroke="#1e3a40" strokeWidth="1.5"/>
      {/* Plateau fixe */}
      <rect x="70" y="85" width="40" height="110" rx="2" fill="#1a2e3a" stroke="#2a4860" strokeWidth="1.5"/>
      {/* Plateau mobile */}
      <rect x="155" y="90" width="40" height="100" rx="2" fill="#1e3445" stroke="#2e5070" strokeWidth="1.5"/>
      {/* Colonnes de guidage */}
      <line x1="115" y1="95" x2="155" y2="95" stroke="#3a6080" strokeWidth="3"/>
      <line x1="115" y1="185" x2="155" y2="185" stroke="#3a6080" strokeWidth="3"/>
      {/* Moule */}
      <rect x="110" y="110" width="45" height="70" rx="2" fill="#243040" stroke="#3d6080" strokeWidth="2"/>
      {/* Cavité moule */}
      <path d="M122 125 L143 125 L143 165 L122 165 Z" fill="#0e1825" stroke="#2a5080" strokeWidth="1"/>
      {/* Pièce injectée (en cours) */}
      <path d="M124 127 L141 127 L141 163 L124 163 Z" fill="#e06020" opacity="0.7" rx="1"/>
      {/* Vérin fermeture */}
      <rect x="200" y="115" width="60" height="50" rx="3" fill="#1a2535" stroke="#2a4060" strokeWidth="1.5"/>
      <rect x="195" y="130" width="10" height="20" rx="2" fill="#3d6090" stroke="#4a70a0" strokeWidth="1"/>
      {/* Panneau de commande */}
      <rect x="32" y="62" width="85" height="35" rx="3" fill="#0e1825" stroke="#3d8ef0" strokeWidth="1"/>
      <circle cx="50" cy="72" r="4" fill="#40c070" opacity="0.9"/>
      <circle cx="65" cy="72" r="4" fill="#f0c040" opacity="0.9"/>
      <circle cx="80" cy="72" r="4" fill="#e04040" opacity="0.7"/>
      <rect x="90" y="66" width="22" height="10" rx="2" fill="#1a2535" stroke="#3d8ef0" strokeWidth="1"/>
      <text x="91" y="74" fill="#3d8ef0" fontSize="7" fontFamily="monospace">IHM</text>
      {/* Tuyaux hydrauliques */}
      <path d="M195 140 C180 140 180 220 140 220" fill="none" stroke="#2a5040" strokeWidth="3" opacity="0.6"/>
      <path d="M195 155 C175 155 175 225 120 225" fill="none" stroke="#2a5040" strokeWidth="3" opacity="0.6"/>
      {/* Labels */}
      <text x="135" y="258" fill="#4a6080" fontSize="9" fontFamily="sans-serif">PRESSE À INJECTION PLASTIQUE</text>
      <text x="148" y="269" fill="#40c080" fontSize="8" fontFamily="sans-serif">Renault George Besse · Douai</text>
    </svg>
  );
}

function RetourneurSVG() {
  return (
    <svg viewBox="0 0 480 270" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", background: "#0d1520" }}>
      {/* Bâti retourneur */}
      <rect x="50" y="40" width="380" height="190" rx="5" fill="none" stroke="#2a3a50" strokeWidth="2"/>
      {/* Convoyeur bas */}
      <rect x="60" y="195" width="360" height="20" rx="3" fill="#1a2535" stroke="#2a4060" strokeWidth="1.5"/>
      {[80,120,160,200,240,280,320,360,400].map((x, i) => (
        <ellipse key={i} cx={x} cy={205} rx={8} ry={5} fill="#243050" stroke="#3a5070" strokeWidth="1"/>
      ))}
      {/* Convoyeur haut */}
      <rect x="60" y="55" width="360" height="20" rx="3" fill="#1a2535" stroke="#2a4060" strokeWidth="1.5"/>
      {[80,120,160,200,240,280,320,360,400].map((x, i) => (
        <ellipse key={i} cx={x} cy={65} rx={8} ry={5} fill="#243050" stroke="#3a5070" strokeWidth="1"/>
      ))}
      {/* Flans sur convoyeur bas (paquets) */}
      <rect x="90" y="180" width="60" height="14" rx="2" fill="#5a6070" stroke="#7a8090" strokeWidth="1"/>
      <rect x="90" y="171" width="60" height="10" rx="1" fill="#6a7080" stroke="#8a9090" strokeWidth="1"/>
      <rect x="90" y="163" width="60" height="9" rx="1" fill="#7a8090" stroke="#9aa0a0" strokeWidth="1"/>
      {/* Flans retournés sur convoyeur haut */}
      <rect x="320" y="69" width="60" height="14" rx="2" fill="#7a8090" stroke="#9aa0a0" strokeWidth="1"/>
      <rect x="320" y="60" width="60" height="10" rx="1" fill="#6a7080" stroke="#8a9090" strokeWidth="1"/>
      {/* Mécanisme de retournement (centre) */}
      <ellipse cx="240" cy="130" rx="55" ry="55" fill="none" stroke="#2a4060" strokeWidth="1.5" strokeDasharray="5 3"/>
      <ellipse cx="240" cy="130" rx="38" ry="38" fill="#1a2535" stroke="#3a5070" strokeWidth="2"/>
      {/* Bras de préhension */}
      <rect x="195" y="126" width="90" height="8" rx="4" fill="#243555" stroke="#3d6090" strokeWidth="2"/>
      <circle cx="240" cy="130" r="8" fill="#3d8ef0" opacity="0.9"/>
      <circle cx="240" cy="130" r="4" fill="#1a2535"/>
      {/* Pince gauche */}
      <rect x="185" y="122" width="14" height="16" rx="3" fill="#2a4060" stroke="#3d6090" strokeWidth="1.5"/>
      {/* Pince droite */}
      <rect x="281" y="122" width="14" height="16" rx="3" fill="#2a4060" stroke="#3d6090" strokeWidth="1.5"/>
      {/* Flèche de rotation */}
      <path d="M215 95 A35 35 0 0 1 265 95" fill="none" stroke="#3d8ef0" strokeWidth="2" markerEnd="url(#arrow)"/>
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#3d8ef0"/>
        </marker>
      </defs>
      {/* Éclairage LED (highlight projet) */}
      <rect x="65" y="100" width="20" height="60" rx="3" fill="#1e2030" stroke="#f0a030" strokeWidth="1.5"/>
      <rect x="395" y="100" width="20" height="60" rx="3" fill="#1e2030" stroke="#f0a030" strokeWidth="1.5"/>
      {/* Rayons lumineux */}
      {[-20,-10,0,10,20].map((dy, i) => (
        <line key={i} x1="85" y1={130 + dy} x2="105" y2={130 + dy * 0.5} stroke="#f0a030" strokeWidth="0.8" opacity="0.5"/>
      ))}
      {[-20,-10,0,10,20].map((dy, i) => (
        <line key={i} x1="395" y1={130 + dy} x2="375" y2={130 + dy * 0.5} stroke="#f0a030" strokeWidth="0.8" opacity="0.5"/>
      ))}
      {/* Radar Sick */}
      <rect x="210" y="40" width="60" height="14" rx="3" fill="#0e1825" stroke="#f0a030" strokeWidth="1.5"/>
      <text x="218" y="51" fill="#f0a030" fontSize="8" fontFamily="monospace">RADAR SICK</text>
      <path d="M220 54 L200 65 M240 54 L240 68 M260 54 L280 65" stroke="#f0a030" strokeWidth="1" opacity="0.6" strokeDasharray="2 2"/>
      {/* Relais / armoire */}
      <rect x="410" y="42" width="36" height="50" rx="3" fill="#0e1825" stroke="#3d8ef0" strokeWidth="1.5"/>
      <text x="415" y="57" fill="#3d8ef0" fontSize="7" fontFamily="monospace">RELAIS</text>
      <circle cx="418" cy="68" r="4" fill="#40c070" opacity="0.9"/>
      <circle cx="430" cy="68" r="4" fill="#f0a030" opacity="0.9"/>
      <rect x="414" y="76" width="24" height="10" rx="2" fill="#1a2535" stroke="#3d8ef0" strokeWidth="1"/>
      {/* Labels */}
      <text x="155" y="258" fill="#4a6080" fontSize="9" fontFamily="sans-serif">RETOURNEUR DE FLANS</text>
      <text x="148" y="269" fill="#f0a030" fontSize="8" fontFamily="sans-serif">Gestion éclairage · Radar Sick · PL7 Pro</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   ALTERNANCE  — installations cliquables avec modales SVG
═══════════════════════════════════════════════════════════ */
const timelineItems = [
  { period: "Début d'alternance",  title: "Prise en main des installations",   desc: "Découverte de l'environnement Renault George Besse à Douai. Apprentissage des procédures de sécurité, des outils et des équipements en place." },
  { period: "Phase intermédiaire", title: "Interventions sur presses & lasers", desc: "Interventions techniques sur presses d'emboutissage, découpes laser et presses à injection plastique. Développement des premiers réflexes de dépannage." },
  { period: "Projet éclairage",    title: "Économie d'énergie — Retourneur",   desc: "Mise en place d'une gestion d'économie d'énergie sur l'éclairage du retourneur de flans via un radar Sick et modification du programme PL7 Pro." },
  { period: "Projet sonde",        title: "Mission technique autonome",          desc: "Ajout d'une sonde PT100 sur la poulie moteur d'une presse. Modification du programme automate Siemens et de l'IHM WIN CC. En totale autonomie." },
  { period: "Aujourd'hui",         title: "Autonomie progressive",               desc: "Développement de méthodologies de dépannage propres. Intervention croissamment autonome sur des systèmes industriels complexes." },
];

type InstallModal = { title: string; subtitle: string; desc: string; svg: React.ReactNode } | null;

const installations = [
  {
    icon: "🔩", label: "Presses d'emboutissage",
    modal: {
      title: "Presse d'emboutissage",
      subtitle: "Renault George Besse · Douai",
      desc: "Presses hydrauliques de grande capacité utilisées pour déformer des flans métalliques et leur donner la forme des pièces de carrosserie automobile. Interventions de maintenance sur les systèmes hydrauliques, électriques et sur les automates de commande (Siemens). Projet sonde de température PT100 réalisé sur ce type de machine.",
      svg: <PresseSVG />,
    },
  },
  {
    icon: "⚡", label: "Découpes laser",
    modal: {
      title: "Découpe laser CNC",
      subtitle: "Renault George Besse · Douai",
      desc: "Centres de découpe laser pilotés par CNC permettant de découper avec précision des pièces métalliques selon des programmes numériques. Maintenance des têtes laser, des systèmes de guidage et des capteurs de positionnement. Interventions sur les programmes automates et les interfaces de supervision.",
      svg: <LaserSVG />,
    },
  },
  {
    icon: "🏭", label: "Presses à injection",
    modal: {
      title: "Presse à injection plastique",
      subtitle: "Renault George Besse · Douai",
      desc: "Machines d'injection plastique permettant de fabriquer des pièces de garniture intérieure automobile par injection de matière thermoplastique dans des moules. Maintenance des systèmes hydrauliques de fermeture, des unités d'injection, des systèmes de régulation thermique et des automates de commande.",
      svg: <InjectionSVG />,
    },
  },
  {
    icon: "💡", label: "Retourneur de flans",
    modal: {
      title: "Retourneur de flans",
      subtitle: "Projet éclairage · Radar Sick · PL7 Pro",
      desc: "Installation permettant de retourner des paquets de flans (état précédent d'une pièce de carrosserie) entre deux convoyeurs. Projet personnel : conception et réalisation d'un système de gestion d'économie d'énergie sur l'éclairage via un radar de présence Sick, modification du programme PL7 Pro et câblage d'un relais.",
      svg: <RetourneurSVG />,
    },
  },
  {
    icon: "🖥️", label: "IHM & automates",
    modal: null,
  },
];

function Alternance() {
  const [installModal, setInstallModal] = useState<InstallModal>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setInstallModal(null); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = installModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [installModal]);

  return (
    <>
      <section id="alternance" className="section">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          {/* Left */}
          <div>
            <div className="label reveal">Alternance</div>
            <h2 className="display reveal reveal-delay-1" style={{ fontSize: "clamp(40px, 5vw, 68px)", color: "#fff", marginBottom: 24 }}>
              Renault <span style={{ color: "var(--blue)" }}>Douai</span>
            </h2>
            <p className="reveal reveal-delay-2" style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, marginBottom: 16 }}>
              Technicien de maintenance au sein de l'usine <strong style={{ color: "var(--accent)" }}>George Besse</strong> de Renault à Douai. Intervention sur des équipements industriels critiques au cœur d'une chaîne de production automobile.
            </p>
            <p className="reveal reveal-delay-3" style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, marginBottom: 28 }}>
              Cette expérience m'a permis de développer une véritable méthodologie de dépannage et une autonomie progressive dans des environnements de production exigeants.
            </p>

            {/* Installations cliquables */}
            <div className="reveal reveal-delay-4">
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 14 }}>
                — Installations (cliquez pour voir)
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {installations.map((m) => (
                  <button
                    key={m.label}
                    className="install-card"
                    onClick={() => m.modal && setInstallModal(m.modal)}
                    style={{ cursor: m.modal ? "pointer" : "default", opacity: m.modal ? 1 : 0.5 }}
                  >
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{m.icon}</span>
                    <span style={{ flex: 1, textAlign: "left" }}>{m.label}</span>
                    {m.modal && (
                      <>
                        <span style={{ fontSize: 11, color: "var(--blue)", opacity: 0.7 }}>Voir le schéma</span>
                        <ArrowRight size={15} className="install-arrow" />
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: timeline */}
          <div className="reveal reveal-delay-2">
            <div className="timeline-wrapper">
              <div className="timeline-line" />
              {timelineItems.map((item, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot" />
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blue)", display: "block", marginBottom: 6 }}>{item.period}</span>
                  <h4 style={{ fontSize: 17, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>{item.title}</h4>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`@media (max-width: 860px) { #alternance > div { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
      </section>

      {/* Installation modal */}
      {installModal && (
        <div className="modal-backdrop" onClick={() => setInstallModal(null)}>
          <div className="modal-panel" style={{ maxWidth: 700 }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)" }}>{installModal.title}</h3>
                <p style={{ fontSize: 12, color: "var(--blue)", marginTop: 2 }}>{installModal.subtitle}</p>
              </div>
              <button className="modal-close" onClick={() => setInstallModal(null)}><X size={16} /></button>
            </div>
            <div className="modal-body">
              {/* SVG illustration */}
              <div style={{ width: "100%", borderRadius: 16, overflow: "hidden", marginBottom: 24, border: "1px solid var(--border)", aspectRatio: "16/9" }}>
                {installModal.svg}
              </div>
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.8 }}>{installModal.desc}</p>
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 16, fontStyle: "italic", opacity: 0.7 }}>
                🎨 Illustration schématique — des plans techniques plus détaillés seront ajoutés prochainement.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   LOISIRS
═══════════════════════════════════════════════════════════ */
const loisirs = [
  { icon: "🏎️", title: "Formule 1", desc: "Passionné par la F1 depuis plusieurs années, je suis de près les évolutions technologiques des monoplaces — aérodynamique, systèmes hybrides, électronique embarquée. Un univers qui rejoint directement mes intérêts en ingénierie.", tags: ["Aérodynamique", "Technologie", "Stratégie"], color: "#e83030" },
  { icon: "🏋️", title: "Musculation", desc: "La musculation m'apporte rigueur, constance et dépassement de soi. Comme en engineering, progresser demande une méthodologie précise, de la régularité et une bonne analyse de ses propres résultats.", tags: ["Rigueur", "Persévérance", "Méthode"], color: "#3d8ef0" },
  { icon: "🎮", title: "Jeux vidéo", desc: "Les jeux vidéo développent la logique, la réactivité et la résolution de problèmes. J'apprécie particulièrement les univers qui combinent stratégie et maîtrise technique.", tags: ["Logique", "Stratégie", "Réactivité"], color: "#9040c0" },
  { icon: "📚", title: "Mangas & culture japonaise", desc: "Fan de mangas et de la culture japonaise en général, j'apprécie l'univers créatif et la philosophie du travail bien fait — une vision proche de l'exigence industrielle japonaise mondialement reconnue.", tags: ["Culture", "Créativité", "Ouverture d'esprit"], color: "#e06020" },
];

function Loisirs() {
  return (
    <section id="loisirs" className="section">
      <div className="glow-circle" style={{ width: 500, height: 500, background: "rgba(61,142,240,0.04)", top: -100, left: -100 }} />
      <div style={{ marginBottom: 72 }}>
        <div className="label reveal">Loisirs &amp; Vie personnelle</div>
        <h2 className="display reveal reveal-delay-1" style={{ fontSize: "clamp(42px, 5.5vw, 72px)", color: "#fff", maxWidth: 700 }}>
          Ce qui me <span style={{ color: "var(--blue)" }}>passionne</span>
        </h2>
        <p className="reveal reveal-delay-2" style={{ color: "var(--muted)", fontSize: 16, marginTop: 16, maxWidth: 620, lineHeight: 1.7 }}>
          Mes centres d'intérêt reflètent les mêmes valeurs que mon parcours professionnel : rigueur, curiosité technique, dépassement de soi et passion pour l'innovation.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
        {loisirs.map((l, i) => (
          <div key={l.title} className={`loisir-card reveal reveal-delay-${(i % 4) + 1}`} style={{ borderTop: `2px solid ${l.color}60` }}>
            <span className="loisir-icon">{l.icon}</span>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>{l.title}</h3>
            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75, marginBottom: 20 }}>{l.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {l.tags.map((t) => <span key={t} style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${l.color}40`, fontSize: 11, color: l.color, background: `${l.color}10` }}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
      <div className="reveal" style={{ marginTop: 60, display: "flex", gap: 16, flexWrap: "wrap" }}>
        {[
          { icon: <Heart size={16} />, label: "Passionné",  desc: "Par la technique et l'innovation" },
          { icon: <Zap size={16} />,   label: "Curieux",    desc: "Toujours en veille technologique" },
          { icon: <Target size={16} />,label: "Ambitieux",  desc: "Futur ingénieur en automatisme" },
          { icon: <Wrench size={16} />,label: "Rigoureux",  desc: "Dans chaque projet" },
        ].map((v) => (
          <div key={v.label} style={{ flex: "1 1 200px", display: "flex", alignItems: "center", gap: 14, padding: "18px 22px", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 14 }}>
            <div style={{ color: "var(--blue)" }}>{v.icon}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{v.label}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{v.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CV
═══════════════════════════════════════════════════════════ */
function CV() {
  return (
    <section id="cv" className="section">
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <div className="label reveal" style={{ justifyContent: "center" }}>CV</div>
        <h2 className="display reveal reveal-delay-1" style={{ fontSize: "clamp(42px, 5.5vw, 72px)", color: "#fff" }}>
          Curriculum <span style={{ color: "var(--blue)" }}>Vitae</span>
        </h2>
      </div>
      <div className="reveal reveal-delay-2" style={{ maxWidth: 800, margin: "0 auto", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 28, padding: "56px 64px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(61,142,240,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(61,142,240,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ width: 180, height: 240, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, margin: "0 auto 40px", display: "flex", flexDirection: "column", padding: 16, gap: 8, boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(61,142,240,0.1)" }}>
            <div style={{ height: 4, background: "var(--blue)", borderRadius: 2, width: "60%" }} />
            <div style={{ height: 3, background: "var(--border)", borderRadius: 2, width: "80%" }} />
            <div style={{ height: 3, background: "var(--border)", borderRadius: 2, width: "70%" }} />
            <div style={{ marginTop: 8, height: 2, background: "rgba(61,142,240,0.3)", borderRadius: 2, width: "100%" }} />
            {[80, 65, 90, 55, 75].map((w, i) => <div key={i} style={{ height: 2, background: "var(--border)", borderRadius: 2, width: `${w}%` }} />)}
            <div style={{ marginTop: 6, height: 2, background: "rgba(61,142,240,0.3)", borderRadius: 2, width: "100%" }} />
            {[70, 85, 60].map((w, i) => <div key={i} style={{ height: 2, background: "var(--border)", borderRadius: 2, width: `${w}%` }} />)}
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 600, color: "var(--text)", marginBottom: 10 }}>Charly VERDIERE-PARENT</h3>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 36, lineHeight: 1.6 }}>Étudiant BUT GEII — Alternant technicien de maintenance<br />Renault George Besse, Douai</p>
          <a href="/cv.pdf" download className="btn-primary" style={{ margin: "0 auto" }}>
            <Download size={16} /> Télécharger le CV (PDF)
          </a>
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 16 }}>Placez votre CV dans <code style={{ color: "var(--blue)" }}>/public/cv.pdf</code></p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   CONTACT  — email uses copy-to-clipboard (no mailto needed)
═══════════════════════════════════════════════════════════ */
function Contact() {
  const [copied, setCopied] = useState(false);

  const EMAIL = "charlyverdiere.pro@gmail.com";

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <section id="contact" className="section">
      <div className="glow-circle" style={{ width: 600, height: 600, background: "rgba(61,142,240,0.05)", top: -100, right: -100 }} />
      <div style={{ maxWidth: 700 }}>
        <div className="label reveal">Contact</div>
        <h2 className="display reveal reveal-delay-1" style={{ fontSize: "clamp(42px, 5.5vw, 72px)", color: "#fff", marginBottom: 20 }}>
          Entrons en <span style={{ color: "var(--blue)" }}>Contact</span>
        </h2>
        <p className="reveal reveal-delay-2" style={{ fontSize: 16, color: "var(--muted)", marginBottom: 48, lineHeight: 1.7 }}>
          Mon alternance est pourvue — je rejoins <strong style={{ color: "var(--accent)" }}>Othua</strong> prochainement.
          N'hésitez pas à me contacter pour toute question ou discussion autour de l'automatisme industriel.
        </p>

        <div className="reveal reveal-delay-3" style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/charly-verdiere-parent-942865277/" className="contact-link" target="_blank" rel="noopener noreferrer">
            <div className="contact-icon"><Linkedin size={22} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 2 }}>Profil professionnel</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>Charly VERDIERE-PARENT</div>
            </div>
            <ArrowRight size={18} color="var(--muted)" />
          </a>

          {/* GitHub */}
          <a href="https://github.com" className="contact-link" target="_blank" rel="noopener noreferrer">
            <div className="contact-icon"><Github size={22} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 2 }}>Projets &amp; code</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>github.com/charlyvp</div>
            </div>
            <ArrowRight size={18} color="var(--muted)" />
          </a>

          {/* Email — copy to clipboard, no mailto */}
          <button
            onClick={copyEmail}
            className="contact-link"
            style={{ background: copied ? "rgba(61,142,240,0.08)" : undefined, borderColor: copied ? "rgba(61,142,240,0.4)" : undefined, width: "100%", textAlign: "left" }}
          >
            <div className="contact-icon" style={{ background: copied ? "var(--blue)" : undefined, color: copied ? "#fff" : undefined }}>
              <Mail size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 2 }}>Email professionnel</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>{EMAIL}</div>
            </div>
            <span style={{
              fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 20,
              background: copied ? "rgba(64,192,112,0.15)" : "rgba(61,142,240,0.12)",
              color: copied ? "#40c070" : "var(--blue)",
              border: `1px solid ${copied ? "rgba(64,192,112,0.3)" : "rgba(61,142,240,0.25)"}`,
              transition: "all 0.3s", whiteSpace: "nowrap", flexShrink: 0,
            }}>
              {copied ? "✓ Copié !" : "Copier l'adresse"}
            </span>
          </button>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer>
      <span style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.06em", fontSize: 18, color: "var(--muted)" }}>CVP</span>
      <span style={{ fontSize: 12, color: "var(--muted)" }}>© {new Date().getFullYear()} Charly VERDIERE-PARENT — BUT GEII · IUT UPHF</span>
      <span style={{ fontSize: 12, color: "var(--muted)" }}>Fait avec passion &amp; rigueur</span>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════ */
export default function Home() {
  useReveal();
  useCardGlow();
  useSkillBars();
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Alternance />
        <Loisirs />
        <CV />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
