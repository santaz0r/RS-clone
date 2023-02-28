import { createSlice, createAction } from '@reduxjs/toolkit';
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
    sessionsCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    sessionRemoved: (state, action) => {
      state.entities = state.entities.filter((sess) => sess._id !== action.payload);
    },
  },
});
const { actions, reducer: sessionsReducer } = sessionsSlice;
const { sessionsRequested, sessionsReceived, sessionsCreated, sessionRemoved } = actions;
const createSessionsRequested = createAction('sessions/createSessionsRequested');
const removeSessionRequested = createAction('session/removeSessionRequested');

export const loadSessionsList = () => async (dispatch: AppDispatch) => {
  dispatch(sessionsRequested());
  try {
    const { content } = await sessionsService.getAll();
    dispatch(sessionsReceived(content));
  } catch (error) {
    console.log(error);
  }
};

export const createSession = (payload: { [key: string]: string }) => async (dispatch: AppDispatch) => {
  dispatch(createSessionsRequested());
  try {
    const { content } = await sessionsService.create(payload);
    dispatch(sessionsCreated(content));
  } catch (error) {
    console.log(error);
  }
};

export const removeSession = (sessionsId: string) => async (dispatch: AppDispatch) => {
  dispatch(removeSessionRequested());
  try {
    const { content } = await sessionsService.deleteSession(sessionsId);
    if (!content) {
      dispatch(sessionRemoved(sessionsId));
    }
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
