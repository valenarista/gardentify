import { createContext, useContext, useState } from 'react';

type UserProfileEditContextState = {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
};

const UserProfileEditContext = createContext<UserProfileEditContextState>({} as UserProfileEditContextState);

/**
 * Hook for accessing the theme context.
 * @returns The theme context.
 */
export const useUserProfileEditContext = () => {
  const context = useContext(UserProfileEditContext);
  if (!context) throw new Error('Tried to use UserProfileEditContext with no context avaiable!');
  return context;
};

type UserProfileEditProviderProps = {
  children: React.ReactNode;
};

const UserProfileEditProvider: React.FC<UserProfileEditProviderProps> = (props) => {
  const { children } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const hanldeModalChange = (open: boolean) => {
    setIsModalOpen(open);
  };

  return (
    <UserProfileEditContext.Provider value={{ isModalOpen, setIsModalOpen: hanldeModalChange }}>
      {children}
    </UserProfileEditContext.Provider>
  );
};

export default UserProfileEditProvider;
