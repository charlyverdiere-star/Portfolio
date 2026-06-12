"use client";
import { useEffect, useRef, useState } from "react";
import {
  Cpu, Wrench, Network, Code2, Zap, ChevronDown,
  Mail, Linkedin, Github, Download, ArrowRight,
  Activity, Settings, BookOpen, X, ExternalLink,
  Target, GraduationCap, Heart, Volume2,
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
    --blue:      #2d7dd2;
    --blue-dim:  rgba(45,125,210,0.12);
    --blue-glow: rgba(45,125,210,0.05);
    --text:      #f0f2f5;
    --muted:     #9aa4b4;
    --accent:    #b8cce8;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { background: var(--bg); min-height: 100%; }
  html { scroll-behavior: smooth; }
  body { color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 16px; line-height: 1.6; overflow-x: hidden; min-height: 100vh; min-height: 100lvh; }

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
  .card:hover { border-color: rgba(45,125,210,0.3); transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
  .card:hover::before { opacity: 1; }

  /* BUTTONS */
  .btn-primary { display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px; background: var(--blue); color: #fff; border: none; border-radius: 50px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; text-decoration: none; transition: background 0.2s, transform 0.2s, box-shadow 0.2s; }
  .btn-primary:hover { background: #4a93dd; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(45,125,210,0.35); }
  .btn-ghost { display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px; background: transparent; color: var(--text); border: 1px solid rgba(255,255,255,0.15); border-radius: 50px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; text-decoration: none; transition: border-color 0.2s, color 0.2s, transform 0.2s; }
  .btn-ghost:hover { border-color: rgba(45,125,210,0.5); color: var(--blue); transform: translateY(-2px); }

  /* HERO */
  .hero-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(45,125,210,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,125,210,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    /* desktop : ellipse resserrée en haut */
    -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
    mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
    pointer-events: none;
  }
  @media (max-width: 600px) {
    /* mobile : ellipse beaucoup plus large pour couvrir l'ensemble du hero */
    .hero-grid { -webkit-mask-image: radial-gradient(ellipse 140% 90% at 50% 30%, black 60%, transparent 100%); mask-image: radial-gradient(ellipse 140% 90% at 50% 30%, black 60%, transparent 100%); }
  }
  @keyframes scan { from { transform: translateY(0); } to { transform: translateY(100vh); } }
  .scan-line { position: absolute; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(45,125,210,0.3), transparent); animation: scan 6s linear infinite; pointer-events: none; }

  /* ── NAVBAR ──
     iOS Safari (viewport-fit=cover) : la navbar absorbe la zone status bar via env(safe-area-inset-top).
     Background totalement opaque dès qu'on scrolle (fini le contenu visible derrière sur Safari/Opera GX). */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 5%;
    padding-top: env(safe-area-inset-top, 0px);
    height: calc(68px + env(safe-area-inset-top, 0px));
    transition: background 0.4s, border-color 0.4s;
    border-bottom: 1px solid transparent;
  }
  .navbar.scrolled {
    background: #0e1012;
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
    background: linear-gradient(90deg, #2d7dd2, #6aa6e0);
    border-radius: 4px;
    width: 0%;
    transition: width 1.3s cubic-bezier(.22,1,.36,1);
  }

  /* TIMELINE */
  .timeline-wrapper { position: relative; padding-left: 40px; }
  .timeline-line { position: absolute; left: 6px; top: 6px; bottom: 6px; width: 1px; background: linear-gradient(to bottom, var(--blue), transparent); }
  .timeline-item { position: relative; margin-bottom: 44px; }
  .timeline-item:last-child { margin-bottom: 0; }
  .timeline-dot { position: absolute; left: -37px; top: 3px; width: 12px; height: 12px; border-radius: 50%; background: var(--blue); border: 3px solid var(--bg); box-shadow: 0 0 10px rgba(45,125,210,0.5); }

  /* PROJECT CARD */
  .project-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 24px; overflow: hidden; transition: border-color 0.3s, transform 0.4s cubic-bezier(.22,1,.36,1), box-shadow 0.4s; cursor: pointer; }
  .project-card:hover { border-color: rgba(45,125,210,0.35); transform: translateY(-6px); box-shadow: 0 24px 80px rgba(0,0,0,0.5); }
  .project-thumb { width: 100%; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; font-size: 64px; position: relative; overflow: hidden; }
  .project-thumb::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, var(--bg2) 100%); }
  .project-content { padding: 28px 32px 32px; }
  .project-tag { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue); background: var(--blue-dim); padding: 4px 10px; border-radius: 4px; margin-bottom: 14px; }
  .click-hint { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: var(--blue); margin-top: 16px; opacity: 0.7; transition: opacity 0.2s; }
  .project-card:hover .click-hint { opacity: 1; }

  /* MODAL */
  .modal-backdrop { position: fixed; inset: 0; z-index: 5000; background: rgba(0,0,0,0.82); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 24px; animation: mdFadeIn 0.2s ease; }
  @keyframes mdFadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal-panel { background: var(--bg2); border: 1px solid rgba(45,125,210,0.2); border-radius: 28px; width: 100%; max-width: 780px; max-height: 90vh; overflow-y: auto; scrollbar-width: thin; animation: mdSlideUp 0.3s cubic-bezier(.22,1,.36,1); }
  @keyframes mdSlideUp { from { opacity: 0; transform: translateY(32px) scale(0.97); } to { opacity: 1; transform: none; } }
  .modal-header { display: flex; align-items: center; justify-content: space-between; padding: 28px 36px 0; }
  .modal-close { width: 36px; height: 36px; border-radius: 50%; background: var(--bg3); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--muted); transition: background 0.2s, color 0.2s; }
  .modal-close:hover { background: rgba(45,125,210,0.15); color: var(--blue); }
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
  .install-card:hover { border-color: rgba(45,125,210,0.4); background: var(--bg3); transform: translateY(-2px); }
  .install-card .install-arrow { color: var(--blue); opacity: 0; transition: opacity 0.2s, transform 0.2s; }
  .install-card:hover .install-arrow { opacity: 1; transform: translateX(3px); }

  /* LOISIR CARD */
  .loisir-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 20px; padding: 32px; transition: border-color 0.3s, transform 0.3s; position: relative; overflow: hidden; cursor: pointer; }
  .loisir-card:hover { border-color: rgba(45,125,210,0.25); transform: translateY(-4px); }
  .loisir-icon { font-size: 44px; margin-bottom: 16px; display: block; }
  .loisir-sound-badge { position: absolute; top: 18px; right: 20px; display: inline-flex; align-items: center; gap: 5px; font-size: 11px; color: var(--muted); opacity: 0.55; transition: opacity 0.2s, color 0.2s; }
  .loisir-card:hover .loisir-sound-badge { opacity: 1; color: var(--blue); }

  /* ── FX LOISIRS (déclenchés au clic, avec le son) ──
     Refonte v3 : aucun backdrop-filter ni mix-blend-mode (instables sur Opera GX / Safari).
     Le contenu de la carte reste toujours visible. Les effets se superposent en pointer-events:none. */
  .fx-layer { position: absolute; inset: 0; pointer-events: none; z-index: 5; border-radius: inherit; overflow: hidden; }

  /* Formule 1 — lignes de vitesse rouges qui balayent la carte */
  @keyframes fxDash { from { transform: translateX(-140%); } to { transform: translateX(560%); } }
  .fx-f1-line { position: absolute; left: 0; height: 2px; width: 30%; border-radius: 2px; background: linear-gradient(90deg, transparent, rgba(232,48,48,0.95), transparent); animation: fxDash 0.45s linear infinite; box-shadow: 0 0 12px rgba(232,48,48,0.8); }
  @keyframes fxF1Fade { 0% { opacity: 0; } 12% { opacity: 1; } 85% { opacity: 1; } 100% { opacity: 0; } }

  /* Musculation — compteur de reps en surimpression (rien sur la carte elle-même) */
  @keyframes fxRep { 0% { transform: translate(-50%, calc(-50% + 30px)) scale(0.4); opacity: 0; } 30% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; } 75% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 100% { transform: translate(-50%, calc(-50% - 26px)) scale(1); opacity: 0; } }
  @keyframes fxFlex { 0% { transform: translate(-50%, calc(-50% + 20px)) scale(0.6); opacity: 0; } 30% { transform: translate(-50%, -50%) scale(1.1) rotate(-3deg); opacity: 1; } 60% { transform: translate(-50%, -50%) scale(1) rotate(0); opacity: 1; } 100% { transform: translate(-50%, -50%) scale(1.05); opacity: 0; } }

  /* Zelda — triforce qui s'assemble */
  @keyframes fxZeldaFade { 0% { opacity: 0; } 8% { opacity: 1; } 88% { opacity: 1; } 100% { opacity: 0; } }
  @keyframes fxTriIn1 { from { transform: translate(-80px, -70px) rotate(-160deg); opacity: 0; } 50% { opacity: 1; } to { transform: none; opacity: 1; } }
  @keyframes fxTriIn2 { from { transform: translate(80px, -70px) rotate(160deg); opacity: 0; } 50% { opacity: 1; } to { transform: none; opacity: 1; } }
  @keyframes fxTriIn3 { from { transform: translate(0, 85px) rotate(200deg); opacity: 0; } 50% { opacity: 1; } to { transform: none; opacity: 1; } }
  .fx-tri { width: 0; height: 0; border-left: 22px solid transparent; border-right: 22px solid transparent; border-bottom: 38px solid #ffd860; position: absolute; filter: drop-shadow(0 0 8px rgba(255,216,96,0.85)); }

  /* Séquence Dragon Ball : 7 boules s'alignent en arc, illuminations, Shenron sort, fade */
  @keyframes fxDbFade { 0% { opacity: 0; } 5% { opacity: 1; } 92% { opacity: 1; } 100% { opacity: 0; } }
  @keyframes fxBallPop { 0% { opacity: 0; transform: scale(0) translateY(20px); } 50% { transform: scale(1.25) translateY(0); opacity: 1; } 75% { transform: scale(0.92); } 100% { opacity: 1; transform: scale(1); } }
  @keyframes fxBallGlow { 0%, 100% { filter: drop-shadow(0 0 6px rgba(255,170,30,0.55)); } 50% { filter: drop-shadow(0 0 18px rgba(255,200,60,0.95)) drop-shadow(0 0 30px rgba(255,150,30,0.6)); } }
  @keyframes fxShenronDraw { 0%, 30% { stroke-dashoffset: 600; opacity: 0; } 35% { opacity: 1; } 75% { stroke-dashoffset: 0; opacity: 1; } 100% { stroke-dashoffset: 0; opacity: 0; } }
  @keyframes fxShenronRoar { 0%, 50% { transform: scale(0.85); opacity: 0; } 60% { opacity: 1; } 80% { transform: scale(1); opacity: 1; } 100% { transform: scale(1.05); opacity: 0; } }
  @keyframes fxShenronEye { 0%, 55% { opacity: 0; } 65% { opacity: 1; } 90% { opacity: 1; } 100% { opacity: 0; } }
  @keyframes fxSparkle { 0% { opacity: 0; transform: scale(0); } 30% { opacity: 1; transform: scale(1.2); } 60% { opacity: 1; transform: scale(0.7); } 100% { opacity: 0; transform: scale(0.4); } }

  /* CONTACT */
  .contact-link { display: flex; align-items: center; gap: 20px; padding: 24px 32px; background: var(--bg2); border: 1px solid var(--border); border-radius: 16px; text-decoration: none; color: var(--text); transition: border-color 0.3s, transform 0.3s, background 0.3s; }
  .contact-link:hover { border-color: rgba(45,125,210,0.3); background: var(--bg3); transform: translateX(6px); }
  .contact-icon { width: 48px; height: 48px; border-radius: 12px; background: var(--blue-dim); display: flex; align-items: center; justify-content: center; color: var(--blue); flex-shrink: 0; transition: background 0.3s; }
  .contact-link:hover .contact-icon { background: var(--blue); color: #fff; }

  /* PRO BOX */
  .pro-box { background: linear-gradient(135deg, rgba(45,125,210,0.08) 0%, rgba(45,125,210,0.02) 100%); border: 1px solid rgba(45,125,210,0.25); border-radius: 20px; padding: 36px 40px; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
  .hero-word { display: inline-block; animation: fadeUp 0.8s cubic-bezier(.22,1,.36,1) both; }
  @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

  /* Fondu en bas du hero : transition douce vers la section suivante */
  .hero-fade { position: absolute; left: 0; right: 0; bottom: 0; height: 140px; background: linear-gradient(to bottom, transparent, var(--bg)); pointer-events: none; }

  /* Hero mobile fix — 100lvh : le fond couvre tout l'écran, y compris derrière les barres Safari */
  @media (max-width: 600px) {
    #accueil {
      min-height: 100vh !important;
      min-height: 100lvh !important;
      padding-top: calc(90px + env(safe-area-inset-top, 0px)) !important;
      padding-bottom: 80px !important;
      justify-content: flex-start !important;
      background: var(--bg);
    }
    #accueil > div[style] { padding-top: 0; }
    /* Glow circles repositionnés pour ne pas dépasser sur les côtés */
    #accueil .glow-circle { display: none; }
  }

  /* Email button mobile fix */
  @media (max-width: 520px) {
    .contact-link { flex-wrap: wrap !important; }
    .contact-link .copy-btn { width: 100%; text-align: center; justify-content: center; display: flex; }
  }

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
  // hauteur réelle de la navbar (68px + safe-area iOS éventuelle)
  const nav = document.querySelector(".navbar");
  const offset = (nav ? nav.getBoundingClientRect().height : 68) + 4;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
}

function useActiveSection() {
  const [active, setActive] = useState("accueil");
  useEffect(() => {
    const ids = navLinks.map((l) => l.id);
    function onScroll() {
      const scrollY = window.scrollY + 120; // offset navbar
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActive(current);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return active;
}

/* ═══════════════════════════════════════════════════════════
   NAVBAR  — with mobile hamburger + active section highlight
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
  const active = useActiveSection();

  function handleNav(id: string) {
    setMenuOpen(false);
    setTimeout(() => scrollTo(id), 10);
  }

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
              <button
                className="nav-btn"
                onClick={() => handleNav(l.id)}
                style={{
                  color: active === l.id ? "#ffffff" : undefined,
                  borderBottom: active === l.id ? "2px solid var(--blue)" : "2px solid transparent",
                  paddingBottom: 4,
                  transition: "color 0.2s, border-color 0.2s",
                }}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
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
        <div style={{
          position: "fixed", inset: 0, zIndex: 999,
          background: "rgba(10,12,14,0.97)",
          backdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 8, animation: "mdFadeIn 0.2s ease",
        }}>
          {navLinks.map((l, i) => (
            <button
              key={l.id}
              onClick={() => handleNav(l.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(36px, 8vw, 52px)",
                letterSpacing: "0.06em",
                color: active === l.id ? "var(--blue)" : "rgba(240,242,245,0.85)",
                padding: "8px 24px",
                transition: "color 0.2s",
                animation: `fadeUp 0.4s ${i * 0.05 + 0.05}s both`,
              }}
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
    <section id="accueil" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 8% 60px", position: "relative", overflow: "hidden" }}>
      <div className="hero-grid" />
      <div className="scan-line" />
      <div className="glow-circle" style={{ width: 700, height: 700, background: "rgba(45,125,210,0.07)", top: -200, left: "40%" }} />
      <div className="glow-circle" style={{ width: 400, height: 400, background: "rgba(100,160,240,0.05)", bottom: 0, right: "10%" }} />
      <div className="hero-fade" />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100 }}>
        <div className="label" style={{ animation: "fadeUp 0.6s both" }}>BUT GEII — Automatisme &amp; Informatique Industrielle</div>
        <h1 className="display" style={{ fontSize: "clamp(56px, 10vw, 160px)", color: "#fff", marginBottom: 24 }}>
          {"Charly".split("").map((c, i) => <span key={i} className="hero-word" style={{ animationDelay: `${0.05 * i + 0.2}s` }}>{c}</span>)}
          <br />
          <span style={{ color: "var(--blue)", opacity: 0.9, whiteSpace: "nowrap" }}>
            {"VERDIERE".split("").map((c, i) => <span key={i} className="hero-word" style={{ animationDelay: `${0.04 * i + 0.7}s` }}>{c}</span>)}
          </span>
          <span style={{ color: "var(--muted)", whiteSpace: "nowrap" }}>
            {"‑PARENT".split("").map((c, i) => <span key={i} className="hero-word" style={{ animationDelay: `${0.04 * i + 1.0}s` }}>{c}</span>)}
          </span>
        </h1>
        <p style={{ fontSize: "clamp(16px, 1.4vw, 20px)", color: "var(--muted)", maxWidth: 600, lineHeight: 1.7, marginBottom: 48, animation: "fadeUp 0.8s 1.3s both" }}>
          Étudiant en BUT GEII, spécialisé en automatisme et informatique industrielle.
          En alternance chez <span style={{ color: "var(--accent)" }}>Ampère Electricity (Renault) — Douai</span>.
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
   TABLE DES MATIÈRES  — sommaire numéroté (attendu CDC)
═══════════════════════════════════════════════════════════ */
const tocItems = [
  { num: "01", label: "À propos",    id: "apropos",     desc: "Parcours, motivations et projet professionnel" },
  { num: "02", label: "Compétences", id: "competences", desc: "Compétences techniques et transversales" },
  { num: "03", label: "Projets",     id: "projets",     desc: "Réalisations académiques et en entreprise" },
  { num: "04", label: "Alternance",  id: "alternance",  desc: "Renault Douai — installations et missions" },
  { num: "05", label: "Loisirs",     id: "loisirs",     desc: "Centres d'intérêt et valeurs" },
  { num: "06", label: "CV",          id: "cv",          desc: "Formation, expérience et CV téléchargeable" },
  { num: "07", label: "Contact",     id: "contact",     desc: "LinkedIn, GitHub et email" },
];

function TableOfContents() {
  return (
    <section id="sommaire" className="section">
      <div style={{ marginBottom: 56 }}>
        <div className="label reveal">Sommaire</div>
        <h2 className="display reveal reveal-delay-1" style={{ fontSize: "clamp(42px, 5.5vw, 72px)", color: "#fff" }}>
          Table des <span style={{ color: "var(--blue)" }}>matières</span>
        </h2>
        <p className="reveal reveal-delay-2" style={{ color: "var(--muted)", fontSize: 14, marginTop: 12 }}>
          Cliquez sur une section pour y accéder directement.
        </p>
      </div>
      <div className="toc-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {tocItems.map((item, i) => (
          <button
            key={item.id}
            className={`toc-row reveal reveal-delay-${(i % 4) + 1}`}
            onClick={() => scrollTo(item.id)}
          >
            <span className="toc-num">{item.num}</span>
            <span className="toc-text">
              <span className="toc-label">{item.label}</span>
              <span className="toc-desc">{item.desc}</span>
            </span>
            <ArrowRight size={18} className="toc-arrow" />
          </button>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .toc-row {
          display: flex; align-items: center; gap: 20px;
          width: 100%; text-align: left;
          padding: 22px 26px;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.3s, background 0.3s, transform 0.3s;
        }
        .toc-row:hover { border-color: rgba(45,125,210,0.35); background: var(--bg3); transform: translateX(6px); }
        .toc-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 34px; line-height: 1;
          color: var(--blue); opacity: 0.85;
          flex-shrink: 0; min-width: 44px;
        }
        .toc-text { display: flex; flex-direction: column; gap: 3px; flex: 1; min-width: 0; }
        .toc-label { font-size: 16px; font-weight: 700; color: var(--text); }
        .toc-desc { font-size: 13px; color: var(--muted); }
        .toc-arrow { color: var(--muted); flex-shrink: 0; opacity: 0; transform: translateX(-4px); transition: opacity 0.25s, transform 0.25s, color 0.25s; }
        .toc-row:hover .toc-arrow { opacity: 1; transform: translateX(0); color: var(--blue); }
        @media (max-width: 720px) { .toc-grid { grid-template-columns: 1fr !important; } }
      ` }} />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   ABOUT  — narrative redesign, photo placeholder, story cards
═══════════════════════════════════════════════════════════ */
function About() {
  return (
    <section id="apropos" className="section">
      <div className="glow-circle" style={{ width: 500, height: 500, background: "rgba(45,125,210,0.04)", top: 0, right: -100 }} />

      {/* ── Header ── */}
      <div style={{ marginBottom: 64 }}>
        <div className="label reveal">À propos</div>
        <h2 className="display reveal reveal-delay-1" style={{ fontSize: "clamp(48px, 6vw, 80px)", color: "#fff" }}>
          Parcours &amp; <span style={{ color: "var(--blue)" }}>Motivations</span>
        </h2>
      </div>

      {/* ── Main layout: photo + story ── */}
      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 60, alignItems: "start", marginBottom: 64 }}>

        {/* Carte identité — monogramme (pas de photo, choix assumé) */}
        <div className="reveal about-photo-col">
          <div style={{
            width: "100%", aspectRatio: "3/4",
            background: "linear-gradient(160deg, var(--bg2) 0%, #11161c 100%)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            gap: 10, color: "var(--muted)",
            position: "relative", overflow: "hidden",
          }}>
            {/* Circuit bg */}
            <svg width="100%" height="100%" viewBox="0 0 200 267" style={{ position: "absolute", inset: 0, opacity: 0.1 }}>
              <circle cx="100" cy="133" r="80" stroke="#2d7dd2" strokeWidth="1" fill="none" strokeDasharray="4 6"/>
              <path d="M20 133h30l15-25h30l15 25h30" stroke="#2d7dd2" strokeWidth="0.8" fill="none"/>
              <path d="M100 50v30l20 10v20l-20 10v30" stroke="#2d7dd2" strokeWidth="0.8" fill="none"/>
              <circle cx="50" cy="108" r="3" fill="#2d7dd2"/>
              <circle cx="150" cy="133" r="3" fill="#2d7dd2"/>
              <circle cx="100" cy="80" r="3" fill="#2d7dd2"/>
            </svg>
            <div className="display" style={{ fontSize: 88, color: "var(--blue)", letterSpacing: "0.05em", position: "relative", textShadow: "0 0 50px rgba(45,125,210,0.45)", lineHeight: 1 }}>CVP</div>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--muted)", position: "relative" }}>
              Automatisme · GEII
            </span>
            {/* Name tag */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 20px", background: "linear-gradient(to top, rgba(14,16,18,0.95), transparent)" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>Charly VERDIERE-PARENT</div>
              <div style={{ fontSize: 11, color: "var(--blue)" }}>BUT GEII · 3ème année · IUT UPHF</div>
            </div>
          </div>

          {/* Stats sous la photo */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
            {[{ num: "6", label: "Projets" }, { num: "840", label: "TOEIC" }].map((s) => (
              <div key={s.label} className="stat-box" style={{ padding: "18px 12px" }}>
                <div className="stat-num" style={{ fontSize: 36 }}>{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Story narrative */}
        <div>
          {/* Étape 1 */}
          <div className="reveal reveal-delay-1" style={{ marginBottom: 36, paddingLeft: 24, borderLeft: "2px solid rgba(45,125,210,0.3)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 10 }}>Origine</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>Un intérêt pour la technique dès le départ</h3>
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.85 }}>
              Mon attrait pour les systèmes techniques s'est développé tôt, notamment à travers mon frère dont les projets d'électronique et de programmation m'ont initié à ces domaines. L'un d'eux — un robot capable de résoudre un Rubik's Cube — m'a donné envie de comprendre comment concevoir et programmer des systèmes automatisés.
            </p>
          </div>

          {/* Étape 2 */}
          <div className="reveal reveal-delay-2" style={{ marginBottom: 36, paddingLeft: 24, borderLeft: "2px solid rgba(45,125,210,0.6)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 10 }}>Formation</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>De la robotique à l'automatisme industriel</h3>
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.85 }}>
              En intégrant le BUT GEII, j'avais initialement un intérêt marqué pour la robotique. Les enseignements en automatisme — GRAFCET, langages automates, systèmes de production — m'ont orienté vers l'automatisme industriel, domaine dans lequel j'ai progressivement concentré mes efforts et mes projets.
            </p>
          </div>

          {/* Étape 3 */}
          <div className="reveal reveal-delay-3" style={{ marginBottom: 36, paddingLeft: 24, borderLeft: "2px solid var(--blue)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 10 }}>Alternance</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>Mise en pratique en environnement industriel</h3>
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.85 }}>
              Mon alternance chez Ampère Electricity (Renault) à Douai m'a permis d'intervenir sur des équipements en production réelle : presses d'emboutissage, découpes laser, automates Siemens et Schneider, modification d'IHM. Ces missions ont renforcé ma rigueur technique et mon autonomie dans la résolution de problèmes industriels.
            </p>
          </div>

          {/* Projet pro box */}
          <div className="reveal reveal-delay-4 pro-box">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <Target size={20} color="var(--blue)" />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blue)" }}>Projet professionnel</span>
            </div>
            <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.8, marginBottom: 10 }}>
              Poursuivre en école d'ingénieur à l'<strong style={{ color: "var(--accent)" }}>INSA Hauts-de-France</strong>, en Génie Électrique et Informatique Industrielle, avec une spécialisation en automatisme et une alternance chez <strong style={{ color: "var(--accent)" }}>Othua</strong>.
            </p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginTop: 16 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>Court terme</div>
                <div style={{ fontSize: 13, color: "var(--accent)" }}>Obtenir le BUT GEII · Intégrer l'INSA Hauts-de-France</div>
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
        <div style={{ padding: "22px 28px", background: "var(--blue-dim)", borderRadius: 16, border: "1px solid rgba(45,125,210,0.2)", display: "flex", alignItems: "center", gap: 16 }}>
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

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 860px) {
          #apropos > div:nth-child(2) { grid-template-columns: 1fr !important; }
          #apropos > div:nth-child(2) > div:first-child { position: static !important; }
          #apropos > div:nth-child(3) { grid-template-columns: 1fr !important; }
        }
        .about-photo-col { position: sticky; top: 90px; }
        @media (max-width: 860px) {
          .about-photo-col { position: static !important; top: auto !important; }
        }
      ` }} />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SKILLS  — niveau nommé au lieu de % arbitraires
═══════════════════════════════════════════════════════════ */
type SkillLevel = "Découverte" | "Application" | "Autonomie" | "Référent";
const LEVEL_MAP: Record<SkillLevel, { pct: number; color: string }> = {
  "Découverte":  { pct: 25,  color: "#6080a0" },
  "Application": { pct: 55,  color: "#2d7dd2" },
  "Autonomie":   { pct: 80,  color: "#2d7dd2" },
  "Référent":    { pct: 100, color: "#40c0f0" },
};

const technicalSkills: { icon: React.ReactNode; name: string; desc: string; level: SkillLevel }[] = [
  { icon: <Zap size={22} />,      name: "Automatisme",              desc: "GRAFCET, Ladder, API Siemens & TSX Premium, PL7 Pro",     level: "Application" },
  { icon: <Network size={22} />,  name: "Réseaux industriels",      desc: "Communication automate/IHM, diagnostic réseau industriel", level: "Découverte" },
  { icon: <Code2 size={22} />,    name: "Programmation",            desc: "Python, C, Arduino",                                       level: "Découverte" },
  { icon: <Activity size={22} />, name: "Électronique",             desc: "Montages analogiques, numériques, capteurs industriels",   level: "Découverte" },
  { icon: <Settings size={22} />, name: "Supervision / IHM",       desc: "WIN CC, création et modification d'interfaces opérateur",  level: "Application" },
  { icon: <Wrench size={22} />,   name: "Maintenance industrielle", desc: "Dépannage méthodique, presses, découpes laser, relais",    level: "Application" },
  { icon: <Cpu size={22} />,      name: "Électricité industrielle", desc: "Câblage, cartes analogiques, relais, plans électriques",   level: "Application" },
  { icon: <BookOpen size={22} />, name: "Anglais — TOEIC 840",     desc: "Lecture de documentation technique, communication pro",     level: "Autonomie" },
];

const softSkills: { name: string; level: SkillLevel; desc: string }[] = [
  { name: "Travail en équipe",        level: "Application", desc: "Projets académiques et missions entreprise" },
  { name: "Résolution de problèmes",  level: "Application", desc: "Diagnostics terrain, approche méthodique" },
  { name: "Rigueur & méthode",        level: "Application", desc: "Exigence industrielle au quotidien" },
  { name: "Autonomie",                level: "Application", desc: "Missions en production sans encadrement" },
  { name: "Communication technique",  level: "Découverte",  desc: "Rédaction de rapports, échanges fabricants" },
  { name: "Capacité d'adaptation",    level: "Application", desc: "Environnements variés, nouveaux outils" },
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
  resultats: string; competence: string; competenceDetail?: string;
  lecons?: string;
  screenshots?: string[];
  videos?: { src: string; label?: string }[];
  ressources?: { label: string; href: string }[];
};

const projects: Project[] = [
  {
    tag: "Formation — 1ère année",
    title: "Découverte de l'automatisme",
    desc: "Apprentissage sur maquettes à logigrammes : portes logiques câblées physiquement, puis GRAFCET et langage Ladder sur automate.",
    icon: "🔌",
    bg: "linear-gradient(135deg, #0e1a14 0%, #162a1e 100%)",
    highlights: ["Logigrammes", "Portes logiques", "GRAFCET", "Ladder"],
    color: "#40c070",
    context: "Premier module d'automatisme du BUT GEII, et mon premier vrai contact avec les systèmes automatisés. Tout a commencé sur des maquettes à logigrammes : des platines sur lesquelles on câble physiquement des portes logiques (ET, OU, NON, mémoires) pour construire la logique d'un automatisme. C'est sur ces maquettes que j'ai appris à raisonner, d'abord en logique combinatoire puis en séquentiel, avant de passer au GRAFCET et au langage Ladder sur automate.",
    objectifs: ["Câbler des fonctions logiques sur maquettes à logigrammes (ET, OU, NON, mémoires)", "Maîtriser la logique combinatoire puis séquentielle", "Concevoir des GRAFCET séquentiels", "Programmer en Ladder sur automate d'initiation et valider sur maquette"],
    technologies: ["Logigrammes", "Portes logiques", "GRAFCET", "Ladder", "Automate didactique", "Maquettes"],
    resultats: "Socle de toutes mes compétences en automatisme. Ce module a confirmé mon orientation et m'a fourni les bases pour les projets suivants.",
    competence: "Concevoir — Niveau 1",
    competenceDetail: "Mener une conception partielle intégrant une démarche projet",
    screenshots: ["/projets/maquette-logigrammes.jpg"],
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
    competence: "Concevoir — Niveau 2",
    competenceDetail: "Concevoir un système en fiabilisant les solutions proposées",
  },
  {
    tag: "Projet académique — 3ème année",
    title: "Palettiseur industriel",
    desc: "Programmation automate TSX Premium (Unity Pro), création d'une IHM et communication bidirectionnelle. Normes européennes respectées.",
    icon: "⚙️",
    bg: "linear-gradient(135deg, #0e1a2e 0%, #1a2e4a 100%)",
    highlights: ["IHM", "TSX Premium", "Unity Pro", "Normes EU", "Équipe"],
    color: "#2d7dd2",
    context: "Projet en groupe : automatisation d'un palettiseur industriel empilant des produits sur des palettes, en conformité avec les normes européennes de sécurité.",
    objectifs: ["Programmer l'automate TSX Premium avec Unity Pro", "Créer une IHM logiciel intuitive", "Assurer la communication bidirectionnelle automate ↔ IHM", "Respecter les normes européennes"],
    technologies: ["Automate TSX Premium", "Unity Pro", "Logiciel IHM", "GRAFCET", "Ladder", "Normes EN"],
    resultats: "Installation opérationnelle validée sur maquette. Renforcement des compétences en travail d'équipe et programmation automate.",
    competence: "Vérifier — Niveau 2",
    competenceDetail: "Mettre en place un protocole de tests pour valider le fonctionnement d'un système",
    screenshots: [
      "/projets/palettiseur-ihm-1.png", "/projets/palettiseur-ihm-2.png", "/projets/palettiseur-ihm-3.png",
      "/projets/palettiseur-ihm-4.png", "/projets/palettiseur-ihm-5.png", "/projets/palettiseur-ihm-6.png",
      "/projets/palettiseur-ihm-7.png", "/projets/palettiseur-gemma.jpg", "/projets/palettiseur-synthese.png",
    ],
    ressources: [{ label: "Guide utilisateur du projet (PDF)", href: "/projets/palettiseur-guide.pdf" }],
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
    competence: "Intégrer — Niveau 2",
    competenceDetail: "Interagir avec les différents acteurs, lors de l'installation et de la mise en service d'un système, dans une démarche qualité",
    lecons: "Ne pas chercher trop compliqué : aller à l'essentiel, valider une chose simple, puis augmenter la complexité étape par étape.",
    screenshots: ["/projets/retourneur-photo.jpg", "/projets/retourneur-pl7-structure.jpg", "/projets/retourneur-pl7-ladder.jpg"],
    videos: [{ src: "/projets/retourneur-demo.mp4", label: "Démonstration du système d'économie d'énergie sur le retourneur" }],
  },
  {
    tag: "Projet entreprise · Renault — Alternance",
    title: "Sonde de température — Presse",
    desc: "Ajout d'une sonde PT100 sur la poulie moteur d'une presse d'emboutissage, modification IHM WIN CC et programme automate Siemens.",
    icon: "🌡️",
    bg: "linear-gradient(135deg, #1a1800 0%, #2a2600 100%)",
    highlights: ["Presse Renault", "Carte analogique", "WIN CC", "Siemens"],
    color: "#f0c040",
    context: "Face à des surchauffes répétées sur la poulie du moteur principal d'une presse d'emboutissage à l'usine Georges Besse de Renault, mission d'instrumenter ce point critique avec une sonde de température.",
    objectifs: ["Installer une sonde PT100 sur la poulie moteur", "Intégrer une carte analogique dans l'armoire", "Modifier le programme automate Siemens", "Mettre à jour l'IHM WIN CC (affichage + alarmes)"],
    technologies: ["Sonde PT100", "Carte analogique", "Automate Siemens", "WIN CC (IHM)", "Câblage industriel"],
    resultats: "Sonde opérationnelle en production. Surveillance en temps réel de la température, alertes automatiques avant surchauffe. Mission en totale autonomie.",
    competence: "Maintenir — Niveau 2",
    competenceDetail: "Mettre en place une stratégie de maintenance pour garantir un fonctionnement optimal",
    screenshots: [
      "/projets/sonde-synoptique.jpg", "/projets/sonde-armoire.jpg", "/projets/sonde-carte-analogique.jpg",
      "/projets/sonde-programme-1.jpg", "/projets/sonde-programme-2.jpg", "/projets/sonde-programme-3.jpg", "/projets/sonde-programme-4.jpg",
    ],
    videos: [
      { src: "/projets/sonde-moteur-principal.mp4", label: "Moteur principal de la presse (ligne 21)" },
      { src: "/projets/sonde-presse210.mp4", label: "Presse 210 (ligne 21)" },
    ],
  },
  {
    tag: "Exemple de dépannage · Renault — Alternance",
    title: "Dépannage : prise outil non bridée",
    desc: "Première intervention menée en autonomie totale : une prise outil refuse de se brider et bloque le cycle. Diagnostic méthodique jusqu'à l'actionneur défaillant.",
    icon: "🛠️",
    bg: "linear-gradient(135deg, #1a1212 0%, #2a1a1a 100%)",
    highlights: ["Diagnostic", "Vérin électrique", "Consignation", "Autonomie"],
    color: "#e07050",
    context: "Sur une installation d'emboutissage, une prise outil (qui raccorde l'air et l'alimentation aux outils) refuse de se brider, ce qui empêche la reprise du cycle de production. Il s'agissait de ma première intervention menée seul, en totale autonomie.",
    objectifs: [
      "Comprendre pourquoi le bridage de la prise n'est pas effectif",
      "Localiser l'origine réelle du défaut",
      "Remettre l'installation en condition de production en toute sécurité",
    ],
    technologies: ["Diagnostic électrique", "Programme automate", "Vérin électrique", "Consignation", "Multimètre"],
    resultats: "Après avoir d'abord cherché à tort dans le programme automate, j'ai élargi l'analyse à l'actionneur : le moteur du vérin électrique de la prise était hors service. Remplacement après consignation, puis reprise de production validée.",
    competence: "Maintenir — Niveau 1",
    competenceDetail: "Intervenir sur un système pour effectuer une opération de maintenance",
    lecons: "Ne jamais se focaliser sur une seule couche du système : quand le programme ne remonte rien d'anormal, le problème vient du réel (capteur, actionneur, câblage). Cette panne a structuré ma méthodologie de dépannage.",
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
          {project.competenceDetail && (
            <p style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.5, marginTop: -10, marginBottom: 20 }}>
              <span style={{ color: project.color, fontWeight: 600 }}>Compétence visée : </span>{project.competenceDetail}
            </p>
          )}
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
          {project.screenshots && project.screenshots.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: project.color, marginBottom: 12 }}>Captures</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
                {project.screenshots.map((src, i) => (
                  <a key={i} href={src} target="_blank" rel="noopener noreferrer" title="Ouvrir l'image en taille réelle" style={{ display: "block", borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", aspectRatio: "4/3", background: "#0d1014" }}>
                    <img src={src} alt={`${project.title} — capture ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </a>
                ))}
              </div>
            </div>
          )}
          {project.videos && project.videos.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: project.color, marginBottom: 12 }}>Vidéos</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
                {project.videos.map((v, i) => (
                  <div key={i}>
                    <video src={v.src} controls preload="metadata" playsInline style={{ width: "100%", borderRadius: 12, border: "1px solid var(--border)", background: "#000", display: "block" }} />
                    {v.label && <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 6 }}>{v.label}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {project.ressources && project.ressources.length > 0 && (
            <div style={{ marginTop: 16, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 22px" }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: project.color, marginBottom: 12 }}>Ressources</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {project.ressources.map((r, i) => (
                  <a key={i} href={r.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--accent)", textDecoration: "none" }}>
                    <Download size={14} style={{ flexShrink: 0, color: project.color }} /> {r.label}
                  </a>
                ))}
              </div>
            </div>
          )}
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
        <div className="glow-circle" style={{ width: 600, height: 600, background: "rgba(45,125,210,0.04)", bottom: 0, left: -100 }} />
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
                {/* Badge compétence visible directement */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 14, padding: "4px 10px", borderRadius: 6, background: `${p.color}12`, border: `1px solid ${p.color}35` }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: p.color }}>{p.competence}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 10 }}>
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
   ALTERNANCE  — installations cliquables avec galeries photo/vidéo
═══════════════════════════════════════════════════════════ */
const timelineItems = [
  { period: "Début d'alternance",  title: "Prise en main des installations",   desc: "Découverte de l'environnement Renault Georges Besse à Douai. Apprentissage des procédures de sécurité, des outils et des équipements en place." },
  { period: "Phase intermédiaire", title: "Interventions sur presses & lasers", desc: "Interventions techniques sur presses d'emboutissage, découpes laser et presses à injection plastique. Développement des premiers réflexes de dépannage." },
  { period: "Projet éclairage",    title: "Économie d'énergie — Retourneur",   desc: "Mise en place d'une gestion d'économie d'énergie sur l'éclairage du retourneur de flans via un radar Sick et modification du programme PL7 Pro." },
  { period: "Projet sonde",        title: "Mission technique autonome",          desc: "Ajout d'une sonde PT100 sur la poulie moteur d'une presse. Modification du programme automate Siemens et de l'IHM WIN CC. En totale autonomie." },
  { period: "Aujourd'hui",         title: "Autonomie progressive",               desc: "Développement de méthodologies de dépannage propres. Intervention croissamment autonome sur des systèmes industriels complexes." },
];

/* Bloc spécial IHM & automates : comparaison des 3 générations Siemens sur un même besoin
   (les conditions d'embrayage d'une presse) — le code change, la logique reste. */
type IhmGen = { label: string; year: string; src: string; alt: string };
const ihmGenerations: IhmGen[] = [
  { label: "Step 5", year: "Génération historique · 1979", src: "/projets/siemens-step5-embrayage.jpg", alt: "Conditions d'embrayage sous Step 5 — afficheur Siemens d'origine, format texte" },
  { label: "Step 7 — SIMATIC Manager", year: "Génération intermédiaire", src: "/projets/siemens-step7-embrayage.jpg", alt: "Conditions d'embrayage sous Step 7 — programme Ladder avec mnémoniques nommés" },
  { label: "TIA Portal", year: "Génération actuelle", src: "/projets/siemens-tia-embrayage.jpg", alt: "Conditions d'embrayage sous TIA Portal — Ladder structuré avec gestion safety" },
];

type InstallModal = { title: string; subtitle: string; desc: string; photos?: string[]; videos?: { src: string; label?: string }[]; gallery?: IhmGen[] } | null;

const installations = [
  {
    icon: "🔩", label: "Presses d'emboutissage",
    modal: {
      title: "Presse d'emboutissage",
      subtitle: "Renault Georges Besse · Douai",
      desc: "Presses hydrauliques de grande capacité utilisées pour déformer des flans métalliques et leur donner la forme des pièces de carrosserie automobile. Interventions de maintenance sur les systèmes hydrauliques, électriques et sur les automates de commande (Siemens). Projet sonde de température PT100 réalisé sur ce type de machine.",
      photos: ["/projets/presse-emboutissage.jpg", "/projets/emboutissage-flan.jpg", "/projets/emboutissage-piece-finie.jpg"],
      videos: [{ src: "/projets/emboutissage-ligne522.mp4", label: "Ligne 522 en production" }],
    },
  },
  {
    icon: "⚡", label: "Découpes laser",
    modal: {
      title: "Découpe laser CNC",
      subtitle: "Renault Georges Besse · Douai",
      desc: "Centres de découpe laser pilotés par CNC permettant de découper avec précision des pièces métalliques selon des programmes numériques. Maintenance des têtes laser, des systèmes de guidage et des capteurs de positionnement. Interventions sur les programmes automates et les interfaces de supervision.",
      photos: ["/projets/decoupe-laser.jpg"],
      videos: [{ src: "/projets/decoupe-laser-demo.mp4", label: "Découpe laser en fonctionnement" }],
    },
  },
  {
    icon: "🏭", label: "Presses à injection",
    modal: {
      title: "Presse à injection plastique",
      subtitle: "Renault Georges Besse · Douai",
      desc: "Machines d'injection plastique permettant de fabriquer des pièces de garniture intérieure automobile par injection de matière thermoplastique dans des moules. Maintenance des systèmes hydrauliques de fermeture, des unités d'injection, des systèmes de régulation thermique et des automates de commande.",
      videos: [{ src: "/projets/injection-demo.mp4", label: "Cycle d'injection observé en production" }],
    },
  },
  {
    icon: "💡", label: "Retourneur de flans",
    modal: {
      title: "Retourneur de flans",
      subtitle: "Projet éclairage · Radar Sick · PL7 Pro",
      desc: "Installation permettant de retourner des paquets de flans (état précédent d'une pièce de carrosserie) entre deux convoyeurs. Projet personnel : conception et réalisation d'un système de gestion d'économie d'énergie sur l'éclairage via un radar de présence Sick, modification du programme PL7 Pro et câblage d'un relais.",
      photos: ["/projets/retourneur-photo.jpg"],
      videos: [{ src: "/projets/retourneur-demo.mp4", label: "Démonstration du système d'économie d'énergie" }],
    },
  },
  {
    icon: "🖥️", label: "IHM & automates",
    modal: {
      title: "IHM & automates Siemens",
      subtitle: "Trois générations sur un même métier",
      desc: "Au département emboutissage, plusieurs générations de logiciels Siemens cohabitent sur les lignes. À chaque intervention, je peux me retrouver face à Step 5 sur un afficheur d'origine, Step 7 / SIMATIC Manager sur les S7-300/400, ou TIA Portal sur les installations récentes. La logique métier reste la même — ici les conditions d'embrayage d'une presse, comparées d'un environnement à l'autre. Savoir naviguer entre ces trois mondes fait partie du quotidien.",
      gallery: ihmGenerations,
    },
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
              Technicien de maintenance au sein de l'usine <strong style={{ color: "var(--accent)" }}>Ampère Electricity (Renault)</strong> à Douai. Intervention sur des équipements industriels critiques au cœur d'une chaîne de production automobile.
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
                        <span style={{ fontSize: 11, color: "var(--blue)", opacity: 0.7 }}>Voir le détail</span>
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

        <style dangerouslySetInnerHTML={{ __html: `@media (max-width: 860px) { #alternance > div { grid-template-columns: 1fr !important; gap: 48px !important; } }` }} />
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
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.8, marginBottom: 24 }}>{installModal.desc}</p>

              {installModal.gallery && installModal.gallery.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 12 }}>Conditions d'embrayage — même fonction, trois générations</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
                    {installModal.gallery.map((g) => (
                      <div key={g.label} style={{ border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden", background: "var(--bg3)" }}>
                        <a href={g.src} target="_blank" rel="noopener noreferrer" title="Ouvrir l'image en taille réelle" style={{ display: "block", aspectRatio: "16/10", overflow: "hidden", background: "#0d1014" }}>
                          <img src={g.src} alt={g.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                        </a>
                        <div style={{ padding: "12px 16px 14px" }}>
                          <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>{g.label}</span>
                            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--blue)" }}>{g.year}</span>
                          </div>
                          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4, lineHeight: 1.55 }}>{g.alt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {installModal.photos && installModal.photos.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12, marginBottom: 20 }}>
                  {installModal.photos.map((src, i) => (
                    <a key={i} href={src} target="_blank" rel="noopener noreferrer" title="Ouvrir l'image en taille réelle" style={{ display: "block", borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)", aspectRatio: "4/3", background: "#0d1014" }}>
                      <img src={src} alt={`${installModal.title} — photo ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    </a>
                  ))}
                </div>
              )}

              {installModal.videos && installModal.videos.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14, marginBottom: 4 }}>
                  {installModal.videos.map((v, i) => (
                    <div key={i}>
                      <video src={v.src} controls preload="metadata" playsInline style={{ width: "100%", borderRadius: 12, border: "1px solid var(--border)", background: "#000", display: "block" }} />
                      {v.label && <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 6 }}>{v.label}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   SOUND DESIGN LOISIRS — sons 100% synthétisés en Web Audio
   (aucun fichier audio : rien à charger, pas de droits)
═══════════════════════════════════════════════════════════ */
let audioCtx: AudioContext | null = null;
function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!audioCtx) audioCtx = new AC();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

/* F1 — montée en régime puis décélération (2 oscillateurs désaccordés) */
function playF1() {
  const ctx = getAudioCtx(); if (!ctx) return;
  const t = ctx.currentTime;
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.0001, t);
  master.gain.exponentialRampToValueAtTime(0.15, t + 0.1);
  master.gain.setValueAtTime(0.15, t + 1.55);
  master.gain.exponentialRampToValueAtTime(0.0001, t + 2.25);
  master.connect(ctx.destination);
  const lp = ctx.createBiquadFilter(); lp.type = "lowpass";
  lp.frequency.setValueAtTime(500, t);
  lp.frequency.exponentialRampToValueAtTime(4200, t + 1.55);
  lp.frequency.exponentialRampToValueAtTime(700, t + 2.25);
  lp.connect(master);
  ([[55, 660, "sawtooth", 0.7], [110.7, 1318, "square", 0.32]] as [number, number, OscillatorType, number][]).forEach(([f0, f1, type, vol]) => {
    const o = ctx.createOscillator(); o.type = type;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(f1, t + 1.55);
    o.frequency.exponentialRampToValueAtTime(f1 * 0.3, t + 2.25);
    const g = ctx.createGain(); g.gain.value = vol;
    o.connect(g); g.connect(lp);
    o.start(t); o.stop(t + 2.3);
  });
}

/* Musculation — succession de reps : 4 impacts rythmés (effort grognant + percussion), façon série de pompes */
function playMuscu() {
  const ctx = getAudioCtx(); if (!ctx) return;
  const t0 = ctx.currentTime + 0.02;
  const rep = (t: number, idx: number) => {
    /* effort vocalisé (grognement) : noise filtré bandpass montant */
    const dur = 0.32;
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(i / d.length < 0.5 ? i / d.length * 2 : 2 - i / d.length * 2, 1.5);
    const src = ctx.createBufferSource(); src.buffer = buf;
    const bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 4.2;
    bp.frequency.setValueAtTime(220 + idx * 30, t);
    bp.frequency.exponentialRampToValueAtTime(540 + idx * 60, t + dur);
    const g = ctx.createGain(); g.gain.value = 0.32;
    src.connect(bp); bp.connect(g); g.connect(ctx.destination);
    src.start(t);
    /* impact mat (poids qui touche) : sinus 75 Hz qui descend */
    const thud = ctx.createOscillator(); thud.type = "sine";
    thud.frequency.setValueAtTime(85, t + 0.15);
    thud.frequency.exponentialRampToValueAtTime(38, t + 0.32);
    const tg = ctx.createGain();
    tg.gain.setValueAtTime(0.38, t + 0.15);
    tg.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
    thud.connect(tg); tg.connect(ctx.destination);
    thud.start(t + 0.15); thud.stop(t + 0.42);
  };
  /* 4 reps, accélération progressive (l'effort monte) */
  [0, 0.42, 0.78, 1.10].forEach((dt, i) => rep(t0 + dt, i));
  /* coup de gong final pour marquer la dernière rep réussie */
  const tFinal = t0 + 1.32;
  ([220, 330, 550] as number[]).forEach((f, i) => {
    const o = ctx.createOscillator(); o.type = i === 0 ? "sine" : "triangle"; o.frequency.value = f;
    const og = ctx.createGain();
    og.gain.setValueAtTime(0.0001, tFinal);
    og.gain.exponentialRampToValueAtTime(0.16 / (i + 1), tFinal + 0.02);
    og.gain.exponentialRampToValueAtTime(0.0001, tFinal + 1.3);
    o.connect(og); og.connect(ctx.destination);
    o.start(tFinal); o.stop(tFinal + 1.4);
  });
}

/* Jeux vidéo — jingle « secret découvert » de Zelda, son 8-bit (onde carrée) */
function playZelda() {
  const ctx = getAudioCtx(); if (!ctx) return;
  const t0 = ctx.currentTime + 0.02;
  const notes = [784, 739.99, 622.25, 440, 415.3, 659.25, 830.61, 1046.5];
  const step = 0.135;
  notes.forEach((f, i) => {
    const t = t0 + i * step;
    const last = i === notes.length - 1;
    const o = ctx.createOscillator(); o.type = "square"; o.frequency.value = f;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.08, t + 0.012);
    if (last) {
      g.gain.setValueAtTime(0.08, t + 0.4);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.0);
    } else {
      g.gain.exponentialRampToValueAtTime(0.0001, t + step + 0.02);
    }
    o.connect(g); g.connect(ctx.destination);
    o.start(t); o.stop(t + (last ? 1.05 : step + 0.04));
  });
  const tl = t0 + (notes.length - 1) * step;
  const o2 = ctx.createOscillator(); o2.type = "triangle"; o2.frequency.value = 523.25;
  const g2 = ctx.createGain();
  g2.gain.setValueAtTime(0.0001, tl);
  g2.gain.exponentialRampToValueAtTime(0.055, tl + 0.02);
  g2.gain.exponentialRampToValueAtTime(0.0001, tl + 0.9);
  o2.connect(g2); g2.connect(ctx.destination);
  o2.start(tl); o2.stop(tl + 1);
}

/* Lecture & Mangas — Séquence Dragon Ball :
   - 7 tinkles cristallins échelonnés (un par boule, ascendant en hauteur)
   - drone grave qui monte pendant l'illumination collective
   - grondement sub-grave de Shenron qui apparaît
   - éclat final */
function playDragonBall() {
  const ctx = getAudioCtx(); if (!ctx) return;
  const t0 = ctx.currentTime + 0.02;

  /* 1. Sept tinkles ascendants (un par boule) — 130 ms d'écart, fréquence qui monte */
  const tinkleFreqs = [880, 988, 1109, 1245, 1397, 1568, 1760]; /* gamme pentatonique ascendante */
  tinkleFreqs.forEach((f, i) => {
    const tBall = t0 + i * 0.13;
    /* sinus + harmonique douce pour effet cloche cristalline */
    [f, f * 2, f * 3].forEach((freq, h) => {
      const o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, tBall);
      g.gain.exponentialRampToValueAtTime(0.12 / (h + 1), tBall + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, tBall + 0.55);
      o.connect(g); g.connect(ctx.destination);
      o.start(tBall); o.stop(tBall + 0.6);
    });
  });

  /* 2. Drone grave qui monte pendant l'illumination collective (après les 7 boules, ~0.95s) */
  const tDrone = t0 + 0.95;
  ([55, 82.4, 110] as number[]).forEach((f0, i) => {
    const o = ctx.createOscillator(); o.type = i === 2 ? "sawtooth" : "sine";
    o.frequency.setValueAtTime(f0, tDrone);
    o.frequency.exponentialRampToValueAtTime(f0 * 2.4, tDrone + 1.0);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, tDrone);
    g.gain.exponentialRampToValueAtTime(0.07 / (i + 1), tDrone + 0.4);
    g.gain.exponentialRampToValueAtTime(0.0001, tDrone + 1.0);
    o.connect(g); g.connect(ctx.destination);
    o.start(tDrone); o.stop(tDrone + 1.05);
  });

  /* 3. Grondement sub-grave de Shenron qui apparaît (~1.7s) */
  const tShenron = t0 + 1.7;
  /* couche 1 : sub-grave qui descend */
  const sub = ctx.createOscillator(); sub.type = "sine";
  sub.frequency.setValueAtTime(70, tShenron);
  sub.frequency.exponentialRampToValueAtTime(28, tShenron + 0.9);
  const subG = ctx.createGain();
  subG.gain.setValueAtTime(0.0001, tShenron);
  subG.gain.exponentialRampToValueAtTime(0.38, tShenron + 0.1);
  subG.gain.exponentialRampToValueAtTime(0.0001, tShenron + 1.2);
  sub.connect(subG); subG.connect(ctx.destination);
  sub.start(tShenron); sub.stop(tShenron + 1.25);
  /* couche 2 : noise filtré (souffle de Shenron) */
  const rBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 1.1), ctx.sampleRate);
  const rD = rBuf.getChannelData(0);
  for (let i = 0; i < rD.length; i++) rD[i] = Math.random() * 2 - 1;
  const rSrc = ctx.createBufferSource(); rSrc.buffer = rBuf;
  const rBp = ctx.createBiquadFilter(); rBp.type = "bandpass"; rBp.Q.value = 1.8;
  rBp.frequency.setValueAtTime(120, tShenron);
  rBp.frequency.exponentialRampToValueAtTime(500, tShenron + 1.0);
  const rG = ctx.createGain();
  rG.gain.setValueAtTime(0.0001, tShenron);
  rG.gain.exponentialRampToValueAtTime(0.18, tShenron + 0.15);
  rG.gain.exponentialRampToValueAtTime(0.0001, tShenron + 1.1);
  rSrc.connect(rBp); rBp.connect(rG); rG.connect(ctx.destination);
  rSrc.start(tShenron);

  /* 4. Éclat final : flash cristallin aigu à la fin (~2.7s) */
  const tFinal = t0 + 2.7;
  ([2349, 3136, 4186] as number[]).forEach((f, i) => {
    const o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = f;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, tFinal);
    g.gain.exponentialRampToValueAtTime(0.07 / (i + 1), tFinal + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, tFinal + 0.5);
    o.connect(g); g.connect(ctx.destination);
    o.start(tFinal); o.stop(tFinal + 0.55);
  });
}

/* ═══════════════════════════════════════════════════════════
   LOISIRS
═══════════════════════════════════════════════════════════ */
type LoisirFx = "f1" | "muscu" | "zelda" | "dragonball";

const FX_SOUNDS: Record<LoisirFx, { play: () => void; duration: number }> = {
  f1:         { play: playF1,          duration: 2300 },
  muscu:      { play: playMuscu,       duration: 2400 },
  zelda:      { play: playZelda,       duration: 2100 },
  dragonball: { play: playDragonBall,  duration: 3500 },
};

const loisirs: { icon: string; title: string; desc: string; tags: string[]; color: string; fx: LoisirFx; sonHint: string }[] = [
  { icon: "🏎️", title: "Formule 1", desc: "Je suis de près la F1 depuis plusieurs années, notamment les évolutions technologiques des monoplaces — aérodynamique, systèmes hybrides, électronique embarquée. Un univers qui rejoint directement mes intérêts en ingénierie.", tags: ["Aérodynamique", "Technologie", "Stratégie"], color: "#e83030", fx: "f1", sonHint: "Montée en régime" },
  { icon: "🏋️", title: "Musculation", desc: "La musculation m'apporte rigueur, constance et dépassement de soi. Comme en ingénierie, progresser demande une méthodologie précise, de la régularité et une bonne analyse de ses propres résultats.", tags: ["Rigueur", "Persévérance", "Méthode"], color: "#2d7dd2", fx: "muscu", sonHint: "Série de reps" },
  { icon: "🎮", title: "Jeux vidéo", desc: "Les jeux vidéo développent la logique, la réactivité et la résolution de problèmes. J'apprécie particulièrement les univers qui combinent stratégie et maîtrise technique.", tags: ["Logique", "Stratégie", "Réactivité"], color: "#9040c0", fx: "zelda", sonHint: "Un secret bien connu" },
  { icon: "📚", title: "Lecture & Mangas", desc: "Lecteur de fantasy et de mangas, j'apprécie les récits qui combinent imagination et profondeur. La culture japonaise m'attire également par sa philosophie du travail bien fait — une vision proche de l'exigence industrielle.", tags: ["Fantasy", "Mangas", "Culture JP"], color: "#e06020", fx: "dragonball", sonHint: "Invocation Shenron" },
];

function F1Fx() {
  return (
    <div className="fx-layer" style={{ animation: "fxF1Fade 2.3s ease forwards" }}>
      {[16, 32, 50, 67, 83].map((top, i) => (
        <span key={i} className="fx-f1-line" style={{ top: `${top}%`, animationDelay: `${i * 0.08}s` }} />
      ))}
    </div>
  );
}

function MuscuFx() {
  /* Compteur de reps qui apparaît à chaque rep audio (0.42s d'écart, voir playMuscu) */
  return (
    <div className="fx-layer" style={{ animation: "fxF1Fade 2.4s ease forwards" }}>
      {/* Compteur centré */}
      {[1, 2, 3, 4].map((n, i) => (
        <div key={n} style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 110, lineHeight: 1, color: "#2d7dd2",
          letterSpacing: "0.04em",
          textShadow: "0 0 24px rgba(45,125,210,0.85), 0 0 60px rgba(45,125,210,0.5), 0 4px 12px rgba(0,0,0,0.85)",
          animation: `fxRep 0.42s cubic-bezier(.34,1.6,.5,1) both`,
          animationDelay: `${i * 0.42}s`,
        }}>
          {n}
        </div>
      ))}
      {/* FLEX! sur la dernière rep */}
      <div style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%, -50%)",
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 44, color: "#fff", letterSpacing: "0.14em",
        textShadow: "0 0 22px rgba(45,125,210,1), 0 0 50px rgba(45,125,210,0.7), 0 4px 14px rgba(0,0,0,0.9)",
        animation: "fxFlex 0.9s cubic-bezier(.22,1,.36,1) both",
        animationDelay: "1.55s",
        whiteSpace: "nowrap",
        opacity: 0,
      }}>
        FLEX !
      </div>
    </div>
  );
}

function TriforceFx() {
  return (
    <div className="fx-layer" style={{ animation: "fxZeldaFade 2.1s ease forwards", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", width: 88, height: 76 }}>
        <div className="fx-tri" style={{ left: 22, top: 0, animation: "fxTriIn1 0.85s cubic-bezier(.22,1,.36,1) both" }} />
        <div className="fx-tri" style={{ left: 0, top: 38, animation: "fxTriIn2 0.85s cubic-bezier(.22,1,.36,1) both" }} />
        <div className="fx-tri" style={{ left: 44, top: 38, animation: "fxTriIn3 0.85s cubic-bezier(.22,1,.36,1) both" }} />
      </div>
    </div>
  );
}

/* Une Dragon Ball : sphère orange avec dégradé + N étoiles rouges à 4 branches */
function DragonBall({ stars, size = 26 }: { stars: number; size?: number }) {
  /* Positions des étoiles selon le nombre (1 à 7), inspirées des boules de la série */
  const positions: Record<number, { cx: number; cy: number }[]> = {
    1: [{ cx: 50, cy: 50 }],
    2: [{ cx: 38, cy: 50 }, { cx: 62, cy: 50 }],
    3: [{ cx: 50, cy: 36 }, { cx: 38, cy: 58 }, { cx: 62, cy: 58 }],
    4: [{ cx: 38, cy: 38 }, { cx: 62, cy: 38 }, { cx: 38, cy: 62 }, { cx: 62, cy: 62 }],
    5: [{ cx: 38, cy: 38 }, { cx: 62, cy: 38 }, { cx: 50, cy: 50 }, { cx: 38, cy: 62 }, { cx: 62, cy: 62 }],
    6: [{ cx: 36, cy: 36 }, { cx: 64, cy: 36 }, { cx: 36, cy: 50 }, { cx: 64, cy: 50 }, { cx: 36, cy: 64 }, { cx: 64, cy: 64 }],
    7: [{ cx: 36, cy: 32 }, { cx: 64, cy: 32 }, { cx: 36, cy: 50 }, { cx: 64, cy: 50 }, { cx: 50, cy: 50 }, { cx: 36, cy: 68 }, { cx: 64, cy: 68 }],
  };
  const pts = positions[stars] || [];
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: "block" }}>
      <defs>
        <radialGradient id={`bg${stars}`} cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#ffd966" />
          <stop offset="35%" stopColor="#ff9a2c" />
          <stop offset="78%" stopColor="#d4621a" />
          <stop offset="100%" stopColor="#8a3a08" />
        </radialGradient>
      </defs>
      {/* Corps de la boule */}
      <circle cx="50" cy="50" r="46" fill={`url(#bg${stars})`} stroke="#5c2a04" strokeWidth="1.5" />
      {/* Reflet brillant en haut-gauche */}
      <ellipse cx="36" cy="30" rx="14" ry="8" fill="#fff5d4" opacity="0.55" />
      <ellipse cx="32" cy="26" rx="5" ry="3" fill="#ffffff" opacity="0.8" />
      {/* Étoiles à 4 branches (style DBZ) */}
      {pts.map((p, i) => (
        <path
          key={i}
          d={`M ${p.cx} ${p.cy - 6} L ${p.cx + 1.5} ${p.cy - 1.5} L ${p.cx + 6} ${p.cy} L ${p.cx + 1.5} ${p.cy + 1.5} L ${p.cx} ${p.cy + 6} L ${p.cx - 1.5} ${p.cy + 1.5} L ${p.cx - 6} ${p.cy} L ${p.cx - 1.5} ${p.cy - 1.5} Z`}
          fill="#c81020"
          stroke="#5c1010"
          strokeWidth="0.6"
        />
      ))}
    </svg>
  );
}

function DragonBallFx() {
  /* Séquence complète :
     - 0 à 950 ms : les 7 boules apparaissent une par une en arc, avec un tinkle cristallin par boule
     - 950 à 1700 ms : illumination collective, le drone grave monte
     - 1700 à 2900 ms : Shenron se dessine en silhouette derrière, ses yeux rouges s'allument
     - 2900 à 3500 ms : éclat cristallin et tout disparaît */
  const balls = [1, 2, 3, 4, 5, 6, 7]; /* 1 à 7 étoiles */
  /* Disposition en arc de cercle, ouvert vers le bas (les boules forment un sourire inversé en haut de la carte) */
  const arcCount = balls.length;
  const arcRadius = 36;       /* en pourcentage de la largeur de la carte */
  const centerXPct = 50;
  const centerYPct = 70;      /* l'arc est dans la moitié haute de la carte */
  const angleStart = Math.PI * 1.20;
  const angleEnd   = Math.PI * 1.80;
  return (
    <div className="fx-layer" style={{ animation: "fxDbFade 3.5s ease forwards" }}>
      {/* Shenron (silhouette verte sinueuse) qui se dessine en fond, après les boules */}
      <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {/* Corps sinueux du dragon (path stroke qui se trace progressivement) */}
        <path
          d="M 20,170 C 50,150 70,100 110,90 C 150,80 180,120 215,100 C 245,85 265,55 285,45"
          stroke="#3ea870"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="600"
          style={{ animation: "fxShenronDraw 3.5s cubic-bezier(.4,.1,.4,1) forwards" }}
        />
        {/* Tête du dragon, plus marquée, à droite */}
        <g style={{ animation: "fxShenronRoar 3.5s cubic-bezier(.5,.2,.5,1) forwards", transformOrigin: "275px 45px" }}>
          {/* Tête (forme ovale + cornes) */}
          <ellipse cx="278" cy="45" rx="20" ry="11" fill="#3ea870" stroke="#1e5838" strokeWidth="1.5" />
          {/* Cornes */}
          <path d="M 268,37 L 263,24 L 271,32 Z" fill="#1e5838" />
          <path d="M 288,37 L 293,24 L 285,32 Z" fill="#1e5838" />
          {/* Moustaches */}
          <path d="M 260,48 Q 250,52 244,58" stroke="#1e5838" strokeWidth="1.4" fill="none" />
          <path d="M 296,48 Q 304,52 308,58" stroke="#1e5838" strokeWidth="1.4" fill="none" />
          {/* Yeux rouges qui s'allument */}
          <circle cx="272" cy="44" r="2.2" fill="#ff1818" style={{ animation: "fxShenronEye 3.5s ease forwards", filter: "drop-shadow(0 0 4px #ff3030)" }} />
          <circle cx="284" cy="44" r="2.2" fill="#ff1818" style={{ animation: "fxShenronEye 3.5s ease forwards", filter: "drop-shadow(0 0 4px #ff3030)" }} />
        </g>
      </svg>

      {/* Les 7 Dragon Balls en arc de cercle */}
      {balls.map((n, i) => {
        const t = arcCount > 1 ? i / (arcCount - 1) : 0.5;
        const angle = angleStart + (angleEnd - angleStart) * t;
        const x = centerXPct + Math.cos(angle) * arcRadius;
        const y = centerYPct + Math.sin(angle) * arcRadius * 0.9;
        return (
          <div
            key={n}
            style={{
              position: "absolute",
              left: `${x}%`, top: `${y}%`,
              transform: "translate(-50%, -50%)",
              animation: `fxBallPop 0.5s cubic-bezier(.34,1.56,.5,1) both, fxBallGlow 1.4s ease 1s infinite`,
              animationDelay: `${i * 0.13}s, ${0.9 + i * 0.05}s`,
              opacity: 0,
            }}
          >
            <DragonBall stars={n} size={42} />
          </div>
        );
      })}

      {/* Étincelles dorées qui jaillissent autour de l'arc pendant l'illumination */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 30 + (i % 3) * 10;
        const x = 50 + Math.cos(angle) * radius;
        const y = 65 + Math.sin(angle) * radius * 0.6;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`, top: `${y}%`,
              width: 6, height: 6,
              transform: "translate(-50%, -50%) rotate(45deg)",
              background: "radial-gradient(circle, #fff9c8 0%, rgba(255,200,60,0.8) 50%, transparent 80%)",
              borderRadius: "50%",
              animation: `fxSparkle 1.2s ease both`,
              animationDelay: `${1.0 + (i * 0.06)}s`,
              opacity: 0,
            }}
          />
        );
      })}
    </div>
  );
}

function Loisirs() {
  const [activeFx, setActiveFx] = useState<LoisirFx | null>(null);
  const fxTimer = useRef<number | null>(null);

  function trigger(fx: LoisirFx) {
    try { FX_SOUNDS[fx].play(); } catch { /* audio indisponible : l'animation joue quand même */ }
    setActiveFx(null);
    requestAnimationFrame(() => setActiveFx(fx));
    if (fxTimer.current) window.clearTimeout(fxTimer.current);
    fxTimer.current = window.setTimeout(() => setActiveFx(null), FX_SOUNDS[fx].duration);
  }

  return (
    <section id="loisirs" className="section">
      <div className="glow-circle" style={{ width: 500, height: 500, background: "rgba(45,125,210,0.04)", top: -100, left: -100 }} />
      <div style={{ marginBottom: 72 }}>
        <div className="label reveal">Loisirs &amp; Vie personnelle</div>
        <h2 className="display reveal reveal-delay-1" style={{ fontSize: "clamp(42px, 5.5vw, 72px)", color: "#fff", maxWidth: 700 }}>
          Ce qui m'<span style={{ color: "var(--blue)" }}>anime</span>
        </h2>
        <p className="reveal reveal-delay-2" style={{ color: "var(--muted)", fontSize: 16, marginTop: 16, maxWidth: 620, lineHeight: 1.7 }}>
          Mes centres d'intérêt reflètent les mêmes valeurs que mon parcours professionnel : rigueur, curiosité technique, dépassement de soi et goût de l'innovation.
        </p>
        <p className="reveal reveal-delay-3" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--blue)", fontSize: 13, marginTop: 14 }}>
          <Volume2 size={15} /> Chaque carte a son ambiance sonore : cliquez pour écouter.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
        {loisirs.map((l, i) => (
          <div
            key={l.title}
            className={`loisir-card reveal reveal-delay-${(i % 4) + 1}`}
            style={{ borderTop: `2px solid ${l.color}60` }}
            onClick={() => trigger(l.fx)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && trigger(l.fx)}
            aria-label={`${l.title} — jouer l'ambiance sonore`}
          >
            <span className="loisir-icon">{l.icon}</span>
            <div className="loisir-sound-badge"><Volume2 size={13} /> {l.sonHint}</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>{l.title}</h3>
            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75, marginBottom: 20 }}>{l.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {l.tags.map((t) => <span key={t} style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${l.color}40`, fontSize: 11, color: l.color, background: `${l.color}10` }}>{t}</span>)}
            </div>
            {activeFx === l.fx && l.fx === "f1" && <F1Fx />}
            {activeFx === l.fx && l.fx === "muscu" && <MuscuFx />}
            {activeFx === l.fx && l.fx === "zelda" && <TriforceFx />}
            {activeFx === l.fx && l.fx === "dragonball" && <DragonBallFx />}
          </div>
        ))}
      </div>
      <div className="reveal" style={{ marginTop: 60, display: "flex", gap: 16, flexWrap: "wrap" }}>
        {[
          { icon: <Heart size={16} />, label: "Motivé",  desc: "Par la technique et l'innovation" },
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
   CV  — real content from uploaded PDF
═══════════════════════════════════════════════════════════ */
function CV() {
  return (
    <section id="cv" className="section">
      <div style={{ marginBottom: 64 }}>
        <div className="label reveal">CV</div>
        <h2 className="display reveal reveal-delay-1" style={{ fontSize: "clamp(42px, 5.5vw, 72px)", color: "#fff" }}>
          Curriculum <span style={{ color: "var(--blue)" }}>Vitae</span>
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>

        {/* Left — aperçu du contenu */}
        <div className="reveal">
          {/* Formation */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 16 }}>— Formation</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ padding: "16px 20px", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>BUT GEII — 3ème année</div>
                <div style={{ fontSize: 12, color: "var(--blue)", margin: "3px 0" }}>Université Polytechnique Hauts-de-France · Valenciennes</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>Depuis septembre 2023</div>
              </div>
              <div style={{ padding: "16px 20px", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>Baccalauréat Général — Mention Très Bien</div>
                <div style={{ fontSize: 12, color: "var(--blue)", margin: "3px 0" }}>Lycée Ernest Couteaux · Saint-Amand-les-Eaux</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>2020 – 2023 · Maths, Sciences de l'ingénieur, Maths Expertes</div>
              </div>
            </div>
          </div>

          {/* Expérience */}
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 16 }}>— Expérience</p>
            <div style={{ padding: "16px 20px", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)" }}>Apprenti Technicien de maintenance</div>
              <div style={{ fontSize: 12, color: "var(--blue)", margin: "3px 0" }}>Ampère Electricity (Renault) · Douai</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>Depuis septembre 2023</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
                {["Maintenance préventive et curative des équipements industriels", "Réalisation d'un projet d'amélioration des processus", "Mise en place de nouveaux équipements et machines"].map((item) => (
                  <li key={item} style={{ fontSize: 12, color: "var(--muted)", display: "flex", gap: 8 }}>
                    <span style={{ color: "var(--blue)", flexShrink: 0 }}>→</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Compétences clés */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 14 }}>— Outils & logiciels</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Control Expert", "PL7 Pro", "TIA Portal", "Step 7", "Step 5", "WIN CC", "Unity Pro"].map((tool) => (
                <span key={tool} style={{ padding: "5px 12px", borderRadius: 6, border: "1px solid var(--border)", fontSize: 12, color: "var(--accent)", background: "var(--bg2)" }}>{tool}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — téléchargement */}
        <div className="reveal reveal-delay-2">
          <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 24, padding: "48px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(45,125,210,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(45,125,210,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />
            <div style={{ position: "relative" }}>
              {/* CV preview mockup */}
              <div style={{ width: 150, height: 200, background: "var(--bg3)", border: "1px solid rgba(45,125,210,0.2)", borderRadius: 8, margin: "0 auto 32px", display: "flex", flexDirection: "column", padding: 14, gap: 6, boxShadow: "0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(45,125,210,0.1)" }}>
                <div style={{ height: 4, background: "var(--blue)", borderRadius: 2, width: "55%" }} />
                <div style={{ height: 2, background: "rgba(45,125,210,0.3)", borderRadius: 2, width: "85%", marginTop: 2 }} />
                <div style={{ height: 2, background: "var(--border)", borderRadius: 2, width: "70%" }} />
                <div style={{ marginTop: 6, height: 1.5, background: "rgba(45,125,210,0.25)", borderRadius: 2, width: "100%" }} />
                {[75, 60, 85, 50, 70, 65].map((w, i) => <div key={i} style={{ height: 1.5, background: "var(--border)", borderRadius: 2, width: `${w}%` }} />)}
                <div style={{ marginTop: 4, height: 1.5, background: "rgba(45,125,210,0.25)", borderRadius: 2, width: "100%" }} />
                {[65, 80, 55, 70].map((w, i) => <div key={i} style={{ height: 1.5, background: "var(--border)", borderRadius: 2, width: `${w}%` }} />)}
              </div>

              <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>Charly VERDIERE-PARENT</div>
              <div style={{ fontSize: 12, color: "var(--blue)", marginBottom: 6 }}>Étudiant BUT GEII · Apprenti technicien</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 32, lineHeight: 1.6 }}>
                Valenciennes · 21 ans · Permis B<br />
                TOEIC 840 · Véhicule personnel
              </div>

              <a href="/cv.pdf" download="CV_Charly_VERDIERE-PARENT.pdf" className="btn-primary" style={{ margin: "0 auto", display: "inline-flex" }}>
                <Download size={16} /> Télécharger le CV (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 860px) {
          #cv > div:last-child { grid-template-columns: 1fr !important; }
        }
      ` }} />
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
      <div className="glow-circle" style={{ width: 600, height: 600, background: "rgba(45,125,210,0.05)", top: -100, right: -100 }} />
      <div style={{ maxWidth: 700 }}>
        <div className="label reveal">Contact</div>
        <h2 className="display reveal reveal-delay-1" style={{ fontSize: "clamp(42px, 5.5vw, 72px)", color: "#fff", marginBottom: 20 }}>
          Entrons en <span style={{ color: "var(--blue)" }}>Contact</span>
        </h2>
        <p className="reveal reveal-delay-2" style={{ fontSize: 16, color: "var(--muted)", marginBottom: 48, lineHeight: 1.7 }}>
          À la rentrée 2026, je poursuis en école d'ingénieur à l'<strong style={{ color: "var(--accent)" }}>INSA Hauts-de-France</strong>, en alternance chez <strong style={{ color: "var(--accent)" }}>Othua</strong> (automatisme industriel).
          N'hésitez pas à me contacter pour toute question ou échange autour de l'automatisme.
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
          <a href="https://github.com/charlyverdiere-star" className="contact-link" target="_blank" rel="noopener noreferrer">
            <div className="contact-icon"><Github size={22} /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 2 }}>Projets &amp; code</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>github.com/charlyverdiere-star</div>
            </div>
            <ArrowRight size={18} color="var(--muted)" />
          </a>

          {/* Email — copy to clipboard, no mailto */}
          <button
            onClick={copyEmail}
            className="contact-link"
            style={{ background: copied ? "rgba(45,125,210,0.08)" : undefined, borderColor: copied ? "rgba(45,125,210,0.4)" : undefined, width: "100%", textAlign: "left", flexWrap: "wrap", gap: 16 }}
          >
            <div className="contact-icon" style={{ background: copied ? "var(--blue)" : undefined, color: copied ? "#fff" : undefined }}>
              <Mail size={22} />
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 2 }}>Email professionnel</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text)" }}>{EMAIL}</div>
            </div>
            <span style={{
              fontSize: 12, fontWeight: 600, padding: "7px 16px", borderRadius: 20,
              background: copied ? "rgba(64,192,112,0.15)" : "rgba(45,125,210,0.12)",
              color: copied ? "#40c070" : "var(--blue)",
              border: `1px solid ${copied ? "rgba(64,192,112,0.3)" : "rgba(45,125,210,0.25)"}`,
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
      <span style={{ fontSize: 12, color: "var(--muted)" }}>Développé avec rigueur</span>
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
        <TableOfContents />
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