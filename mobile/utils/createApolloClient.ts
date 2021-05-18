import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const cache = new InMemoryCache();

const uri = 'http://192.168.1.215:42069/graphql';

const httpLink = createHttpLink({
  uri
});

const authLink = setContext((_, { headers }) => {
  const token = AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

export const createApolloClient = () =>
  new ApolloClient({
    link: authLink.concat(httpLink),
    credentials: 'include',
    cache
  });
