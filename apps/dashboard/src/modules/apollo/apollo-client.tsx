import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { __PROD__ } from '@modules/common/lib/constants';
import { PlantsResponse } from '@modules/graphql/@generated/graphql';

// Authentication state
export const isUserLoggedInVar = makeVar(false);
export const isUserLoadingVar = makeVar(true);

export const createApolloClient = () => {
  // Declare variable to store authToken
  let token: string | null = null;

  const httpLink = createHttpLink({
    uri:
      process.env.NODE_ENV === 'production'
        ? 'https://gardentify-api.onrender.com/graphql'
        : `http://localhost:4000/graphql`,
    credentials: 'include',
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
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

  return client;
};
