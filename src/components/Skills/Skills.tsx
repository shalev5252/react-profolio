import styles from "./Skills.module.css";
import user from "../../data/user.json";
import useScrollReveal from "../../hooks/useScrollReveal";

const Skills = () => {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section className={styles.container} id="skills" ref={sectionRef}>
      <div className="reveal">
        <span className="sectionLabel">What I Bring</span>
        <h2 className="sectionTitle">Skills & Languages</h2>
      </div>

      <div className={styles.content}>
        <div className={`${styles.column} reveal-left`}>
          <h3 className={styles.columnTitle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            Soft Skills
          </h3>
          <div className={styles.pills}>
            {user.skills.map((skill, id) => (
              <span key={id} className={styles.pill}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className={`${styles.column} reveal-right`}>
          <h3 className={styles.columnTitle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            Languages
          </h3>
          <div className={styles.pills}>
            {user.languages.map((language, id) => (
              <span key={id} className={styles.pill}>
                {language}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
