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
  };
}

function ProjectCard(project: Props) {
  return (
    <div className={styles.container}>
      <img
        src={
          project.project.imageSrcUrl
            ? project.project.imageSrc
            : getImageUrl(project.project.imageSrc)
        }
        alt={"Image of " + project.project.title}
        className={styles.image}
      ></img>
      <h3 className={styles.title}>{project.project.title}</h3>
      <div className={styles.descriptionContainer}>
        <p className={styles.description}>{project.project.description}</p>
      </div>
      <div className={styles.skillsContainer}>
        <ul className={styles.skills}>
          {project.project.skills.map((skill, id) => {
            return (
              <li key={id} className={styles.skill}>
                {skill}
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.links}>
        {project.project.demo != "none" ? (
          <div>
            <a
              href={project.project.demo}
              className={styles.link}
              target="_blank"
            >
              Demo
            </a>
          </div>
        ) : null}
        <a
          href={project.project.source}
          className={styles.link}
          target="_blank"
        >
          Source
        </a>
      </div>
    </div>
  );
}

export default ProjectCard;
