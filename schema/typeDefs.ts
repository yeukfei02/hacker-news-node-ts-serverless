import { gql } from 'apollo-server-lambda';

const typeDefs = gql`
  type Query {
    hackerNews(pageNumber: Int): [HackerNews!]!
  }

  type HackerNews {
    id: String
    title: String
    uri: String
    author: String
    hours: String
    points: String
    comments: String
    rank: Int
  }
`;

export default typeDefs;
