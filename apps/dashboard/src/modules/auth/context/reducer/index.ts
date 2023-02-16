import { AuthActions, AuthActionType, AuthState } from './types';

export const reducer = (state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case AuthActionType.SIGNUP: {
      if (localStorage) localStorage.setItem('token', action.payload.accessToken);

      return {
        ...state,
        user: action.payload.user,
      };
    }
    case AuthActionType.LOGIN: {
      if (localStorage) localStorage.setItem('token', action.payload.accessToken);

      return {
        ...state,
        user: action.payload.user,
      };
    }
    case AuthActionType.LOGOUT: {
      if (localStorage) localStorage.setItem('token', '');

      return {
        ...state,
        user: null,
      };
    }
    default:
      throw new Error('The action you requested does not exists!');
  }
};
