import styles from "./About.module.css";
import getImageUrl from "../../utils";
import user from "../../data/user.json";
import useScrollReveal from "../../hooks/useScrollReveal";

const About = () => {
  const sectionRef = useScrollReveal<HTMLElement>();

  const stats = user.stats ? [
    { value: user.stats.yearsExperience, label: "Years Experience" },
    { value: user.stats.projectsBuilt, label: "Projects Built" },
    { value: user.stats.technologies, label: "Technologies" },
    { value: user.stats.languagesSpoken, label: "Languages" },
  ] : null;

  return (
    <section className={styles.container} id="about" ref={sectionRef}>
      <div className="reveal">
        <span className="sectionLabel">About Me</span>
        <h2 className="sectionTitle">Get to Know Me</h2>
      </div>

      <div className={styles.content}>
        <div className={`${styles.imageCol} reveal-left`}>
          <div className={styles.imageFrame}>
            <img
              src={
                user.aboutImageUrl ? user.aboutImage : getImageUrl(user.aboutImage)
              }
              alt="Shalev Shasha"
              className={styles.aboutImage}
            />
          </div>
        </div>

        <div className={`${styles.infoCol} reveal-right`}>
          <p className={styles.bio}>{user.description}</p>

          <ul className={styles.highlights}>
            {user.aboutSkills.map((item, id) => (
              <li key={id} className={styles.highlightCard}>
                <div className={styles.highlightIcon}>
                  <img
                    src={
                      item.skillImageUrl
                        ? item.skillImage
                        : getImageUrl(item.skillImage)
                    }
                    alt={item.skillImageAlt}
                  />
                </div>
                <div>
                  <h3 className={styles.highlightTitle}>{item.title}</h3>
                  <p className={styles.highlightDesc}>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {stats && (
        <div className={`${styles.statsRow} reveal`}>
          {stats.map((stat, i) => (
            <div key={i} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default About;
