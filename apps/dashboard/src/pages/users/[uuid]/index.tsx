import client from '@modules/apollo/apollo-client';
import { FindUserDocument, FindUserQuery, FindUserQueryVariables, User } from '@modules/graphql/@generated/graphql';
import Layout from '@modules/layout/components/layout';
import UserProfile from '@modules/user/profile/components/user-profile';
import UserProfileProvider from '@modules/user/profile/context/user-profile-context';
import { GetServerSideProps } from 'next';

type UserPageProps = {
  user: User;
};

const UserPage: React.FC<UserPageProps> = (props) => {
  const { user } = props;

  return (
    <Layout
      headProps={{
        title: `${user.username} Page | Gardentify`,
        description: `Personal page of ${user.username} showing their containers and more informations about their account.`,
      }}
    >
      <UserProfileProvider>
        <UserProfile user={user} />
      </UserProfileProvider>
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
