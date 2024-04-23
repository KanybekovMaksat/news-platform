import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NewsType} from "../../types/type";

type FavoriteList = {
    favorites: NewsType[];
}
const initialState:FavoriteList = {
    favorites: [],
}


export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers:{
        toggleFavorite: (state, action: PayloadAction<NewsType>) => {
            const idx = state.favorites.findIndex(
                (product) => product._id === action.payload._id
            );
            idx === -1
                ? state.favorites.push(action.payload)
                : state.favorites.splice(idx, 1);
        },
    }
})

export const { toggleFavorite} = favoriteSlice.actions;

export default favoriteSlice.reducer;
