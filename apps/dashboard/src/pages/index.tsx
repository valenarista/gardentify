import { Button } from '@gardentify/ui';
import Layout from '@modules/layout/components/layout';

const HomePage: React.FC = () => {
  return (
    <Layout
      headProps={{
        title: 'Home | Gardentify',
      }}
    >
      <h1 className="text-primary-500 text-4xl font-bold">Dashbord </h1>
      <Button>Welcome</Button>
    </Layout>
  );
};

export default HomePage;
