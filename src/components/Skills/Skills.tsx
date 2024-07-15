import styles from "./Skills.module.css";
import user from "../../data/user.json";

const Skills = () => {
  return (
    <section className={styles.container} id="skills">
      <div className={styles.content}>
        <div className={styles.innerContent}>
          <h2 className={styles.title}>Skills</h2>
          <ul className={styles.items}>
            {user.skills.map((skill, id) => {
              return (
                <li key={id} className={styles.item}>
                  <div className={styles.itemText}>
                    <h3>{skill}</h3>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.innerContent}>
          <h2 className={styles.title}>Languages</h2>

          <ul className={styles.items}>
            {user.languages.map((language, id) => {
              return (
                <li key={id} className={styles.item}>
                  <div className={styles.itemText}>
                    <h3>{language}</h3>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Skills;
