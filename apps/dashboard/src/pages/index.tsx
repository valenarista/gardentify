import { Button } from '@gardentify/ui';
import Layout from '@modules/layout/components/layout';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-primary-500 text-4xl font-bold">Dashbord </h1>
      <Button>Welcome</Button>

      <Link href={'http://localhost:4000/api/v1/auth/discord/login'}>Login</Link>
    </Layout>
  );
};

export default HomePage;
