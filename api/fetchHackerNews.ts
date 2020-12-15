import axios from 'axios';
import cheerio from 'cheerio';
import _ from 'lodash';

export const fetchHackerNews = async (pageNumber?: number): Promise<any[]> => {
  const idList: any[] = [];
  const firstList: any[] = [];
  const secondList: any[] = [];
  const thirdList: any[] = [];

  let response: any = null;
  if (!pageNumber) {
    response = await axios.get(`https://news.ycombinator.com/news`);
  } else {
    response = await axios.get(`https://news.ycombinator.com/news?p=${pageNumber}`);
  }

  if (response) {
    const responseData = response.data;
    if (responseData) {
      const html = responseData;

      const $ = cheerio.load(html);

      $('table.itemlist tbody tr.athing').each((i, element) => {
        const currentItem = $(element);
        const id = currentItem.attr('id');
        console.log('id = ', id);

        const obj = {
          id: id,
        };
        idList.push(obj);
      });

      $('table.itemlist tbody tr td.title:nth-child(1)').each((i, element) => {
        const currentItem = $(element);

        const rank = currentItem.find('.rank').text().replace('.', '');
        if (rank) {
          console.log('rank = ', rank);

          const obj = {
            rank: rank,
          };
          firstList.push(obj);
        }
      });

      $('table.itemlist tbody tr td.title:nth-child(3)').each((i, element) => {
        const currentItem = $(element);

        const title = currentItem.text();
        const uri = currentItem.find('a.storylink').attr('href');
        if (title && uri) {
          console.log('title = ', title);
          console.log('uri = ', uri);

          const newObj = {
            title: title,
            uri: uri,
          };
          secondList.push(newObj);
        }
      });

      $('table.itemlist tbody tr')
        .not('.athing .spacer')
        .each((i, element) => {
          const currentItem = $(element);

          const subtext = currentItem.find('.subtext').children();
          const author = $(subtext).eq(1).text();

          const hoursDiv = $(subtext).eq(2).children();
          const hours = $(hoursDiv).eq(0).text();

          const points = $(subtext).eq(0).text();
          const comments = $(subtext).eq(5).text();

          if (author && hours && points && comments) {
            console.log('author = ', author);
            console.log('hours = ', hours);
            console.log('points = ', points);
            console.log('comments = ', comments);

            const newObj = {
              author: author,
              hours: hours,
              points: points,
              comments: comments,
            };
            thirdList.push(newObj);
          }
        });
    }
  }

  const hackerNewsList = _.merge(idList, firstList, secondList, thirdList);

  return hackerNewsList;
};
