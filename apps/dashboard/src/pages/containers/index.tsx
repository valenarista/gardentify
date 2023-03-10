import { useAuthContext } from '@modules/auth/context/auth-context';
import UserContainers from '@modules/containers/components/user-containers/user-containers';
import Layout from '@modules/layout/components/layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ContainersPage: React.FC = () => {
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
        title: `Containers Page | Gardentify`,
        description: 'User containers page where you can search and filter your gardentify containers',
      }}
    >
      <UserContainers />
    </Layout>
  );
};

export default ContainersPage;
