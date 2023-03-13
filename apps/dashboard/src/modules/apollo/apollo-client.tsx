import { ApolloClient, createHttpLink, from, InMemoryCache, makeVar } from '@apollo/client';
import { __PROD__ } from '@modules/common/lib/constants';
import { PlantsResponse } from '@modules/graphql/@generated/graphql';

import refreshTokenLink from './apollo-refresh-token.link';

// Authentication state
export const isUserLoggedInVar = makeVar(false);
export const isUserLoadingVar = makeVar(true);
export const isRefreshingTokenVar = makeVar(false);

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://gardentify-api.onrender.com/graphql'
      : `http://localhost:4000/graphql`,
  credentials: 'include',
});

const client = new ApolloClient({
  link: from([refreshTokenLink, httpLink]),
  connectToDevTools: !__PROD__,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          findContainerPlants: {
            keyArgs: [],
            merge(existing: PlantsResponse | undefined, incoming: PlantsResponse): PlantsResponse {
              return {
                ...incoming,
                plants: [...(existing?.plants || []), ...(incoming.plants || [])],
              };
            },
          },
        },
      },
    },
  }),
});

export default client;
