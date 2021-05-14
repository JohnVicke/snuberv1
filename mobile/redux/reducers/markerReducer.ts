import { Reducer } from 'redux';
import { SnuberMarker } from '../../utils/types/Snuber';
import { MarkerActions } from '../actions/markerActions';

export type MarkerState = {
  friendMarkers: SnuberMarker[];
  userMarker: SnuberMarker | undefined;
};

const initialState: MarkerState = {
  friendMarkers: [],
  userMarker: undefined
};

export const markerReducer: Reducer<MarkerState, MarkerActions> = (
  state: MarkerState = initialState,
  action: MarkerActions
) => {
  switch (action.type) {
    case 'ADD_FRIEND_MARKER':
      return {
        ...state,
        friendMarkers: [...state.friendMarkers, action.payload]
      };
    case 'REMOVE_FRIEND_MARKER':
      return {
        ...state,
        friendMarkers: state.friendMarkers.filter(
          (m: SnuberMarker) => m.id !== action.payload
        )
      };
    case 'ADD_USER_MARKER':
      return {
        ...state,
        userMarker: action.payload
      };
    case 'REMOVE_USER_MARKER':
      return {
        ...state,
        userMarker: undefined
      };
    default:
      neverReached(action);
  }
  return state;
};

const neverReached = (never: never) => {};
