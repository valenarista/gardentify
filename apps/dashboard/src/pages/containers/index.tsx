import { useAuthContext } from '@modules/auth/context/auth-context';
import UserContainers from '@modules/containers/components/user-containers/user-containers';
import Layout from '@modules/layout/components/layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ContainersPage: React.FC = () => {
  const router = useRouter();
  const { user, loading: userLoading } = useAuthContext();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (!userLoading && !user.uuid) router.push('/');
  }, [user]);

  return (
    <Layout
      headProps={{
        title: `Containers Page | Gardentify`,
      }}
    >
      <UserContainers />
    </Layout>
  );
};

export default ContainersPage;
