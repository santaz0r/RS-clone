import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './createStore';

type TLanguageState = {
  value: string;
};

const initialState: TLanguageState = {
  value: localStorage.getItem('language') || 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changedLanguage: (state, action) => {
      state.value = action.payload;
    },
  },
});

const { actions, reducer: languageReducer } = languageSlice;
const { changedLanguage } = actions;

export const switchLang = (payload: string) => (dispatch: AppDispatch) => {
  dispatch(changedLanguage(payload));
  localStorage.setItem('language', payload);
};

export const getLang = () => (state: RootState) => state.language.value;

export default languageReducer;
