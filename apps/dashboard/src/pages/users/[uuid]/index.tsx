import client from '@modules/apollo/apollo-client';
import useApiQuery from '@modules/common/hooks/use-api-query';
import { FindUserDocument, FindUserQuery, FindUserQueryVariables, User } from '@modules/graphql/@generated/graphql';
import Layout from '@modules/layout/components/layout';
import UserProfile from '@modules/user/profile/components/user-profile';
import UserProfileProvider from '@modules/user/profile/context/user-profile-context';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

type UserPageProps = {
  user: User;
};

const UserPage: React.FC<UserPageProps> = (props) => {
  const {} = props;
  const router = useRouter();
  const { response, loading } = useApiQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, {
    variables: {
      input: { uuid: router.query.uuid as string },
    },
  });

  const user = response?.data?.findUser.user;

  return (
    <Layout
      headProps={{
        title: `User Page | Gardentify`,
      }}
    >
      <UserProfileProvider>{user ? <UserProfile user={user} loading={loading} /> : null}</UserProfileProvider>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const uuid = query.uuid as string;
  const { data } = await client.query<FindUserQuery, FindUserQueryVariables>({
    query: FindUserDocument,
    variables: {
      input: {
        uuid,
      },
    },
  });

  if (data.findUser && data.findUser.user) {
    return {
      props: {
        user: data.findUser.user,
      },
    };
  }

  return { notFound: true };
};

export default UserPage;
