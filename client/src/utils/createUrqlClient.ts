import { dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import {
  LoginMutation,
  MeQuery,
  MeDocument,
  RegisterMutation,
  LogoutMutation
} from '../generated/graphql';
import { betterUpdateQuery } from './betterUpdateQuery';

/**
 * Use on pages with dynamic data where SEO matters etc.
 * Next toggles between ssr and csr after 'page has been loaded once'
 *
 * Server side rendering:
 *  withUrqlClient(createUrqlClient, {ssr: true})(Page);
 *
 * Using urql in component:
 *  withUrqlClient(createUrqlClient)(Page);
 *
 */

export const createUrqlClient = (ssrExchange: any) => ({
  url: 'http://localhost:42069/graphql',
  fetchOptions: {
    credentials: 'include' as const
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user
                  };
                }
              }
            );
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user
                  };
                }
              }
            );
          },
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          }
        }
      }
    }),
    ssrExchange,
    fetchExchange
  ]
});
