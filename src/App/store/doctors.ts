import { createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import doctorsService from '../services/doctorsService';
import { AppDispatch, RootState } from './createStore';
import { TDoc } from '../types/types';

type TDoctorState = {
  entities: TDoc[];
  isLoading: boolean;
  createError: string;
  dataError: string;
};

const initialState: TDoctorState = {
  entities: [],
  isLoading: true,
  createError: '',
  dataError: '',
};

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    doctorsRequested: (state) => {
      state.isLoading = true;
    },
    doctorsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    doctorsRequestFailed: (state, action) => {
      state.dataError = action.payload;
      state.isLoading = false;
    },
    doctorRemoved: (state, action) => {
      state.entities = state.entities.filter((doc) => doc._id !== action.payload);
    },
    doctorCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    doctorCreateFailed: (state, action) => {
      state.createError = action.payload;
    },
    doctorUpdateSuccessed: (state, action) => {
      state.entities[state.entities.findIndex((doc) => doc._id === action.payload._id)] = action.payload;
    },
  },
});

const { actions, reducer: doctorsReducer } = doctorsSlice;
const {
  doctorsRequestFailed,
  doctorsRequested,
  doctorsReceived,
  doctorRemoved,
  doctorCreated,
  doctorUpdateSuccessed,
  doctorCreateFailed,
} = actions;

const removeDoctorRequested = createAction('doctors/removeDoctorRequested');
const createDoctorRequested = createAction('doctors/createDoctorRequested');
const updateDoctorRequested = createAction('doctors/updateDoctorRequested');

export const loadDoctorsList = () => async (dispatch: AppDispatch) => {
  dispatch(doctorsRequested());
  try {
    const { content } = await doctorsService.get();
    dispatch(doctorsReceived(content));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(doctorsRequestFailed(error.message));
    }
  }
};

export const removeDoctor = (docId: string) => async (dispatch: AppDispatch) => {
  dispatch(removeDoctorRequested());
  try {
    const { content } = await doctorsService.remove(docId);
    if (!content) {
      dispatch(doctorRemoved(docId));
    }
  } catch (error) {
    console.log(error);
  }
};

export const createDoctor = (payload: { [key: string]: string }) => async (dispatch: AppDispatch) => {
  dispatch(createDoctorRequested());
  try {
    const { content } = await doctorsService.create(payload);
    dispatch(doctorCreated(content));
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const message: string = error.response?.data;
      dispatch(doctorCreateFailed(message));
    }
  }
};

export const updateDoctor = (payload: { [key: string]: string }) => async (dispatch: AppDispatch) => {
  dispatch(updateDoctorRequested());
  try {
    await doctorsService.update(payload);
    dispatch(doctorUpdateSuccessed(payload));
  } catch (error) {
    console.log(error);
  }
};

export const getDoctorsLoadingStatus = () => (state: RootState) => state.doctors.isLoading;
export const getDoctorsList = () => (state: RootState) => state.doctors.entities;
export const getDoctorById = (id: string) => (state: RootState) => state.doctors.entities.find((doc) => doc._id === id);

export const getDataError = () => (state: RootState) => state.doctors.dataError;

export default doctorsReducer;
