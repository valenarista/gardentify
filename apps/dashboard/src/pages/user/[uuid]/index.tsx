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
        title: `User Page | Gardentify`,
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

  console.log(data.findUser.errors);

  if (data?.findUser?.errors?.length > 0) {
    return { notFound: true };
  }

  return {
    props: {
      props: {
        user: data.findUser.user,
      },
    },
  };
};

export default UserPage;
