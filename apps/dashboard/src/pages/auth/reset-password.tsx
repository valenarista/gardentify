import AuthResetPassword from '@modules/auth/components/reset-password/auth-reset-password';
import Layout from '@modules/layout/components/layout';

const AuthResetPasswordPage: React.FC = () => {
  return (
    <Layout
      headProps={{
        title: 'Reset Password | Gardentify',
        description: 'Login to Gardentify to unlock all the features in just a couple of clicks.',
      }}
    >
      <AuthResetPassword />
    </Layout>
  );
};

export default AuthResetPasswordPage;
