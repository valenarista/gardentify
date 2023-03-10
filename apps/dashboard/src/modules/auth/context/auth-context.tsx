import { useReactiveVar } from '@apollo/client';
import { isUserLoadingVar, isUserLoggedInVar } from '@modules/apollo/apollo-client';
import { useAuthCheckQuery, useMeQuery, User } from '@modules/graphql/@generated/graphql';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextState = {
  user: User | null;
  userLoading: boolean;
  userLoggedIn: boolean;
  setUserLoading: (loading: boolean) => void;
  setUserLoggedIn: (loggedIn: boolean) => void;
};

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
  const userLoading = useReactiveVar(isUserLoadingVar);
  const userLoggedIn = useReactiveVar(isUserLoggedInVar);

  const [user, setUser] = useState<User | null>(null);

  const { data: meData } = useMeQuery({ skip: !userLoggedIn });

  const setUserLoading = (loading: boolean) => {
    isUserLoadingVar(loading);
  };

  const setUserLoggedIn = (loggedIn: boolean) => {
    isUserLoggedInVar(loggedIn);
  };

  const { loading } = useAuthCheckQuery({
    onCompleted({ authCheck }) {
      setUserLoggedIn(authCheck);
    },
  });

  useEffect(() => {
    setUserLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (meData && meData.me) {
      setUser(meData.me);
    }
  }, [meData]);

  return (
    <AuthContext.Provider value={{ setUserLoading, setUserLoggedIn, userLoading, userLoggedIn: user !== null, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
