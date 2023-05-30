import { fetchHackerNews } from "../request/fetchHackerNews";

export const hackerNewsControllerFunc = async (
  parent: any,
  args: any,
  context: any,
  info: any
): Promise<any[]> => {
  const pageNumber = args.pageNumber || 1;
  console.log("pageNumber = ", pageNumber);

  const hackerNewsList = await fetchHackerNews(pageNumber);

  return hackerNewsList;
};
