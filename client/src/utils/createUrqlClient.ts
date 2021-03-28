import { cacheExchange } from '@urql/exchange-graphcache';
import { dedupExchange, Exchange, fetchExchange } from 'urql';
import { pipe, tap } from 'wonka';
import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation
} from '../generated/graphql';
import { betterUpdateQuery } from './betterUpdateQuery';
import Router from 'next/router';

export const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error) {
        if (error?.message.includes('not authenticated')) {
          console.log('error', error);
          Router.replace('/login');
        }
      }
    })
  );
};

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
    errorExchange,
    ssrExchange,
    fetchExchange
  ]
});
