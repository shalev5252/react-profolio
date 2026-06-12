import { useEffect, useRef, useState } from "react";
import projects from "../../data/projects.json";
import ProjectCard from "./ProjectCard";
import ProjectCarousel from "./ProjectCarousel";
import styles from "./Projects.module.css";
import carouselStyles from "./ProjectCarousel.module.css";
import useScrollReveal from "../../hooks/useScrollReveal";

const GridIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const CarouselIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="5" y="4" width="14" height="16" rx="2" />
    <line x1="1" y1="8" x2="1" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="23" y1="8" x2="23" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Projects = () => {
  const sectionRef = useScrollReveal<HTMLElement>();
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const contentRef = useRef<HTMLDivElement>(null);

  const featured = projects.find((p: any) => p.featured);
  const others = projects.filter((p: any) => !p.featured);

  // When the view mode changes, make sure newly inserted "reveal" children
  // are immediately revealed (the section is already scrolled into view).
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    // Mark all .reveal descendants as .revealed immediately so they're visible
    el.querySelectorAll(".reveal").forEach((child) => {
      child.classList.add("revealed");
    });
  }, [viewMode]);

  return (
    <section id="projects" className={styles.container} ref={sectionRef}>
      <div className="reveal">
        <span className="sectionLabel">My Work</span>
        <h2 className="sectionTitle">Featured Projects</h2>
      </div>

      {/* View toggle */}
      <div className={`${carouselStyles.viewToggleWrapper} reveal`}>
        <span className={carouselStyles.toggleLabel}>View as</span>
        <div className={carouselStyles.toggleBtnGroup} role="group" aria-label="View mode">
          <button
            id="projects-carousel-toggle"
            className={`${carouselStyles.toggleBtn} ${viewMode === "carousel" ? carouselStyles.active : ""}`}
            onClick={() => setViewMode("carousel")}
            aria-pressed={viewMode === "carousel"}
          >
            <CarouselIcon />
            3D Carousel
          </button>
          <button
            id="projects-grid-toggle"
            className={`${carouselStyles.toggleBtn} ${viewMode === "grid" ? carouselStyles.active : ""}`}
            onClick={() => setViewMode("grid")}
            aria-pressed={viewMode === "grid"}
          >
            <GridIcon />
            Grid
          </button>
        </div>
      </div>

      {/* Content area — ref used to force-reveal children after view switch */}
      <div ref={contentRef}>
        {viewMode === "carousel" ? (
          /* ── 3D Carousel ── */
          <ProjectCarousel key={viewMode} projects={projects as any} />
        ) : (
          /* ── Original Grid Layout ── */
          <>
            {featured && (
              <div className={`${styles.featured} reveal`}>
                <ProjectCard project={featured} featured />
              </div>
            )}
            <div className={styles.grid}>
              {others.map((project, id) => (
                <div key={id} className={`reveal delay-${Math.min(id + 1, 5)}`}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
