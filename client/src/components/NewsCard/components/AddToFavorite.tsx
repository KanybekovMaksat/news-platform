import React, {FC, useState} from 'react';
import styles from "../index.module.scss";

import {NewsType} from "../../../types/type";
import {useSelector} from "react-redux";
import { RootState } from '../../../redux/store';
import HeartImg from "../../../assets/images/heart.svg"
import HeartActiveImg from "../../../assets/images/heart-active.svg";
import {useTypedDispatch} from "../../../helpers/hooks/useTypedRedux";
import {toggleFavorite} from "../../../redux/slices/favoriteSlice";
const  AddToFavorite:FC<NewsType> = (data:NewsType)  =>{
    const [isLike, setIsLike] = useState(true)
    const dispatch = useTypedDispatch();
    const toggleOfFavorite = () => {
        dispatch(toggleFavorite(data))
        setIsLike(!isLike)
    }
    const favorites = useSelector((state:RootState) => state.favorites.favorites)
    const isFavorite = favorites.some((item) => item._id === data._id);
    return (
        <button onClick={() => toggleOfFavorite()} className={styles.card__like}>
            <img src={isFavorite ? HeartActiveImg : HeartImg} alt=""/>
        </button>
    );
}

export default AddToFavorite;