import { capitalize } from '@gardentify/utils';
import { createApolloClient } from '@modules/apollo/apollo-client';
import {
  FindPlantDocument,
  FindPlantQuery,
  FindPlantQueryVariables,
  Plant as GQLPlant,
} from '@modules/graphql/@generated/graphql';
import Layout from '@modules/layout/components/layout';
import Plant from '@modules/plants/components/plant/plant';
import ContainerPlantProvider from '@modules/plants/context/container-plant-context';
import { GetServerSideProps } from 'next';

type PlantPageProps = {
  plant: GQLPlant;
};

const PlantPage: React.FC<PlantPageProps> = (props) => {
  const { plant } = props;

  return (
    <Layout
      headProps={{
        title: `${capitalize(plant.type)} Plant | Gardentify`,
        description:
          'Gardentify is a web application that lets you manage and keep tracks of the plants in your garden.',
      }}
    >
      <ContainerPlantProvider>
        <Plant plant={plant} />
      </ContainerPlantProvider>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const uuid = query.uuid as string;

  const client = createApolloClient();

  const { data } = await client.query<FindPlantQuery, FindPlantQueryVariables>({
    query: FindPlantDocument,
    variables: {
      input: {
        uuid,
      },
    },
  });

  if (data.findPlant && data.findPlant.plant) {
    return {
      props: {
        plant: data.findPlant.plant,
      },
    };
  }

  return { notFound: true };
};

export default PlantPage;
