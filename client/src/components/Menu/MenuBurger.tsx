import React, {FC} from 'react';
import styles from "./Menu.module.scss";
import {Link} from "react-router-dom";




export const MenuBurger = ()  => {
    return (
        <Link to="/favorite" className={styles.menu__window_link}>Избранные новости</Link>
    );
}
