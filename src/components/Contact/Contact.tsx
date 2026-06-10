import styles from "./Contact.module.css";
import user from "../../data/user.json";
import useScrollReveal from "../../hooks/useScrollReveal";
import { MouseEvent } from "react";

const Contact = () => {
  const sectionRef = useScrollReveal<HTMLElement>();

  const handleLinkClick = (event: MouseEvent, link: string) => {
    if (link === "none") {
      event.preventDefault();
    }
  };

  const icons: Record<string, JSX.Element> = {
    email: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    linkedin: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    github: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
    phone: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  };

  const iconKeys = ["email", "linkedin", "github", "phone"];

  return (
    <footer id="contact" className={styles.container} ref={sectionRef}>
      <div className={styles.inner}>
        <div className={`${styles.left} reveal-left`}>
          <span className="sectionLabel">Get In Touch</span>
          <h2 className={styles.heading}>Let's Connect</h2>
          <p className={styles.subtext}>
            I'm currently open to new opportunities. Whether you have a question
            or just want to say hi, feel free to reach out!
          </p>
        </div>

        <ul className={`${styles.links} reveal-right`}>
          {user.contact.map((item, id) => (
            <li key={id} className={styles.linkItem}>
              <a
                href={item.contactMethodLink}
                onClick={(event) => handleLinkClick(event, item.contactMethodLink)}
                target={item.contactMethodLink !== "none" ? "_blank" : undefined}
                rel="noreferrer"
                className={styles.linkAnchor}
              >
                <span className={styles.iconWrap}>
                  {icons[iconKeys[id]] || icons.email}
                </span>
                <span className={styles.linkText}>{item.contactMethodText}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.copyright}>
        <p>© {new Date().getFullYear()} {user.firstName} {user.lastName}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Contact;
