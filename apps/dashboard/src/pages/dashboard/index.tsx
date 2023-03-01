import { useAuthContext } from '@modules/auth/context/auth-context';
import UserDashboard from '@modules/dashboard/components/user-dashboard';
import Layout from '@modules/layout/components/layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const DashbordPage: React.FC = () => {
  const router = useRouter();
  const { state } = useAuthContext();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (!state.loading && state.user && state.user?.username === undefined) router.push('/');
  }, [state]);

  return (
    <Layout
      headProps={{
        title: 'Dashboard | Gardentify',
        description:
          'Gardentify is a web application that lets you manage and keep tracks of the plants in your garden.',
      }}
    >
      {state.user ? <UserDashboard user={state.user} /> : null}
    </Layout>
  );
};

export default DashbordPage;
