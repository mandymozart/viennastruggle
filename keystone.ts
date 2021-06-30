import { text } from '@keystone-next/fields';
import { config, list } from '@keystone-next/keystone/schema';

const Project = list({
  fields: {
    title: text({ isRequired: true }),
    slug: text(),
    content: text(),
  },
});

export default config({
  db: { provider: 'sqlite', url: 'file:./app.db' },
  experimental: {
    generateNextGraphqlAPI: true,
    generateNodeAPI: true,
  },
  lists: { Project },
});