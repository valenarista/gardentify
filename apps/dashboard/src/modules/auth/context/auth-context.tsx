import useApiQuery from '@modules/common/hooks/use-api-query';
import { MeDocument, MeQuery, MeQueryVariables, User } from '@modules/graphql/@generated/graphql';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextState = {
  user: User;
  loading: boolean;
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
  const { response, loading } = useApiQuery<MeQuery, MeQueryVariables>(MeDocument, {
    ssr: true,
    notifyOnNetworkStatusChange: true,
  });

  const [logggedInUser, setLoggedInUser] = useState<User>({} as User);

  useEffect(() => {
    if (!loading && response?.data?.me.user) {
      setLoggedInUser(response.data.me.user);
    }
  }, [response, loading]);

  return <AuthContext.Provider value={{ user: logggedInUser, loading }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
