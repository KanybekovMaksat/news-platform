import React, { useEffect, useState } from 'react';
import {
  useTypedDispatch,
  useTypedSelector,
} from '../../helpers/hooks/useTypedRedux';
import { selectAuth, setUser } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import List from './components/List';
import styles from './index.module.scss';
const initialState = {
  _id: '',
  name: '',
  last_name: '',
  username: '',
  photo: '',
};
const Personal = () => {
  const dispatch = useTypedDispatch();
  const { id, name, last_name, username, photo } = useTypedSelector(selectAuth);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [formValue, setFormValue] = useState({ id, name, last_name, username });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  const navigate = useNavigate();

  return (
    <div className="container">
      <Header />
      <div className={styles.personal_info}>
        <div className="personal_info_avatatr">
          <img className={styles.personal__avatar_img} src={photo} alt="llkl" />
          <div className={styles.personal__photo}>
            <div className={styles.personal__box_content}>
              <input
                type="text"
                id="photo"
                placeholder="Ссылка на фото профиля"
              />
            </div>
            <input
              className={styles.personal__btn}
              type="submit"
              value="Сохранить"
            />
          </div>
        </div>
        <div className={styles.personal_info_box}>
          <div className={styles.personal__box_content}>
            <label htmlFor="last_name">Фамилия</label>
            <input
              id="last_name"
              type="text"
              value={formValue.last_name || ''}
            />
          </div>
          <div className={styles.personal__box_content}>
            <label htmlFor="name">Имя</label>
            <input id="name" type="text" value={formValue.name || ''} />
          </div>
          <div className={styles.personal__box_content}>
            <label htmlFor="username">Никнейм</label>
            <input type="text" id="username" value={formValue.username || ''} />
          </div>
          <button type="submit" className={styles.submit_button}>
            Сохранить
          </button>
        </div>
      </div>
      <List />
    </div>
  );
};
export default Personal;
