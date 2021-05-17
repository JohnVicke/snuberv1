import { Reducer } from 'redux';
import { SnuberMarker } from '../../generated/graphql';
import { MarkerActions } from '../actions/markerActions';

export type MarkerState = {
  markers: SnuberMarker[];
};

const initialState: MarkerState = {
  markers: []
};

export const markerReducer: Reducer<MarkerState, MarkerActions> = (
  state: MarkerState = initialState,
  action: MarkerActions
) => {
  switch (action.type) {
    case 'ADD_MARKER':
      return {
        ...state
      };
    case 'REMOVE_MARKER':
      return {
        ...state,
        markers: state.markers.filter(
          (m: SnuberMarker) => m.id !== action.payload
        )
      };
    case 'POPULATE_MARKERS_FROM_STORE':
      return {
        ...state,
        markers: action.payload
      };
    default:
      neverReached(action);
  }
  return state;
};

const neverReached = (never: never) => {};
