import getImageUrl from "../../utils";
import styles from "./Contact.module.css";
import user from "../../data/user.json";
import { MouseEvent } from "react";
const Contact = () => {
  const handleLinkClick = (event: MouseEvent, link: string) => {
    if (link === "none") {
      event.preventDefault(); // Prevent the default action (navigation)
    }
  };

  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.text}>
        <h2>Contact</h2>
        <p>Feel free to reach out</p>
      </div>
      <ul className={styles.links}>
        {user.contact.map((contactItem, id) => {
          return (
            <li key={id} className={styles.link}>
              <img
                src={
                  contactItem.contactMethodIconUrl
                    ? contactItem.contactMethodIcon
                    : getImageUrl(contactItem.contactMethodIcon)
                }
                alt={contactItem.contactMethodAlt}
              />
              <div>
                <a
                  href={contactItem.contactMethodLink}
                  onClick={(event) =>
                    handleLinkClick(event, contactItem.contactMethodLink)
                  }
                  target="_blank"
                >
                  {contactItem.contactMethodText}
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

export default Contact;
