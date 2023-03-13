import client from '@modules/apollo/apollo-client';
import UserContainerPlantsDetailed from '@modules/containers/components/user-container/plants/detailed/user-container-plants-detailed';
import {
  Container,
  FindContainerDocument,
  FindContainerQuery,
  FindContainerQueryVariables,
} from '@modules/graphql/@generated/graphql';
import Layout from '@modules/layout/components/layout';
import { GetServerSideProps } from 'next';

type ContainerPlantsPageProps = {
  container: Container;
};

const ContainerPlantsPage: React.FC<ContainerPlantsPageProps> = (props) => {
  const { container } = props;

  return (
    <Layout
      headProps={{
        title: `Container Plants Page | Gardentify`,
        description: 'Plants page for the user container',
      }}
    >
      <section className="container mx-auto flex max-w-6xl flex-col space-y-4 md:px-4 lg:px-6">
        <UserContainerPlantsDetailed container={container} initialTake={6} />
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const uuid = query.uuid as string;

  const { data: containerData } = await client.query<FindContainerQuery, FindContainerQueryVariables>({
    query: FindContainerDocument,
    variables: {
      input: { uuid },
    },
  });

  if (containerData.findContainer && containerData.findContainer.container) {
    return {
      props: {
        container: containerData.findContainer.container,
      },
    };
  }

  return { notFound: true };
};

export default ContainerPlantsPage;
