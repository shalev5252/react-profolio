import styles from "./ScrollingImage.module.css"; // Import CSS module for styling
import getImageUrl from "../../utils";

const ScrollingImage = () => {
  return (
    <div className={styles.imageContainer}>
      <img
        src={getImageUrl("hero/heroImage.png")}
        alt="Scrolling Image"
        className={styles.image}
      />
    </div>
  );
};

export default ScrollingImage;
