import { FileInput } from '@gardentify/ui';
import { useAuthContext } from '@modules/auth/context/auth-context';
import { useMeQuery } from '@modules/graphql/@generated/graphql';
import Layout from '@modules/layout/components/layout';
import Image from 'next/image';

const HomePage: React.FC = () => {
  const response = useMeQuery();
  const { userLoggedIn } = useAuthContext();
  const { data, error, loading } = response;

  return (
    <Layout
      headProps={{
        title: 'Home | Gardentify',
        description:
          'Gardentify is a web application that lets you manage and keep tracks of the plants in your garden.',
      }}
    >
      <h1 className="text-primary-500 text-4xl font-bold">Homepage </h1>
      {data && data.me ? <span>{data.me.username}</span> : null}
      {userLoggedIn ? <>LOGGED IN</> : <>NOT LOGGED IN</>}
      <div className="w-auto">
        <FileInput
          id="a"
          label="Test"
          error={false}
          name="Test"
          reseteable={false}
          onValueChanged={() => {}}
          renderChildren={(files) => {
            if (files.length === 0) return;

            return (
              <div className="flex">
                {files.map((file) => {
                  const imageSrc = URL.createObjectURL(file);
                  return <Image src={imageSrc} alt="Test" width={100} height={50} className="rounded-md" />;
                })}
              </div>
            );
          }}
        />
      </div>
    </Layout>
  );
};

export default HomePage;
