import skills from "../../data/skills.json";
import history from "../../data/history.json";
import getImageUrl from "../../utils";
import styles from "./Experience.module.css";
import volenteering from "../../data/volenteering.json";
import useScrollReveal from "../../hooks/useScrollReveal";

const Experience = () => {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section className={styles.container} id="experience" ref={sectionRef}>
      <div className="reveal">
        <span className="sectionLabel">My Background</span>
        <h2 className="sectionTitle">Experience & Skills</h2>
      </div>

      {/* ─── Technical Skills Grid ─── */}
      <div className={`${styles.techSkills} reveal`}>
        <h3 className={styles.subTitle}>Technical Skills</h3>
        <div className={styles.skillGrid}>
          {skills.map((skill, id) => (
            <div key={id} className={styles.skillCard}>
              <div className={styles.skillIconWrap}>
                <img
                  src={
                    skill.imageSrcUrl
                      ? skill.imageSrc
                      : getImageUrl(skill.imageSrc)
                  }
                  alt={skill.title}
                />
              </div>
              <span className={styles.skillLabel}>{skill.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Work Experience Timeline ─── */}
      <div className={`${styles.timelineSection} reveal`}>
        <h3 className={styles.subTitle}>Work Experience</h3>
        <div className={styles.timeline}>
          {history.map((item, id) => (
            <div key={id} className={`${styles.timelineItem} reveal delay-${Math.min(id + 1, 5)}`}>
              <div className={styles.timelineDot}>
                <div className={styles.dotInner}></div>
              </div>
              <div className={styles.timelineCard}>
                <div className={styles.cardHeader}>
                  <img
                    src={
                      item.imageSrcUrl
                        ? item.imageSrc
                        : getImageUrl(item.imageSrc)
                    }
                    alt={`${item.organisation} Logo`}
                    className={styles.orgLogo}
                  />
                  <div>
                    <h4 className={styles.cardRole}>{item.role}</h4>
                    <p className={styles.cardOrg}>{item.organisation}</p>
                  </div>
                </div>
                <span className={styles.cardDate}>
                  {item.startDate} — {item.endDate}
                </span>
                <ul className={styles.cardExperiences}>
                  {item.experiences.map((exp, expId) => (
                    <li key={expId}>{exp}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Volunteering Timeline ─── */}
      <div className={`${styles.timelineSection} reveal`}>
        <h3 className={styles.subTitle}>Volunteering</h3>
        <div className={styles.timeline}>
          {volenteering.map((item, id) => (
            <div key={id} className={`${styles.timelineItem} reveal delay-${Math.min(id + 1, 5)}`}>
              <div className={styles.timelineDot}>
                <div className={styles.dotInner}></div>
              </div>
              <div className={styles.timelineCard}>
                <div className={styles.cardHeader}>
                  <img
                    src={
                      item.imageSrcUrl
                        ? item.imageSrc
                        : getImageUrl(item.imageSrc)
                    }
                    alt={`${item.organisation} Logo`}
                    className={styles.orgLogo}
                  />
                  <div>
                    <h4 className={styles.cardRole}>{item.role}</h4>
                    <p className={styles.cardOrg}>{item.organisation}</p>
                  </div>
                </div>
                <span className={styles.cardDate}>
                  {item.startDate} — {item.endDate}
                </span>
                <ul className={styles.cardExperiences}>
                  {item.experiences.map((exp, expId) => (
                    <li key={expId}>{exp}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
