import { GraphQLServerLambda } from 'graphql-yoga';
import typeDefs from '../schema/typeDefs';
import resolvers from '../resolvers/resolvers';

import awsXRay from 'aws-xray-sdk';
import awsSdk from 'aws-sdk';
awsXRay.captureAWS(awsSdk);

const lambda = new GraphQLServerLambda({
  typeDefs,
  resolvers,
});

export const graphql = lambda.graphqlHandler;
export const playground = lambda.playgroundHandler;
