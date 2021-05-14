import { Reducer } from 'redux';
import { UserActions } from '../actions/userActions';

export type UserState = {
  username: string;
  darkTheme: boolean;
};

const initialState: UserState = {
  username: '',
  darkTheme: true
};

export const userReducer: Reducer<UserState, UserActions> = (
  state: UserState = initialState,
  action: UserActions
) => {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload
      };
    case 'SET_DARK_THEME':
      return {
        ...state,
        darkTheme: action.payload
      };
    default:
      neverReached(action);
  }
  return state;
};

const neverReached = (never: never) => {};
