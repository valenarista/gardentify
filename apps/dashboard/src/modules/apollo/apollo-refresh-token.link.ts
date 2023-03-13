import { Observable } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { LogOutDocument, RefreshTokenDocument } from '@modules/graphql/@generated/graphql';
import { SourceLocation } from 'graphql';

import client, { isRefreshingTokenVar, isUserLoadingVar, isUserLoggedInVar } from './apollo-client';

export const FORBIDDEN = 'Forbidden';
export const UNAUTHORIZED = 'Unauthorized';

export enum MutationNames {
  RefreshToken = 'RefreshToken',
}

export const formatGQLError = (
  message: string,
  path?: readonly (string | number)[],
  locations?: readonly SourceLocation[]
) => {
  const locationsStr = JSON.stringify(locations);

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return `[GraphQL error]: Message: ${message}, Locations: ${locationsStr}, Path: ${path}`;
};

type Callback = (arg: unknown) => void;

let tokenSubscribers: Callback[] = [];

const subscribeTokenRefresh = (cb: Callback) => {
  tokenSubscribers.push(cb);
  console.log({ tokenSubscribers });
};
const onTokenRefreshed = (err: unknown) => {
  tokenSubscribers.map((cb: Callback) => cb(err));
};
const prepareExit = () => {
  onTokenRefreshed(null);
  tokenSubscribers = [];
};

export const refreshToken = async () => {
  try {
    isRefreshingTokenVar(true);
    await client.mutate({ mutation: RefreshTokenDocument });
  } catch (err) {
    await client.mutate({ mutation: LogOutDocument });
    isUserLoggedInVar(false);
    isUserLoadingVar(false);
    isRefreshingTokenVar(false);
    throw err;
  } finally {
    isRefreshingTokenVar(false);
  }
};

const refreshTokenLink = onError(
  ({ graphQLErrors, networkError, operation, response, forward }) =>
    new Observable((observer) => {
      if (graphQLErrors) {
        graphQLErrors.map(async ({ message, locations, path }, index) => {
          // console.error(formatGQLError(message, path, locations));
          if (!response) {
            return observer.error(graphQLErrors[index]);
          }

          if (message === UNAUTHORIZED) {
            // Ignore unauthroized errors for refreshToken mutations
            if (operation.operationName === MutationNames.RefreshToken) {
              return observer.error(graphQLErrors[index]);
            }

            const retryRequest = () => {
              const subscriber = {
                complete: observer.complete.bind(observer),
                error: observer.error.bind(observer),
                next: observer.next.bind(observer),
              };
              return forward(operation).subscribe(subscriber);
            };

            if (!isRefreshingTokenVar()) {
              try {
                await refreshToken();
                prepareExit();
                return retryRequest();
              } catch {
                prepareExit();
                return observer.error(graphQLErrors[index]);
              }
            }

            const tokenSubscriber = new Promise((resolve) => {
              subscribeTokenRefresh((errRefreshing: unknown) => {
                if (!errRefreshing) {
                  return resolve(retryRequest());
                }
              });
            });
            return tokenSubscriber;
          }
          return observer.next(response);
        });
      }

      if (networkError) {
        return observer.error(networkError);
      }
    })
);

export default refreshTokenLink;
