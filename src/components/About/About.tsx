import styles from "./About.module.css";
import getImageUrl from "../../utils";
import user from "../../data/user.json";

const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About</h2>
      <div className={styles.content}>
        <img
          src={
            user.aboutImageUrl ? user.aboutImage : getImageUrl(user.aboutImage)
          }
          alt="me sitting with a laptop"
          className={styles.aboutImage}
        />
        <ul className={styles.aboutItems}>
          {user.aboutSkills.map((aboutItem, id) => {
            return (
              <li key={id} className={styles.aboutItem}>
                <img
                  src={
                    aboutItem.skillImageUrl
                      ? aboutItem.skillImage
                      : getImageUrl(aboutItem.skillImage)
                  }
                  alt={aboutItem.skillImageAlt}
                />
                <div className={styles.aboutItemText}>
                  <h3>{aboutItem.title}</h3>
                  <p>{aboutItem.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default About;
