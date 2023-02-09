import { createSlice, createAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import doctorsService from '../services/doctorsService';
import { AppDispatch, RootState } from './createStore';

// типы изменятся позже

type TDoctor = {
  name: string;
  password: string;
  specialization: string;
  mail: string;
  username: string;
  _id: string;
};

type TDoctorState = {
  entities: TDoctor[];
  isLoading: boolean;
};

const initialState: TDoctorState = {
  entities: [],
  isLoading: true,
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
    // doctorsRequestFailed: (state, action) => {
    // для ошибок
    // }
    doctorRemoved: (state, action) => {
      state.entities = state.entities.filter((doc) => doc._id !== action.payload);
    },
    doctorCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    doctorUpdateSuccessed: (state, action) => {
      state.entities[state.entities.findIndex((doc) => doc._id === action.payload._id)] = action.payload;
    },
  },
});

const { actions, reducer: doctorsReducer } = doctorsSlice;
const { doctorsRequested, doctorsReceived, doctorRemoved, doctorCreated, doctorUpdateSuccessed } = actions;

const removeDoctorRequested = createAction('doctors/removeDoctorRequested');
const createDoctorRequested = createAction('doctors/createDoctorRequested');
const updateDoctorRequested = createAction('doctors/updateDoctorRequested');

export const loadDoctorsList = () => async (dispatch: AppDispatch) => {
  dispatch(doctorsRequested());
  try {
    const { content } = await doctorsService.get();
    dispatch(doctorsReceived(content));
  } catch (error) {
    console.log(error);
  }
};

export const removeDoctor = (docId: string) => async (dispatch: AppDispatch) => {
  dispatch(removeDoctorRequested());
  try {
    const { content } = await doctorsService.remove(docId);
    console.log(content);
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
    const newDoc = {
      ...payload,
      _id: nanoid(),
    };
    const { content } = await doctorsService.create(newDoc);
    console.log(content);
    dispatch(doctorCreated(newDoc));
  } catch (error) {
    console.log(error);
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
export const getDoctorById = (id: string) => (state: RootState) => {
  if (state.doctors.entities) {
    return state.doctors.entities.find((doc) => doc._id === id);
  }
  return null;
};
export default doctorsReducer;
