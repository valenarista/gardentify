import AuthTwoFactor from '@modules/auth/components/two-factor/auth-two-factor';
import Layout from '@modules/layout/components/layout';

const TwoFactorPage: React.FC = () => {
  return (
    <Layout
      headProps={{
        title: 'Two Factor Setup | Gardentify',
        description: 'Signup to Gardentify to unlock all the features in just a couple of clicks.',
      }}
    >
      <AuthTwoFactor />
    </Layout>
  );
};

export default TwoFactorPage;
