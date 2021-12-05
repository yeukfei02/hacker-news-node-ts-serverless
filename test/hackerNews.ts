import { GraphQLClient, gql } from 'graphql-request';

const rootUrl = 'https://p2refkuv3e.execute-api.ap-southeast-1.amazonaws.com/prod';
const graphQLClient = new GraphQLClient(rootUrl);

export const hackerNewsTest = (): void => {
  describe('hackerNews test', () => {
    test('hackerNews', async () => {
      const HACKER_NEWS = gql`
        query hackerNews($pageNumber: Int) {
          hackerNews(pageNumber: $pageNumber) {
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
      const variables = { pageNumber: 1 };
      const response = await graphQLClient.request(HACKER_NEWS, variables);
      console.log('response = ', response);

      expect(response).toBeDefined();
      expect(response.hackerNews).toBeDefined();
    });
  });
};
