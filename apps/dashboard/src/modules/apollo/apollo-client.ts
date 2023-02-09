import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  link: from([
    new HttpLink({
      uri: `http://localhost:4000/graphql`,
      credentials: 'include',
    }),
  ]),
  credentials: 'include',
  cache: new InMemoryCache(),
});

export default client;
