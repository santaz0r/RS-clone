import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './createStore';
import specializationService from '../services/specializationsService';
import { TSpec } from '../types/types';

// типы изменятся позже

type TSpecState = {
  entities: TSpec[];
  isLoading: boolean;
};

const initialState: TSpecState = {
  entities: [],
  isLoading: true,
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
  },
});
const { actions, reducer: specializationsReducer } = specializationsSlice;
const { specializationsRequested, specializationsReceived } = actions;

export const loadSpecializationsList = () => async (dispatch: AppDispatch) => {
  dispatch(specializationsRequested());
  try {
    const { content } = await specializationService.get();
    dispatch(specializationsReceived(content));
  } catch (error) {
    console.log(error);
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
