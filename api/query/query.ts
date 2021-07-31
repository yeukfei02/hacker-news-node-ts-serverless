import { queryField, list, nonNull, intArg } from 'nexus';
import { HackerNews } from '../types/hackerNews';

import { hackerNewsControllerFunc } from '../../controller/hackerNews';

export const hackerNews = queryField('hackerNews', {
  type: nonNull(list(nonNull(HackerNews))),
  args: {
    pageNumber: intArg(),
  },
  resolve: hackerNewsControllerFunc,
});
