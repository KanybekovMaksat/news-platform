import  {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatcher, RootState} from "../../redux/store";

export const useTypedDispatch = () => useDispatch<AppDispatcher>();
export const useTypedSelector:TypedUseSelectorHook<RootState> =useSelector;