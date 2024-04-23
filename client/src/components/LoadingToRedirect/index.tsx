import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const LoadingToRedirect = () => {
  const [count, setCount] = useState(1);
  const redirect = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);
    count === 0 && redirect('/auth');
    return () => clearInterval(interval);
  }, [count, redirect]);

  return (
    <div className={styles.loading_content}>
      <div className={styles.loading_content__box}>
        <p className={styles.loading_box__text}>
          Redirecting you in {count} sec
        </p>
      </div>
    </div>
  );
};
export default LoadingToRedirect;
