import { ApolloServer } from 'apollo-server';
import { schema } from '../api/schema';

import { createTestClient } from 'apollo-server-testing';

const server = new ApolloServer({
  schema,
});
const { query } = createTestClient(server);

export const hackerNewsTest = (): void => {
  describe('hackerNews test', () => {
    test('hackerNews test', async () => {
      const HACKER_NEWS = `
        query hackerNews ($pageNumber: Int) {
          hackerNews (pageNumber: $pageNumber) {
              id
              title
              uri
              author
              hours
              points
              comments
              rank
          }
        }
      `;
      const response = await query({ query: HACKER_NEWS, variables: { pageNumber: 1 } });
      console.log('response = ', response);

      expect(response.data).toBeDefined();
      expect(response.data.hackerNews).toBeDefined();
      expect(response.errors).toBeUndefined();
    });
  });
};
