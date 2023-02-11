import { Container } from '@modules/graphql/@generated/graphql';
import { createContext, useContext, useState } from 'react';

type UserContainerContextState = {
  container: Container;
  setContainer: (container: Container) => void;
};

const UserContainerContext = createContext<UserContainerContextState>({} as UserContainerContextState);

/**
 * Hook for accessing the user container context.
 * @returns The theme context.
 */
export const useUserContainerContext = () => {
  const context = useContext(UserContainerContext);
  if (!context) throw new Error('Tried to use UserContainerContext with no context avaiable!');
  return context;
};

type UserContainerProviderProps = {
  children: React.ReactNode;
};

const UserContainerProvider: React.FC<UserContainerProviderProps> = (props) => {
  const { children } = props;
  const [container, setContainer] = useState<Container>({} as Container);

  const updateContainer = (updatedContainer: Container) => {
    setContainer(updatedContainer);
  };

  return (
    <UserContainerContext.Provider value={{ container, setContainer: updateContainer }}>
      {children}
    </UserContainerContext.Provider>
  );
};

export default UserContainerProvider;
