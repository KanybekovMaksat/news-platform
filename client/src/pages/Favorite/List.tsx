import React from 'react';

import {useTypedDispatch} from "../../helpers/hooks/useTypedRedux";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {NewsType} from "../../types/type";
import NewsCard from "../../components/NewsCard";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
function List() {
    const dispatch = useTypedDispatch();

    const favorites = useSelector((state:RootState) => state.favorites.favorites)
    return (
        <div className="container">
            <h1 className="page_title">Избранные новости</h1>
            {favorites.map((data:NewsType, idx:number) => <NewsCard key={idx} data={data} />)}
        </div>
    );
}

export default List;