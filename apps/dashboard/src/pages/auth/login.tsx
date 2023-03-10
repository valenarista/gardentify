import AuthLogin from '@modules/auth/components/login/auth-login';
import Layout from '@modules/layout/components/layout';

const LoginPage: React.FC = () => {
  return (
    <Layout
      headProps={{
        title: 'Login | Gardentify',
        description: 'Login to Gardentify to unlock all the features in just a couple of clicks.',
      }}
    >
      <AuthLogin />
    </Layout>
  );
};

export default LoginPage;
