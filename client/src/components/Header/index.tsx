import React from 'react';
import styles from './index.module.scss';
import LogoImg from '../../assets/images/logo.svg';
import SearchImg from '../../assets/images/search.svg';
import UserImg from '../../assets/images/user.svg';
import MenuImg from '../../assets/images/menu.svg';
import Menu from '../Menu';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../helpers/hooks/useTypedRedux';
import { selectAuth } from '../../redux/slices/authSlice';
import { useState } from 'react';

interface HeaderPropsInterface {
  onSearch?: (query: string) => void;
}
const Header: React.FC<HeaderPropsInterface> = ({ onSearch }) => {
  const { photo } = useTypedSelector(selectAuth);
  const [search, setSearch] = useState('');
  const avatar = photo !== '' ? photo : UserImg;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.header__content}>
          <Link to="/" className={styles.header__content_logo}>
            <img
              src={LogoImg}
              alt="megalab"
              className={styles.header__logo_img}
            />
          </Link>
          <nav className={styles.header__content_nav}>
            <div className={styles.header__search_block}>
              <input
                value={search}
                onChange={handleInputChange}
                type="text"
                id="search"
                placeholder="Поиск"
              />
              <button className={styles.header__nav_search}>
                <img
                  src={SearchImg}
                  alt="search"
                  className={styles.header__search_icon}
                />
              </button>
            </div>
            <Menu select={false} icon={avatar} />
            <Menu select={true} icon={MenuImg} />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
