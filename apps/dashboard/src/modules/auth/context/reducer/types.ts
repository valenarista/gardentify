import { User } from '@modules/graphql/@generated/graphql';

export type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthState = {
  user: User | null;
  loading: boolean;
};

export type AuthContextState = {
  state: AuthState;
  dispatch: React.Dispatch<AuthActions>;
};

export enum AuthActionType {
  SIGNUP,
  LOGIN,
  LOGOUT,
}

type AuthPayload = {
  [AuthActionType.SIGNUP]: {
    user: User;
    accessToken: string;
  };
  [AuthActionType.LOGIN]: {
    user: User;
    accessToken: string;
  };
  [AuthActionType.LOGOUT]: unknown;
};

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];
