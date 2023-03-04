import Layout from '@modules/layout/components/layout';

const HomePage: React.FC = () => {
  return (
    <Layout
      headProps={{
        title: 'Home | Gardentify',
        description:
          'Gardentify is a web application that lets you manage and keep tracks of the plants in your garden.',
      }}
    >
      <h1 className="text-primary-500 text-4xl font-bold">Homepage </h1>
    </Layout>
  );
};

export default HomePage;
