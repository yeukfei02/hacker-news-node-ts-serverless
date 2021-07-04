import { hackerNewsControllerFunc } from '../controller/hackerNews';

const resolvers = {
  Query: {
    hackerNews: hackerNewsControllerFunc,
  },
};

export default resolvers;
