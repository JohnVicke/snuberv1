import { SnuberMarker } from '../../generated/graphql';

export interface AddMarker {
  readonly type: 'ADD_MARKER';
  payload: Pick<SnuberMarker, 'latLng' | 'title'>;
}

export interface RemoveMarker {
  readonly type: 'REMOVE_MARKER';
  payload: number;
}

export interface PopulateMarkersFromStore {
  readonly type: 'POPULATE_MARKERS_FROM_STORE';
  payload: SnuberMarker[];
}

export type MarkerActions = AddMarker | RemoveMarker | PopulateMarkersFromStore;
