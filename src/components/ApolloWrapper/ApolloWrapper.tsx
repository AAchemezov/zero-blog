import React, { PropsWithChildren } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphqlzero.almansi.me/api',
  cache: new InMemoryCache(),
});

function ApolloWrapper({ children }: PropsWithChildren): JSX.Element {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default ApolloWrapper;
