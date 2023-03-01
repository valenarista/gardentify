import { useAuthContext } from '@modules/auth/context/auth-context';
import Layout from '@modules/layout/components/layout';

const DashbordPage: React.FC = () => {
  const { state } = useAuthContext();

  return (
    <Layout
      headProps={{
        title: 'Dashboard | Gardentify',
        description:
          'Gardentify is a web application that lets you manage and keep tracks of the plants in your garden.',
      }}
    >
      <section className="container mx-auto flex max-w-6xl flex-col space-y-4 px-2 md:px-4 lg:px-6">
        <div className="rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800">
          <h1 className="text-start text-2xl font-semibold">👋 Welcome Back, {state.user?.username}</h1>
        </div>
      </section>
    </Layout>
  );
};

export default DashbordPage;
