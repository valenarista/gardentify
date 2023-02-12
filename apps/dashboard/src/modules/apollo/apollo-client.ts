import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client';
import { NextPageContext } from 'next';

import { createWithApollo } from './create-with-apollo';

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

export const apolloClient = (ctx: NextPageContext) => {
  const setCookiesAfterware = new ApolloLink((operation, forward) =>
    forward(operation).map((response) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      ctx?.res?.setHeader('set-cookie', operation.getContext().response.headers.raw()['set-cookie'] || '');
      return response;
    })
  );

  return new ApolloClient({
    link: setCookiesAfterware.concat(
      new HttpLink({
        uri: `http://localhost:4000/graphql`,
        headers: { cookie: ctx?.req?.headers.cookie || '' },
        credentials: 'include',
      })
    ),

    headers: {
      cookie: (typeof window === 'undefined' ? ctx?.req?.headers.cookie : undefined) || '',
    },
    credentials: 'include',
    cache: new InMemoryCache({}),
  });
};

export const withApollo = createWithApollo(apolloClient);
