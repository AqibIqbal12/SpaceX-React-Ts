import { ApolloClient, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql',
  cache: new InMemoryCache({
    typePolicies:{
      Query: {
        fields: {
          launches: offsetLimitPagination(),
          //histories: offsetLimitPagination(),
        },
      },
    }
  })
});

export default client;