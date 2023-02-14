import { client } from '@modules/apollo/apollo-client';
import { FindPlantDocument, FindPlantQuery, FindPlantQueryVariables, Plant } from '@modules/graphql/@generated/graphql';
import Layout from '@modules/layout/components/layout';
import ContainerPlant from '@modules/plants/components/container-plant/container-plant';
import ContainerPlantProvider from '@modules/plants/context/container-plant-context';
import { GetServerSideProps } from 'next';

type PlantPageProps = {
  plant: Plant;
};

const PlantPage: React.FC<PlantPageProps> = (props) => {
  const { plant } = props;

  return (
    <Layout
      headProps={{
        title: `Plant Page | Gardentify`,
      }}
    >
      <ContainerPlantProvider>
        <ContainerPlant plant={plant} />
      </ContainerPlantProvider>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const uuid = query.uuid as string;
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
