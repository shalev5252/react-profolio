import getImageUrl from "../../utils";
import styles from "./Hero.module.css";
import user from "../../data/user.json";

import { Fragment } from "react";
const Hero = () => {
  const descriptionWithLineBreaks = user.description
    .split("\n")
    .map((line, index) => (
      <Fragment key={index}>
        {line}
        <br />
      </Fragment>
    ));

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{"Hi , I'm " + user.firstName}</h1>
        <p className={styles.description}>{descriptionWithLineBreaks}</p>
        <a href={"mailto:" + user.email} className={styles.contactBtn}>
          Contact Me
        </a>
      </div>
      <img
        src={user.heroImageUrl ? user.heroImage : getImageUrl(user.heroImage)}
        alt="Hero Image of me"
        className={styles.heroImg}
      ></img>
      <div className={styles.topBlur}></div>
      <div className={styles.bottomBlur}></div>
    </section>
  );
};

export default Hero;
