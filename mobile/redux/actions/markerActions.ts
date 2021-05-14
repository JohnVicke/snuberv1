import { SnuberMarker } from '../../utils/types/Snuber';

export interface AddUserMarker {
  readonly type: 'ADD_USER_MARKER';
  payload: SnuberMarker;
}

export interface RemoveUserMarker {
  readonly type: 'REMOVE_USER_MARKER';
}

export interface AddFriendMarker {
  readonly type: 'ADD_FRIEND_MARKER';
  payload: SnuberMarker;
}

export interface RemoveFriendMarker {
  readonly type: 'REMOVE_FRIEND_MARKER';
  payload: string;
}

export type MarkerActions =
  | AddFriendMarker
  | RemoveFriendMarker
  | AddUserMarker
  | RemoveUserMarker;
