import { useState, useEffect } from 'react';
import styles from './LoadingScreen.module.css';

interface Props {
  onFinished: () => void;
}

const LoadingScreen = ({ onFinished }: Props) => {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');

  useEffect(() => {
    const enterTimer = setTimeout(() => setPhase('hold'), 100);
    const holdTimer = setTimeout(() => setPhase('exit'), 1400);
    const exitTimer = setTimeout(() => onFinished(), 2200);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
    };
  }, [onFinished]);

  return (
    <div className={`${styles.overlay} ${styles[phase]}`}>
      <div className={styles.content}>
        <div className={styles.logoMark}>
          <span className={styles.letter}>S</span>
          <span className={styles.dot}>.</span>
        </div>
        <div className={styles.loadingBar}>
          <div className={styles.loadingFill}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
