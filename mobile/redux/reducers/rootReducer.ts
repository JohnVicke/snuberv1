import { combineReducers } from 'redux';
import { userReducer } from '../reducers/userReducers';
import { markerReducer } from './markerReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  markers: markerReducer
});

export type AppState = ReturnType<typeof rootReducer>;
