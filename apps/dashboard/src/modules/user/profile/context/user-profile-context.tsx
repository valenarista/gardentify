import { User } from '@modules/graphql/@generated/graphql';
import { createContext, useContext, useState } from 'react';

type UserProfileContextState = {
  user: User;
  setUser: (user: User) => void;
};

const UserProfileContext = createContext<UserProfileContextState>({} as UserProfileContextState);

/**
 * Hook for accessing the theme context.
 * @returns The theme context.
 */
export const useUserProfileContext = () => {
  const context = useContext(UserProfileContext);
  if (!context) throw new Error('Tried to use UserProfileContext with no context avaiable!');
  return context;
};

type UserProfileProviderProps = {
  children: React.ReactNode;
};

const UserProfileProvider: React.FC<UserProfileProviderProps> = (props) => {
  const { children } = props;
  const [user, setUser] = useState<User>({} as User);

  return <UserProfileContext.Provider value={{ user, setUser }}>{children}</UserProfileContext.Provider>;
};

export default UserProfileProvider;
