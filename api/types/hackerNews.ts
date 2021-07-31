import { objectType } from 'nexus';

export const HackerNews = objectType({
  name: 'HackerNews',
  definition(t) {
    t.string('id');
    t.string('title');
    t.string('uri');
    t.string('author');
    t.string('hours');
    t.string('points');
    t.string('comments');
    t.int('rank');
  },
});
