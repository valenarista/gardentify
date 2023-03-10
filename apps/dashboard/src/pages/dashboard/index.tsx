import { useAuthContext } from '@modules/auth/context/auth-context';
import UserDashboard from '@modules/dashboard/components/user-dashboard';
import Layout from '@modules/layout/components/layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const DashbordPage: React.FC = () => {
  const router = useRouter();
  const { userLoggedIn, userLoading, user } = useAuthContext();

  useEffect(() => {
    if (!userLoading && !user) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push('/');
    }
  }, [userLoggedIn, user]);

  if (!user) return null;

  return (
    <Layout
      headProps={{
        title: 'Dashboard | Gardentify',
        description:
          'Gardentify is a web application that lets you manage and keep tracks of the plants in your garden.',
      }}
    >
      <UserDashboard user={user} />
    </Layout>
  );
};

export default DashbordPage;
