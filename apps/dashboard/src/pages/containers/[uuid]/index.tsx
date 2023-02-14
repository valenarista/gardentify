import { client } from '@modules/apollo/apollo-client';
import UserContainer from '@modules/containers/components/user-container/user-container';
import UserContainerProvider from '@modules/containers/context/user-container-context';
import {
  Container,
  FindContainerDocument,
  FindContainerQuery,
  FindContainerQueryVariables,
} from '@modules/graphql/@generated/graphql';
import Layout from '@modules/layout/components/layout';
import { GetServerSideProps } from 'next';

type ContainerPageProps = {
  container: Container;
};

const ContainerPage: React.FC<ContainerPageProps> = (props) => {
  const { container } = props;

  return (
    <Layout
      headProps={{
        title: `Container Page | Gardentify`,
      }}
    >
      <UserContainerProvider>
        <UserContainer container={container} />
      </UserContainerProvider>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const uuid = query.uuid as string;
  const { data } = await client.query<FindContainerQuery, FindContainerQueryVariables>({
    query: FindContainerDocument,
    variables: {
      input: {
        uuid,
      },
    },
  });

  if (data.findContainer && data.findContainer.container) {
    return {
      props: {
        container: data.findContainer.container,
      },
    };
  }

  return { notFound: true };
};

export default ContainerPage;
