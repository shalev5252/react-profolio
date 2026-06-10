import projects from "../../data/projects.json";
import ProjectCard from "./ProjectCard";
import styles from "./Projects.module.css";
import useScrollReveal from "../../hooks/useScrollReveal";

const Projects = () => {
  const sectionRef = useScrollReveal<HTMLElement>();
  const featured = projects.find((p: any) => p.featured);
  const others = projects.filter((p: any) => !p.featured);

  return (
    <section id="projects" className={styles.container} ref={sectionRef}>
      <div className="reveal">
        <span className="sectionLabel">My Work</span>
        <h2 className="sectionTitle">Featured Projects</h2>
      </div>

      {/* Featured Project */}
      {featured && (
        <div className={`${styles.featured} reveal`}>
          <ProjectCard project={featured} featured />
        </div>
      )}

      {/* Other Projects */}
      <div className={styles.grid}>
        {others.map((project, id) => (
          <div key={id} className={`reveal delay-${Math.min(id + 1, 5)}`}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
