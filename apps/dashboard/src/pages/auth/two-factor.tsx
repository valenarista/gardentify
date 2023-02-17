import AuthTwoFactor from '@modules/auth/components/two-factor/auth-two-factor';
import Layout from '@modules/layout/components/layout';

const TwoFactorPage: React.FC = () => {
  return (
    <Layout
      headProps={{
        title: 'Two Factor Setup | Gardentify',
        description:
          'Setup two factor authentication in Gardentify to keep your account secure and access to more auth features.',
      }}
    >
      <AuthTwoFactor />
    </Layout>
  );
};

export default TwoFactorPage;
