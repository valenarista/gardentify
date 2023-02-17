import UserAuth from '@modules/auth/components/user-auth/user-auth';
import Layout from '@modules/layout/components/layout';

const AuthPage: React.FC = () => {
  return (
    <Layout
      headProps={{
        title: 'Auth | Gardentify',
        description: 'Login to Gardentify to unlock all the features in just a couple of clicks.',
      }}
    >
      <UserAuth />
    </Layout>
  );
};

export default AuthPage;
