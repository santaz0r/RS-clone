import React from 'react';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import authService from '../services/authService';
import { AppDispatch, RootState } from './createStore';
import localStorageService from '../services/localStorageService';

type TregisterData = {
  username: string;
  name: string;
  password: string;
  mail: string;
};

type TAuthProps = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: { username: string; password: string };
};

const initialState = localStorageService.hasUser()
  ? {
      error: '',
      auth: { userId: localStorageService.getUserId().id, role: localStorageService.getUserId().role },
      isLoggedIn: true,
    }
  : {
      error: '',
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
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    authRequested: (state) => {
      state.error = '';
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.auth = null;
    },
  },
});

const { reducer: usersReducer, actions } = userSlice;
const { authRequestSuccess, userLoggedOut, authRequestFailed, authRequested } = actions;

export const login =
  ({ data, setModal }: TAuthProps) =>
  async (dispatch: AppDispatch) => {
    const { username, password } = data;
    dispatch(authRequested());
    try {
      const { content } = await authService.login({ username, password });
      localStorageService.setUser(content);
      dispatch(authRequestSuccess({ userId: content.id, role: content.role }));
      setModal(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message: string = error.response?.data;
        dispatch(authRequestFailed(message));
      }
    }
  };

export const signUp = (payload: TregisterData, setModal: TAuthProps['setModal']) => async (dispatch: AppDispatch) => {
  dispatch(authRequested());
  const { username, password } = payload;
  try {
    await authService.registerClient(payload);
    const { content } = await authService.login({ username, password });
    localStorageService.setUser(content);
    dispatch(authRequestSuccess({ userId: content.id, role: content.role }));
    setModal(false);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message: string = error.response?.data;
      dispatch(authRequestFailed(message));
    }
  }
};
export const logOut = () => async (dispatch: AppDispatch) => {
  localStorageService.removeAuth();
  dispatch(userLoggedOut());
};

export const getCurrentUserData = () => (state: RootState) => ({
  id: state.users.auth?.userId,
  role: state.users.auth?.role,
});

export const getIsLogin = () => (state: RootState) => state.users.isLoggedIn;
export const getAuthErrors = () => (state: RootState) => state.users.error;
export default usersReducer;
