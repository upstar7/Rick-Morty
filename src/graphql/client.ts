import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql', // The GraphQL API endpoint
  cache: new InMemoryCache(),
});

export default client;
