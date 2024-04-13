import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import App from './App'; // Your main App component

// Create an ApolloClient instance
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Replace with your GraphQL API URI
  cache: new InMemoryCache(),
});

// Wrap your App component with ApolloProvider
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

