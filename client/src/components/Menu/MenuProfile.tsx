import React from 'react';
import styles from './Menu.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useTypedDispatch } from '../../helpers/hooks/useTypedRedux';
import { logout } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';
function MenuProfile() {
  const redirect = useNavigate();
  const dispatch = useTypedDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Вы успешно вышли!');
    redirect('/auth');
  };

  return (
    <div className={styles.menu__window_wrapper}>
      <Link to="/personal" className={styles.window__wrapper_link}>
        Мой профиль
      </Link>
      <button
        onClick={() => handleLogout()}
        className={styles.window__wrapper_btn}
      >
        Выйти
      </button>
    </div>
  );
}

export default MenuProfile;
