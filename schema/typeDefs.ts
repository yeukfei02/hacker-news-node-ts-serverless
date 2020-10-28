import { importSchema } from 'graphql-import';

const typeDefs = importSchema('schema/schema.graphql');

export default typeDefs;
