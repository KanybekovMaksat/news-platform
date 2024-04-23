import React, {FC} from 'react';
import styles from "./index.module.scss";
import {NewsType} from "../../types/type";
import AddToFavorite from "./components/AddToFavorite";
import ShareImg from "../../assets/images/share.svg";
import {Link} from "react-router-dom";
import RemoveNews from "./components/RemoveNews";

interface CardPropsInterface {
    data: NewsType,
    btn?: boolean
}
const NewsCard:FC<CardPropsInterface> = ({data, btn}) => {
    const { title, description, photo, _id} = data;


    return (
        <div className={styles.card}>
            <div className={styles.card__img_cover}>
                <div className={styles.card__image_box}>
                    <Link to={`/news/${_id}`}>
                        <img src={photo} alt={title} className={styles.card__img}/>
                        </Link>
                </div>
            </div>

            <div className={styles.card__info}>
                <p className={styles.card__info_date}> 29.11.2022</p>
                <h3 className={styles.card__info_title}>{title}</h3>
                <p className={styles.card__info_text}>{description}</p>
                <Link  to={`/news/${_id}`} className={styles.card__info_link}>Читать дальше </Link>
                <div className={styles.card__info_share}>
                    <img src={ShareImg} alt=""/>
                </div>
            </div>
            {btn ? (<RemoveNews id={_id as string}/>) : (<AddToFavorite {...data}/>) }

        </div>
    );
}

export default NewsCard;