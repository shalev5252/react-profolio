import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import projects from "../../data/projects.json";
import getImageUrl from "../../utils";
import { ArrowLeft, ArrowRightCircle, ArrowLeftCircle } from "react-feather";
import { marked } from "marked";   // ✅ ADD THIS
import styles from "./ProjectDetails.module.css";

const textModules = import.meta.glob("../../data/descriptions/*.txt", {
  query: "?raw",
  import: "default",
});

interface Project {
  title: string;
  imageSrc: string;
  imageSrcUrl: boolean;
  description: string;
  detailedDescription?: string;
  skills: string[];
  demo: string;
  source: string;
  app: boolean;
  media?: string[];
}

const ProjectDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [description, setDescription] = useState<string>("");
  const [mediaIndex, setMediaIndex] = useState<number>(0);

  useEffect(() => {
    const hash = location.hash.replace("#", "").toLowerCase();
    const found = projects.find(
      (p) => p.title.toLowerCase().replace(/\s+/g, "-") === hash
    );
    setProject(found || null);
    setMediaIndex(0);
  }, [location]);

  useEffect(() => {
    const loadDescription = async () => {
      if (!project) return;

      const desc = project.detailedDescription || project.description;

      if (typeof desc === "string" && desc.endsWith(".txt")) {
        const relativePath = `../../${desc}`;
        const loader = textModules[relativePath];

        if (loader) {
          try {
            const text = (await loader()) as string;

            // ✅ Convert Markdown → HTML
            const html = await marked.parse(text);
            setDescription(html);

          } catch {
            setDescription("⚠️ Failed to load description file.");
          }
        } else {
          setDescription(project.description);
        }
      } else {
        // ALSO convert inline description markdown
        setDescription(await marked(desc || "No description available."));
      }
    };

    loadDescription();
  }, [project]);

  if (!project) return <div className={styles.notFound}>Project not found</div>;

  const mediaList = project.media?.filter(Boolean) ?? [];
  const hasMedia = mediaList.length > 0;
  const currentMedia = hasMedia ? mediaList[mediaIndex] : "";

  const handlePrev = () =>
    setMediaIndex((i) => (i - 1 + mediaList.length) % mediaList.length);
  const handleNext = () =>
    setMediaIndex((i) => (i + 1) % mediaList.length);

  const isYouTube =
    currentMedia.includes("youtube.com") || currentMedia.includes("youtu.be");
  const isGif = currentMedia.endsWith(".gif");
  const isVideo = currentMedia.endsWith(".mp4") || isYouTube;
  const isImage = !isVideo && !isGif && currentMedia !== "";

  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes("embed")) return url;

    let videoId = url;
    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    }

    return `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`;
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate("/")}>
          <ArrowLeft size={22} />
          <span>Back</span>
        </button>
        <h1 className={styles.title}>{project.title}</h1>
        <div className={styles.headerSpacer}></div>
      </div>

      <div className={styles.logoContainer}>
        <img
          src={project.imageSrcUrl ? project.imageSrc : getImageUrl(project.imageSrc)}
          alt={project.title}
          className={styles.logo}
        />
      </div>

      <div className={styles.mainContent}>
        <div
          className={`${styles.appLayout} ${
            !hasMedia ? styles.fullDescriptionLayout : ""
          }`}
        >

          {/* === MEDIA === */}
          {hasMedia && (
            <div className={styles.phoneMockup}>
              {(isImage || isGif) && (
                <img
                  key={currentMedia}
                  src={
                    currentMedia.startsWith("http")
                      ? currentMedia
                      : getImageUrl(currentMedia)
                  }
                  alt="Project media"
                  className={styles.demoVideo}
                />
              )}

              {isVideo && !isYouTube && (
                <video controls className={styles.demoVideo}>
                  <source src={currentMedia} type="video/mp4" />
                </video>
              )}

              {isYouTube && (
                <iframe
                  src={getYouTubeEmbedUrl(currentMedia)}
                  className={styles.demoVideo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube video"
                />
              )}

              {mediaList.length > 1 && (
                <>
                  <button className={styles.arrowLeft} onClick={handlePrev}>
                    <ArrowLeftCircle size={32} />
                  </button>
                  <button className={styles.arrowRight} onClick={handleNext}>
                    <ArrowRightCircle size={32} />
                  </button>
                </>
              )}
            </div>
          )}

          {/* === DESCRIPTION + SKILLS === */}
          <div
            className={`${styles.appInfo} ${
              !hasMedia ? styles.fullWidthDescription : ""
            }`}
          >
            <div className={styles.descriptionScroll}>
              {/* ✅ Markdown-rendered description */}
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>

            <div className={styles.skillsContainer}>
              <h3>Technologies</h3>
              <ul className={styles.skills}>
                {project.skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className={styles.links}>
              {project.demo !== "none" && (
                <a href={project.demo} target="_blank" rel="noreferrer">
                  Demo
                </a>
              )}
              <a href={project.source} target="_blank" rel="noreferrer">
                Source
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
