import { createContext, useContext, useEffect, useReducer } from 'react';

import useLoggedInUser from '../hooks/use-logged-in-user';
import { reducer } from './reducer';
import { AuthActionType, AuthContextState } from './reducer/types';

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

/**
 * Hook for accessing the auth context.
 * @returns The auth context.
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Tried to use AuthContext with no context avaiable!');
  return context;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    loading: false,
  });

  const { loggedInUser } = useLoggedInUser();

  useEffect(() => {
    if (!loggedInUser) return;

    if (localStorage) {
      const token = localStorage.getItem('token');
      if (!token) return;

      dispatch({
        type: AuthActionType.LOGIN,
        payload: {
          accessToken: token,
          user: loggedInUser,
        },
      });
    }
  }, [loggedInUser]);

  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
