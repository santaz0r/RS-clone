import { createSlice } from '@reduxjs/toolkit';
import { TSession } from '../types/types';
import sessionsService from '../services/sessionsService';
import { AppDispatch, RootState } from './createStore';

type TSessionsState = {
  entities: TSession[];
  isLoading: boolean;
};

const initialState: TSessionsState = {
  entities: [],
  isLoading: true,
};

const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    sessionsRequested: (state) => {
      state.isLoading = true;
    },
    sessionsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
  },
});
const { actions, reducer: sessionsReducer } = sessionsSlice;
const { sessionsRequested, sessionsReceived } = actions;

export const loadSessionsList = () => async (dispatch: AppDispatch) => {
  dispatch(sessionsRequested());
  try {
    const { content } = await sessionsService.getAll();
    dispatch(sessionsReceived(content));
  } catch (error) {
    console.log(error);
  }
};

export const getSessionsList = () => (state: RootState) => state.sessions.entities;
export const getSessionsByCurrentClient = (id: string) => (state: RootState) =>
  state.sessions.entities.filter((s) => s.clientId === id);

export const getSessionsByCurrentDoctor = (id: string) => (state: RootState) =>
  state.sessions.entities.filter((s) => s.doctorId === id);
export const getSessionsLoadingStatus = () => (state: RootState) => state.sessions.isLoading;

export default sessionsReducer;
