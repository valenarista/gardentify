import { Button } from '@gardentify/ui';
import { useLoginMutation } from '@modules/graphql/@generated/graphql';
import Layout from '@modules/layout/components/layout';

const HomePage: React.FC = () => {
  const [login] = useLoginMutation();

  return (
    <Layout>
      <h1 className="text-primary-500 text-4xl font-bold">Dashbord </h1>
      <Button>Welcome</Button>

      <Button
        onClick={async () => {
          await login({
            variables: { data: { username: 'Retrosen', password: '4532164Mine' } },
          }).then((data) => {
            if (data.data?.login && data.data.login.accessToken) {
              localStorage.setItem('token', data.data.login.accessToken);
            }
          });
        }}
      >
        Login
      </Button>
    </Layout>
  );
};

export default HomePage;
