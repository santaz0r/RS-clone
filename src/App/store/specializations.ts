import { createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, RootState } from './createStore';
import specializationService from '../services/specializationsService';
import { TSpec } from '../types/types';

type TSpecState = {
  entities: TSpec[];
  isLoading: boolean;
  createError: string;
};

const initialState: TSpecState = {
  entities: [],
  isLoading: true,
  createError: '',
};

const specializationsSlice = createSlice({
  name: 'specializations',
  initialState,
  reducers: {
    specializationsRequested: (state) => {
      state.isLoading = true;
    },
    specializationsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    specializationCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    specializationCreateFailed: (state, action) => {
      state.createError = action.payload;
    },
    specializationUpdateSuccessed: (state, action) => {
      state.entities[state.entities.findIndex((spec) => spec._id === action.payload._id)] = action.payload;
    },
    specializationRemoved: (state, action) => {
      state.entities = state.entities.filter((spec) => spec._id !== action.payload);
    },
  },
});
const { actions, reducer: specializationsReducer } = specializationsSlice;
const {
  specializationsRequested,
  specializationsReceived,
  specializationCreated,
  specializationCreateFailed,
  specializationUpdateSuccessed,
  specializationRemoved,
} = actions;

const createSpecializationRequested = createAction('specializations/createSpecializationRequested');
const updateSpecializationRequested = createAction('specializations/updateSpecializationRequested');
const removeSpecializationRequested = createAction('specializations/removeSpecializationRequested');

export const loadSpecializationsList = () => async (dispatch: AppDispatch) => {
  dispatch(specializationsRequested());
  try {
    const { content } = await specializationService.get();
    dispatch(specializationsReceived(content));
  } catch (error) {
    console.log(error);
  }
};

export const removeSpecialization = (specId: string) => async (dispatch: AppDispatch) => {
  dispatch(removeSpecializationRequested());
  try {
    const { content } = await specializationService.remove(specId);
    if (!content) {
      dispatch(specializationRemoved(specId));
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateSpecialization = (payload: { [key: string]: string }) => async (dispatch: AppDispatch) => {
  dispatch(updateSpecializationRequested());
  try {
    await specializationService.update(payload);
    dispatch(specializationUpdateSuccessed(payload));
  } catch (error) {
    console.log(error);
  }
};

export const createSpecialization = (payload: { [key: string]: string }) => async (dispatch: AppDispatch) => {
  dispatch(createSpecializationRequested());
  try {
    const { content } = await specializationService.create(payload);
    dispatch(specializationCreated(content));
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const message: string = error.response?.data;
      dispatch(specializationCreateFailed(message));
    }
  }
};

export const getSpecializations = () => (state: RootState) => state.specialization.entities;
export const getSpecializationsLoadingStatus = () => (state: RootState) => state.specialization.isLoading;
export const getSpecializationById = (id: string) => (state: RootState) => {
  if (state.specialization.entities) {
    return state.specialization.entities.find((spec) => spec._id === id);
  }
  return null;
};

export default specializationsReducer;
