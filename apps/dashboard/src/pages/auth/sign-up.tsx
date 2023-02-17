import AuthSignUp from '@modules/auth/components/sign-up/auth-sign-up';
import Layout from '@modules/layout/components/layout';

const SignUpPage: React.FC = () => {
  return (
    <Layout
      headProps={{
        title: 'Sign Up | Gardentify',
        description: 'Signup to Gardentify to unlock all the features in just a couple of clicks.',
      }}
    >
      <AuthSignUp />
    </Layout>
  );
};

export default SignUpPage;
