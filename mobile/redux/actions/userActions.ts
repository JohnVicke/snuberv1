export interface SetName {
  readonly type: 'SET_NAME';
  payload: string;
}

export interface SetDarkTheme {
  readonly type: 'SET_DARK_THEME';
  payload: boolean;
}

export type UserActions = SetName | SetDarkTheme;
