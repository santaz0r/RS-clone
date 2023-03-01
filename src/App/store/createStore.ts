import { configureStore, combineReducers } from '@reduxjs/toolkit';
import doctorsReducer from './doctors';
import specializationsReducer from './specializations';
import usersReducer from './users';
import sessionsReducer from './sessions';
import languageReducer from './language';

const rootReducer = combineReducers({
  language: languageReducer,
  doctors: doctorsReducer,
  specialization: specializationsReducer,
  users: usersReducer,
  sessions: sessionsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
