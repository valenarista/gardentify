import ManagementDeleteObject from '@modules/common/components/management/management-delete-object';
import { useDeletePlantMutation } from '@modules/graphql/@generated/graphql';
import { useContainerPlantContext } from '@modules/plants/context/container-plant-context';
import { useRouter } from 'next/router';
import React from 'react';

const PlantManagementDelete: React.FC = () => {
  const router = useRouter();
  const { plant } = useContainerPlantContext();
  const [deletePlant] = useDeletePlantMutation();

  const handlePlantDelete = async () => {
    const containerUuid = plant.container?.uuid;
    const response = await deletePlant({
      variables: {
        input: {
          uuid: plant.uuid,
        },
      },
    });

    if (response.data && response.data.deletePlant.deleted && containerUuid) {
      await router.push({
        pathname: '/containers/[uuid]',
        query: {
          uuid: containerUuid,
        },
      });
    }
  };

  return <ManagementDeleteObject object="Plant" onDeleted={handlePlantDelete} />;
};
export default PlantManagementDelete;
