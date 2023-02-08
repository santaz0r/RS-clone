import { createSlice, createAction } from '@reduxjs/toolkit';
import testService from '../services/doctorsService';
import { AppDispatch, RootState } from './createStore';

// типы изменятся позже

type TDoctor = {
  [key: string]: string;
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
  },
});

const { actions, reducer: doctorsReducer } = doctorsSlice;
const { doctorsRequested, doctorsReceived, doctorRemoved } = actions;

const removeDoctorRequested = createAction('comments/removeDoctorRequested');

export const loadDoctorsList = () => async (dispatch: AppDispatch) => {
  dispatch(doctorsRequested());
  try {
    const data = await testService.fetchAll();
    dispatch(doctorsReceived(data));
  } catch (error) {
    console.log(error);
  }
};

export const removeDoctor = (docId: number | string) => async (dispatch: AppDispatch) => {
  dispatch(removeDoctorRequested());
  try {
    const data = await testService.remove(docId);
    if (data) {
      dispatch(doctorRemoved(docId));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getDoctorsLoadingStatus = () => (state: RootState) => state.doctors.isLoading;
export const getDoctorsList = () => (state: RootState) => state.doctors.entities;
export default doctorsReducer;
