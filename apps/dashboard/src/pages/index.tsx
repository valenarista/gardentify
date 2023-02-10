import { Button } from '@gardentify/ui';
import { useFindPlantQuery } from '@modules/graphql/@generated/graphql';
import Layout from '@modules/layout/components/layout';

const HomePage: React.FC = () => {
  const { data } = useFindPlantQuery({
    variables: { input: { uuid: 'cldxhtt1y0004ieb4utirh26h' } },
  });
  return (
    <Layout>
      <h1 className="text-primary-500 text-4xl font-bold">Dashbord </h1>
      <Button>Welcome</Button>
    </Layout>
  );
};

export default HomePage;
