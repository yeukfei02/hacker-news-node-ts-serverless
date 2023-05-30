import axios from "axios";
import cheerio from "cheerio";
import _ from "lodash";

interface Id {
  id: string | undefined;
}

interface Rank {
  rank: string;
}

interface TitleAndUrl {
  title: string;
  uri: string;
}

interface AuthorAndHoursAndPointsAndComments {
  author: string;
  hours: string;
  points: string;
  comments: string;
}

export const fetchHackerNews = async (pageNumber?: number): Promise<any[]> => {
  const idList: Id[] = [];
  const rankList: Rank[] = [];
  const titleAndUrlList: TitleAndUrl[] = [];
  const authorAndHoursAndPointsAndCommentsList: AuthorAndHoursAndPointsAndComments[] =
    [];

  let response;
  if (!pageNumber) {
    response = await axios.get(`https://news.ycombinator.com/news`);
  } else {
    response = await axios.get(
      `https://news.ycombinator.com/news?p=${pageNumber}`
    );
  }

  if (response) {
    const responseData = response.data;
    if (responseData) {
      const html = responseData;

      const $ = cheerio.load(html);

      const tableBody =
        'table[border="0"][cellpadding="0"][cellspacing="0"] tbody';
      const tableBodyRow =
        'table[border="0"][cellpadding="0"][cellspacing="0"] tbody tr';

      $(`${tableBody} tr.athing`).each((i, element) => {
        const currentItem = $(element);
        const id = currentItem.attr("id");
        console.log("id = ", id);

        const obj = {
          id: id,
        };
        idList.push(obj);
      });

      $(`${tableBodyRow} td.title:nth-child(1)`).each((i, element) => {
        const currentItem = $(element);

        const rank = currentItem.find(".rank").text().replace(".", "");
        if (rank) {
          console.log("rank = ", rank);

          const obj = {
            rank: rank,
          };
          rankList.push(obj);
        }
      });

      $(`${tableBodyRow} td.title:nth-child(3)`).each((i, element) => {
        const currentItem = $(element);

        const title = currentItem.first().find("a").text();
        const uri = currentItem.first().find("a").attr("href");
        if (title && uri) {
          console.log("title = ", title);
          console.log("uri = ", uri);

          const newObj = {
            title: title,
            uri: uri,
          };
          titleAndUrlList.push(newObj);
        }
      });

      $(tableBodyRow)
        .not(".athing .spacer")
        .each((i, element) => {
          const currentItem = $(element);

          const subtext = currentItem
            .find("td.subtext > span.subline")
            .children();
          const author = $(subtext).eq(1).text();

          const hoursDiv = $(subtext).eq(2).children();
          const hours = $(hoursDiv).eq(0).text();

          const points = $(subtext).eq(0).text();
          const comments = $(subtext).eq(5).text();

          if (author && hours && points && comments) {
            console.log("author = ", author);
            console.log("hours = ", hours);
            console.log("points = ", points);
            console.log("comments = ", comments);

            const newObj = {
              author: author,
              hours: hours,
              points: points,
              comments: comments,
            };
            authorAndHoursAndPointsAndCommentsList.push(newObj);
          }
        });
    }
  }

  const hackerNewsList = _.merge(
    idList,
    rankList,
    titleAndUrlList,
    authorAndHoursAndPointsAndCommentsList
  );

  return hackerNewsList;
};
