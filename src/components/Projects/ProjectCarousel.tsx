import { useCallback, useEffect, useRef, useState } from "react";
import getImageUrl from "../../utils";
import styles from "./ProjectCarousel.module.css";

interface Project {
  title: string;
  description: string;
  imageSrc: string;
  imageSrcUrl: boolean;
  skills: string[];
  demo: string;
  source: string;
  featured?: boolean;
}

interface Props {
  projects: Project[];
}

const AUTOPLAY_INTERVAL = 3500;

export default function ProjectCarousel({ projects }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = projects.length;

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % total) + total) % total);
  }, [total]);

  const handleOpenProject = (title: string) => {
    const anchor = title.toLowerCase().replace(/\s+/g, "-");
    const url = `/projects#${anchor}`;
    window.location.href = url;
  };

  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  // ─── auto-play ────────────────────────────────────────────────────────
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, AUTOPLAY_INTERVAL);
  }, [total]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);

  const initialTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isAutoPlaying) {
      // Small delay before auto-play kicks in (lets user see the first card)
      initialTimerRef.current = setTimeout(() => {
        startAutoPlay();
      }, AUTOPLAY_INTERVAL);
    } else {
      stopAutoPlay();
    }
    return () => {
      stopAutoPlay();
      if (initialTimerRef.current) { clearTimeout(initialTimerRef.current); initialTimerRef.current = null; }
    };
  }, [isAutoPlaying, startAutoPlay, stopAutoPlay]);

  const handleMouseEnter = () => { if (isAutoPlaying) stopAutoPlay(); };
  const handleMouseLeave = () => { if (isAutoPlaying) startAutoPlay(); };

  // ─── 3D layout math ───────────────────────────────────────────────────
  // Use a "spread" layout: center card at front, neighbors offset to sides,
  // the rest stacked behind. This avoids backface issues.
  const getCardStyle = (index: number): React.CSSProperties => {
    let offset = index - activeIndex;
    // Wrap around for shortest distance
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const absOffset = Math.abs(offset);

    if (absOffset === 0) {
      // Center / active card
      return {
        transform: "translateX(0px) translateZ(0px) rotateY(0deg) scale(1)",
        opacity: 1,
        zIndex: total + 1,
        filter: "brightness(1)",
        pointerEvents: "auto",
      };
    }

    if (absOffset === 1) {
      // Immediate neighbors
      const sign = offset > 0 ? 1 : -1;
      return {
        transform: `translateX(${sign * 320}px) translateZ(-140px) rotateY(${sign * -25}deg) scale(0.85)`,
        opacity: 0.7,
        zIndex: total,
        filter: "brightness(0.7)",
        pointerEvents: "auto",
      };
    }

    if (absOffset === 2) {
      // Second neighbors
      const sign = offset > 0 ? 1 : -1;
      return {
        transform: `translateX(${sign * 520}px) translateZ(-300px) rotateY(${sign * -40}deg) scale(0.7)`,
        opacity: 0.4,
        zIndex: total - 1,
        filter: "brightness(0.5)",
        pointerEvents: "auto",
      };
    }

    // Everything else — hide behind
    const sign = offset > 0 ? 1 : -1;
    return {
      transform: `translateX(${sign * 100}px) translateZ(-400px) rotateY(0deg) scale(0.5)`,
      opacity: 0,
      zIndex: 0,
      filter: "brightness(0.3)",
      pointerEvents: "none",
    };
  };



  return (
    <div className={styles.carouselSection}>
      <div
        className={styles.carouselScene}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* SVG gradient def */}
        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <linearGradient id="carouselGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Left nav */}
        <button
          className={`${styles.carouselNav} ${styles.carouselNavLeft}`}
          onClick={() => { prev(); if (isAutoPlaying) { stopAutoPlay(); startAutoPlay(); } }}
          aria-label="Previous project"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* 3D Carousel */}
        <div className={styles.carousel3D}>
          {projects.map((project, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={i}
                className={`${styles.carouselItem} ${isActive ? styles.active : ""}`}
                style={getCardStyle(i)}
                onDoubleClick={isActive && !isMobile ? () => handleOpenProject(project.title) : undefined}
                onClick={() => {
                  if (!isActive) {
                    goTo(i);
                    if (isAutoPlaying) { stopAutoPlay(); startAutoPlay(); }
                  } else if (isMobile) {
                    handleOpenProject(project.title);
                  }
                }}
              >
                <div className={styles.carouselCard}>
                  <div className={styles.carouselImageWrap}>
                    <img
                      src={project.imageSrcUrl ? project.imageSrc : getImageUrl(project.imageSrc)}
                      alt={project.title}
                      className={styles.carouselImage}
                    />
                    {project.featured && (
                      <span className={styles.featuredBadge}>⭐ Featured</span>
                    )}
                  </div>
                  <div className={styles.carouselBody}>
                    <h3 className={styles.carouselTitle}>{project.title}</h3>
                    <p className={styles.carouselDesc}>{project.description}</p>
                    <div className={styles.carouselTags}>
                      {project.skills.slice(0, 4).map((skill, id) => (
                        <span key={id} className={styles.carouselTag}>{skill}</span>
                      ))}
                    </div>
                    {isActive && (
                      <div className={styles.carouselLinks}>
                        {project.demo !== "none" && (
                          <a
                            href={project.demo}
                            className={`${styles.carouselLinkBtn} ${styles.primary}`}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                              <polyline points="15 3 21 3 21 9"/>
                              <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                            Demo
                          </a>
                        )}
                        <a
                          href={project.source}
                          className={`${styles.carouselLinkBtn} ${styles.secondary}`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                          </svg>
                          Source
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right nav */}
        <button
          className={`${styles.carouselNav} ${styles.carouselNavRight}`}
          onClick={() => { next(); if (isAutoPlaying) { stopAutoPlay(); startAutoPlay(); } }}
          aria-label="Next project"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className={styles.carouselDots}>
        {projects.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === activeIndex ? styles.activeDot : ""}`}
            onClick={() => { goTo(i); if (isAutoPlaying) { stopAutoPlay(); startAutoPlay(); } }}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
