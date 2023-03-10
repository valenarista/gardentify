import { useAuthContext } from '@modules/auth/context/auth-context';
import { useMeQuery } from '@modules/graphql/@generated/graphql';
import Layout from '@modules/layout/components/layout';

const HomePage: React.FC = () => {
  const response = useMeQuery();
  const { userLoggedIn } = useAuthContext();
  const { data, error, loading } = response;

  return (
    <Layout
      headProps={{
        title: 'Home | Gardentify',
        description:
          'Gardentify is a web application that lets you manage and keep tracks of the plants in your garden.',
      }}
    >
      <h1 className="text-primary-500 text-4xl font-bold">Homepage </h1>
      {data && data.me ? <span>{data.me.username}</span> : null}
      {userLoggedIn ? <>LOGGED IN</> : <>NOT LOGGED IN</>}
    </Layout>
  );
};

export default HomePage;
