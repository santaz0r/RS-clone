import { createAction, createSlice } from '@reduxjs/toolkit';
import authService from '../services/authService';
import { AppDispatch, RootState } from './createStore';
import localStorageService from '../services/localStorageService';

type TregisterData = {
  username: string;
  name: string;
  password: string;
  mail: string;
};

const initialState = localStorageService.hasUser()
  ? {
      error: null,
      auth: { userId: localStorageService.getUserId().id, role: localStorageService.getUserId().role },
      isLoggedIn: true,
    }
  : {
      error: null,
      auth: null,
      isLoggedIn: false,
    };

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.auth = null;
    },
  },
});

const { reducer: usersReducer, actions } = userSlice;
const { authRequestSuccess, userLoggedOut } = actions;
const authRequested = createAction('users/authRequested');

export const login = (data: { username: string; password: string }) => async (dispatch: AppDispatch) => {
  const { username, password } = data;
  dispatch(authRequested());
  try {
    const { content } = await authService.login({ username, password });
    console.log(content);
    localStorageService.setUser(content);
    dispatch(authRequestSuccess({ userId: content.id, role: content.role }));
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (payload: TregisterData) => async (dispatch: AppDispatch) => {
  dispatch(authRequested());
  const { username, password } = payload;
  try {
    await authService.registerClient(payload);
    const { content } = await authService.login({ username, password });
    localStorageService.setUser(content);
    dispatch(authRequestSuccess({ userId: content.id, role: content.role }));
  } catch (error) {
    console.log(error);
  }
};
export const logOut = () => (dispatch: AppDispatch) => {
  localStorageService.removeAuth();
  dispatch(userLoggedOut());
};

export const getCurrentUserData = () => (state: RootState) => ({
  id: state.users.auth?.userId,
  role: state.users.auth?.role,
});

export default usersReducer;
