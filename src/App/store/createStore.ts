import { configureStore, combineReducers } from '@reduxjs/toolkit';
import doctorsReducer from './doctors';
import specializationsReducer from './specializations';
import usersReducer from './users';
import sessionsReducer from './sessions';

const rootReducer = combineReducers({
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