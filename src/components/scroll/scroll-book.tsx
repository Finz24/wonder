"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { SCROLL_CHAPTER_ATTRIBUTE, SCROLL_CONTACT_ANCHOR } from "./scroll-contracts";
import styles from "./scroll-book.module.css";

type ScrollBookProps = Readonly<{
  cover: ReactNode;
  children: ReactNode;
  closing: ReactNode;
}>;

const OPEN_DISTANCE_RATIO = 0.7;

function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

function animationSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    typeof window.requestAnimationFrame === "function"
  );
}

/**
 * Reusable scroll-book journey. Native vertical scrolling drives the paper
 * open from the closed cover, reveals chapter slots in sequence, and closes
 * toward the contact slot. Scroll is never trapped or hijacked: chapters
 * keep stable entry hooks so direct links land without replaying the journey.
 *
 * Without JS, without animation support, or under reduced motion the same
 * content renders as a readable static open scroll.
 */
export function ScrollBook({ cover, children, closing }: ScrollBookProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [systemReducedMotion, setSystemReducedMotion] = useState(false);
  const [motionOverride, setMotionOverride] = useState<boolean | null>(null);

  const reducedMotion = motionOverride ?? systemReducedMotion;
  const animated = mounted && animationSupported() && !reducedMotion;

  useEffect(() => {
    if (!animationSupported()) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Enable the animated presentation after first paint so server and
    // client render the same readable static markup.
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
      setSystemReducedMotion(media.matches);
    });
    const onChange = (event: MediaQueryListEvent) => setSystemReducedMotion(event.matches);
    media.addEventListener("change", onChange);
    return () => {
      window.cancelAnimationFrame(frame);
      media.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !animated) {
      root?.style.setProperty("--scroll-open", "0");
      root?.style.setProperty("--scroll-close", "0");
      return;
    }

    let frame = 0;
    const render = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const open = clamp(window.scrollY / (viewport * OPEN_DISTANCE_RATIO));
      const contactSection = root.querySelector<HTMLElement>(`#${SCROLL_CONTACT_ANCHOR}`);
      let close = 0;
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        close = clamp(1 - rect.bottom / (viewport * 1.2));
      }
      root.style.setProperty("--scroll-open", open.toFixed(4));
      root.style.setProperty("--scroll-close", close.toFixed(4));
    };
    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [animated]);

  useEffect(() => {
    if (!mounted) return;
    const scrollToHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const target =
        document.getElementById(hash) ??
        document.querySelector(`[${SCROLL_CHAPTER_ATTRIBUTE}="${CSS.escape(hash)}"]`);
      target?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    };
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [mounted, reducedMotion]);

  return (
    <div
      ref={rootRef}
      className={cn(styles.scroll, animated ? styles.animated : styles.static)}
    >
      <div aria-hidden="true" className={styles.theatre}>
        <div className={styles.ambient} />
        <div className={styles.paper} />
        <div className={styles.rollerTop} />
        <div className={styles.rollerBottom} />
      </div>

      <header className={styles.topbar}>
        <span lang="en" className={styles.brand}>
          Wonder <i>By Hila</i>
        </span>
        <a href={`#${SCROLL_CONTACT_ANCHOR}`} className={styles.contactLink}>
          בואו ניצור משהו יחד <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main className={styles.journey}>
        {cover}
        {children}
        {closing}
      </main>

      <footer className={styles.footer}>
        <button
          type="button"
          aria-pressed={reducedMotion}
          onClick={() => setMotionOverride(!reducedMotion)}
          className={styles.motionToggle}
        >
          {reducedMotion ? "הפעלת תנועה" : "הפחתת תנועה"}
        </button>
      </footer>
    </div>
  );
}
