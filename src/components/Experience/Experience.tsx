import skills from "../../data/skills.json";
import history from "../../data/history.json";
import getImageUrl from "../../utils";
import styles from "./Experience.module.css";
import volenteering from "../../data/volenteering.json";

const Experience = () => {
  return (
    <section className={styles.container} id="experience">
      <h2 className={styles.title}>Experience</h2>
      <div className={styles.content}>
        <div className={styles.skills}>
          {skills.map((skill, id) => {
            return (
              <div key={id} className={styles.skill}>
                <div className={styles.skillImageContainer}>
                  <img
                    src={
                      skill.imageSrcUrl
                        ? skill.imageSrc
                        : getImageUrl(skill.imageSrc)
                    }
                    alt={skill.title}
                  />
                </div>
                <p>{skill.title}</p>
              </div>
            );
          })}
        </div>
        <ul className={styles.history}>
          <h1>work experience</h1>
          {history.map((historyItem, id) => {
            return (
              <li key={id} className={styles.historyItem}>
                <img
                  src={
                    historyItem.imageSrcUrl
                      ? historyItem.imageSrc
                      : getImageUrl(historyItem.imageSrc)
                  }
                  alt={`${historyItem.organisation} Logo`}
                />
                <div className={styles.historyItemDetails}>
                  <h3>{`${historyItem.role}, ${historyItem.organisation}`}</h3>
                  <p>{`${historyItem.startDate} - ${historyItem.endDate}`}</p>
                  <ul>
                    {historyItem.experiences.map((experience, id) => {
                      return <li key={id}>{experience}</li>;
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
          <h1>volunteering work</h1>
          {volenteering.map((VolenteeringItem, id) => {
            return (
              <li key={id} className={styles.historyItem}>
                <img
                  src={
                    VolenteeringItem.imageSrcUrl
                      ? VolenteeringItem.imageSrc
                      : getImageUrl(VolenteeringItem.imageSrc)
                  }
                  alt={`${VolenteeringItem.organisation} Logo`}
                />
                <div className={styles.historyItemDetails}>
                  <h3>{`${VolenteeringItem.role}, ${VolenteeringItem.organisation}`}</h3>
                  <p>{`${VolenteeringItem.startDate} - ${VolenteeringItem.endDate}`}</p>
                  <ul>
                    {VolenteeringItem.experiences.map((experience, id) => {
                      return <li key={id}>{experience}</li>;
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Experience;
