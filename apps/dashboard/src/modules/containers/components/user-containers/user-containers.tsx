import { useAuthContext } from '@modules/auth/context/auth-context';
import useApiQuery from '@modules/common/hooks/use-api-query';
import ContainersFeed from '@modules/containers/components/feed/containers-feed';
import {
  FindUserContainersDocument,
  FindUserContainersQuery,
  FindUserContainersQueryVariables,
} from '@modules/graphql/@generated/graphql';

import UserContainersHeader from './user-containers-header';

const UserContainers: React.FC = () => {
  const { state } = useAuthContext();

  const { response, loading } = useApiQuery<FindUserContainersQuery, FindUserContainersQueryVariables>(
    FindUserContainersDocument,
    {
      skip: !state.user?.uuid,
      variables: {
        input: { userUuid: state.user?.uuid! },
      },
    }
  );

  const containers = response?.data?.findUserContainers.containers || [];

  return (
    <div className="container mx-auto flex max-w-6xl flex-col space-y-4 px-2 md:px-4 lg:px-6">
      <div className="flex rounded-lg bg-neutral-200 p-4 shadow-lg dark:bg-neutral-800 ">
        {/* Details */}
        <div className="flex w-full flex-col space-y-4">
          <UserContainersHeader username={state.user?.username!} />

          {response?.error ? (
            <span className="text-neutral-800 dark:text-neutral-100">{response.error.message}</span>
          ) : null}
          {loading ? (
            <span className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Loading...</span>
          ) : (
            <ContainersFeed containers={containers} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserContainers;
