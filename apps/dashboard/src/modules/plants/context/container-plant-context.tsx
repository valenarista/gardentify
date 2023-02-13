import { Plant } from '@modules/graphql/@generated/graphql';
import { createContext, useContext, useState } from 'react';

type ContainerPlantContextState = {
  plant: Plant;
  setPlant: (plant: Plant) => void;
};

const ContainerPlantContext = createContext<ContainerPlantContextState>({} as ContainerPlantContextState);

/**
 * Hook for accessing the user container context.
 * @returns The theme context.
 */
export const useContainerPlantContext = () => {
  const context = useContext(ContainerPlantContext);
  if (!context) throw new Error('Tried to use ContainerPlantContext with no context avaiable!');
  return context;
};

type ContainerPlantProviderProps = {
  children: React.ReactNode;
};

const ContainerPlantProvider: React.FC<ContainerPlantProviderProps> = (props) => {
  const { children } = props;
  const [plant, setPlant] = useState<Plant>({} as Plant);

  return <ContainerPlantContext.Provider value={{ plant, setPlant }}>{children}</ContainerPlantContext.Provider>;
};

export default ContainerPlantProvider;
