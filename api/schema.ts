import { makeSchema } from 'nexus';
import path from 'path';

import * as query from './query/query';

export const schema = makeSchema({
  types: [query],
  outputs: {
    typegen: path.join(process.cwd(), '/nexus-typegen.ts'),
    schema: path.join(process.cwd(), '/schema.graphql'),
  },
});
