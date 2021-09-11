import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApolloClient, ApolloLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';

const uri = 'http://192.168.1.215:42069';
const graphQlEndpoint = `${uri}/graphql`;
const subscriptionsEndpoint = `${uri}/subscriptions`;

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.error(message));
});

const uploadLink = createUploadLink({ uri: graphQlEndpoint });

const authLink = setContext((_, { headers }) => {
  const token = AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const wsLink = new WebSocketLink({
  uri: subscriptionsEndpoint,
  options: {
    reconnect: true
  }
});

const splitLink = split(
  ({ query }) => {
    const defintion = getMainDefinition(query);
    return (
      defintion.kind === 'OperationDefinition' &&
      defintion.operation === 'subscription'
    );
  },
  wsLink,
  uploadLink as unknown as ApolloLink
);

export const createApolloClient = (cache: InMemoryCache) =>
  new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, splitLink]),
    credentials: 'include',
    cache
  });
