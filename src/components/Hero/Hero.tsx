import { useState, useEffect } from "react";
import getImageUrl from "../../utils";
import styles from "./Hero.module.css";
import user from "../../data/user.json";
import useScrollReveal from "../../hooks/useScrollReveal";

const Hero = () => {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const sectionRef = useScrollReveal<HTMLElement>();

  useEffect(() => {
    const currentTagline = user.taglines[taglineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText.length < currentTagline.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentTagline.slice(0, displayText.length + 1));
      }, 80);
    } else if (!isDeleting && displayText.length === currentTagline.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, 40);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setTaglineIndex((prev) => (prev + 1) % user.taglines.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, taglineIndex]);

  return (
    <section className={styles.container} ref={sectionRef}>
      <div className={`${styles.content} reveal`}>
        {user.openToWork && (
          <div className={`${styles.statusBadge} reveal delay-1`}>
            <span className={styles.statusDot}></span>
            Open to opportunities
          </div>
        )}

        <h1 className={styles.greeting}>
          Hi, I'm <span className={styles.name}>{user.firstName}</span>
        </h1>

        <div className={styles.taglineWrapper}>
          <span className={styles.tagline}>
            {displayText}
            <span className={styles.cursor}>|</span>
          </span>
        </div>

        <p className={styles.description}>{user.description}</p>

        <div className={styles.ctas}>
          <a href={"mailto:" + user.email} className={styles.ctaPrimary}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Contact Me
          </a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className={styles.ctaSecondary}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download CV
          </a>
        </div>
      </div>

      <div className={`${styles.imageWrapper} reveal delay-2`}>
        <div className={styles.imageBorder}>
          <img
            src={user.heroImageUrl ? user.heroImage : getImageUrl(user.heroImage)}
            alt="Shalev Shasha"
            className={styles.heroImg}
          />
        </div>
        <div className={styles.glowOrb}></div>
      </div>
    </section>
  );
};

export default Hero;
