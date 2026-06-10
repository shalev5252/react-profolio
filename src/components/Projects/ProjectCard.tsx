import { useEffect, useState } from "react";
import getImageUrl from "../../utils";
import styles from "./ProjectCard.module.css";

interface Props {
  project: {
    title: string;
    description: string;
    imageSrc: string;
    imageSrcUrl: boolean;
    skills: string[];
    demo: string;
    source: string;
    featured?: boolean;
  };
  featured?: boolean;
}

function ProjectCard({ project, featured }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleOpenProject = () => {
    const anchor = project.title.toLowerCase().replace(/\s+/g, "-");
    const url = `/projects#${anchor}`;
    window.location.href = url;
  };

  if (featured) {
    return (
      <div
        className={styles.featuredCard}
        onDoubleClick={!isMobile ? handleOpenProject : undefined}
        onClick={isMobile ? handleOpenProject : undefined}
      >
        <div className={styles.featuredImageWrap}>
          <img
            src={project.imageSrcUrl ? project.imageSrc : getImageUrl(project.imageSrc)}
            alt={project.title}
            className={styles.featuredImage}
          />
          <div className={styles.featuredBadge}>⭐ Featured</div>
        </div>
        <div className={styles.featuredInfo}>
          <h3 className={styles.featuredTitle}>{project.title}</h3>
          <p className={styles.featuredDesc}>{project.description}</p>
          <div className={styles.skillTags}>
            {project.skills.map((skill, id) => (
              <span key={id} className={styles.tag}>{skill}</span>
            ))}
          </div>
          <div className={styles.cardLinks}>
            {project.demo !== "none" && (
              <a href={project.demo} className={styles.linkPrimary} target="_blank" rel="noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Live Demo
              </a>
            )}
            <a href={project.source} className={styles.linkSecondary} target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              Source
            </a>
            <button className={styles.linkSecondary} onClick={handleOpenProject}>
              View Details →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.card}
      onDoubleClick={!isMobile ? handleOpenProject : undefined}
      onClick={isMobile ? handleOpenProject : undefined}
    >
      <div className={styles.cardImageWrap}>
        <img
          src={project.imageSrcUrl ? project.imageSrc : getImageUrl(project.imageSrc)}
          alt={project.title}
          className={styles.cardImage}
        />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>
        <div className={styles.skillTags}>
          {project.skills.map((skill, id) => (
            <span key={id} className={styles.tag}>{skill}</span>
          ))}
        </div>
        <div className={styles.cardLinks}>
          {project.demo !== "none" && (
            <a href={project.demo} className={styles.linkPrimary} target="_blank" rel="noreferrer">
              Demo
            </a>
          )}
          <a href={project.source} className={styles.linkSecondary} target="_blank" rel="noreferrer">
            Source
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
