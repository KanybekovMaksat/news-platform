// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from '../store';

// export interface AuthState {
//   id: string | null;
//   name: string | null;
//   last_name: string | null;
//   username: string | null;
//   photo: string | '';
//   accessToken: string | null;
// }

// const initialState: AuthState = {
//   id: null,
//   name: null,
//   last_name: null,
//   username: null,
//   photo: '',
//   accessToken: null,
// };

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<AuthState>) => {
//       localStorage.setItem(
//         'user',
//         JSON.stringify({
//           id: action.payload.id,
//           name: action.payload.name,
//           last_name: action.payload.last_name,
//           username: action.payload.username,
//           photo: action.payload.photo,
//           accessToken: action.payload.accessToken,
//         })
//       );
//       state.id = action.payload.id;
//       state.name = action.payload.name;
//       state.last_name = action.payload.last_name;
//       state.username = action.payload.username;
//       state.photo = action.payload.photo;
//       state.accessToken = action.payload.accessToken;
//     },
//     logout: (state) => {
//       localStorage.removeItem('user');
//       state.id = null;
//       state.name = null;
//       state.last_name = null;
//       state.username = null;
//       state.photo = '';
//       state.accessToken = null;
//     },
//   },
// });

// export const selectAuth = (state: RootState) => state.auth;

// export const { setUser, logout } = authSlice.actions;

// export default authSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface AuthState {
  id: string | null;
  name: string | null;
  last_name: string | null;
  username: string | null;
  photo: string | '';
  accessToken: string | null;
}

const initialState: AuthState = {
  id: null,
  name: null,
  last_name: null,
  username: null,
  photo: '',
  accessToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      const { id, name, last_name, username, photo, accessToken } =
        action.payload;
      localStorage.setItem(
        'user',
        JSON.stringify({
          id,
          name,
          last_name,
          username,
          photo,
          accessToken,
        })
      );
      return {
        ...state,
        ...action.payload,
      };
    },
    logout: (state) => {
      localStorage.removeItem('user');
      return {
        ...initialState,
      };
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
