import styles from "./index.module.scss";
import LogoImg from "../../assets/images/logo-light.svg";
import {Link} from "react-router-dom";
function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footer__content}>
                    <div className={styles.footer__content_logo}>
                        <img src={LogoImg} alt="" className={styles.footer__logo_img}/>
                  </div>
                    <nav className={styles.footer__content_nav}>
                        <Link to="/personal" className={styles.footer__nav_link}>Мой профиль</Link>
                        <Link to="/favorite" className={styles.footer__nav_link}>Избранные новости</Link>
                    </nav>
                    <div className={styles.footer__content_copy}>
                      <p>© {new Date().getFullYear() },</p>
                        <a target="_blank" href="https://www.linkedin.com/in/maksat-kanybekov-7b9881272/" className={styles.footer__copy_link}>Maksat Kanybekov </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;