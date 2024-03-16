const express = require('express');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/schema.js');
const resolvers = require('./graphql/resolvers.js');

// Initialize an Express application
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

async function startApolloServer(typeDefs, resolvers) {
  // Create an instance of ApolloServer
  const server = new ApolloServer({ typeDefs, resolvers });

  // Start the Apollo Server
  await server.start();

  // Apply the Apollo GraphQL middleware and set the path to /graphql
  server.applyMiddleware({ app, path: '/graphql' });

  // Specify a port and start the server
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
  });
}

startApolloServer(typeDefs, resolvers);
