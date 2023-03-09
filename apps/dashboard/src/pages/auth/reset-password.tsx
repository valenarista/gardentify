import AuthResetPassword from '@modules/auth/components/reset-password/auth-reset-password';
import Layout from '@modules/layout/components/layout';

const AuthResetPasswordPage: React.FC = () => {
  return (
    <Layout
      headProps={{
        title: 'Reset Password | Gardentify',
        description: 'Reset your password to your Gardentify account if you lost it',
      }}
    >
      <AuthResetPassword />
    </Layout>
  );
};

export default AuthResetPasswordPage;
