import styles from '../index.module.scss';
import { useEffect, useState } from 'react';
const CommentView = ({ text, created, userId }) => {
  const formattedDate = new Date(created).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const [user, setUser] = useState([]);
  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/${userId}`);
      const data = await response.json();
      setUser(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <div className={styles.comment__view}>
      <img src={user.photo} alt="" />
      <h3>{user.username}</h3>
      <p>{text}</p>
      <p>{formattedDate.split('/').join('.')}</p>
    </div>
  );
};

export default CommentView;
