import { fetchHackerNews } from '../api/fetchHackerNews';

const resolvers = {
  Query: {
    hackerNews: async (parent: any, args: any, context: any, info: any): Promise<any[]> => {
      const pageNumber = args.pageNumber || 1;
      console.log('pageNumber = ', pageNumber);

      const hackerNewsList = await fetchHackerNews(pageNumber);

      return hackerNewsList;
    },
  },
};

export default resolvers;
