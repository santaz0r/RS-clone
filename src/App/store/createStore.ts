import { configureStore, combineReducers } from '@reduxjs/toolkit';
import doctorsReducer from './doctors';
import specializationsReducer from './specializations';

const rootReducer = combineReducers({ doctors: doctorsReducer, specialization: specializationsReducer });

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
