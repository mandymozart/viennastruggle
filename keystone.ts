import { checkbox, float, relationship, select, text, timestamp } from '@keystone-next/fields';
import { config, createSchema, list } from '@keystone-next/keystone/schema';

const lists = createSchema({
  Activity: list({
    fields: {
      hours: float(),
      isConfirmed: checkbox({ defaultValue: true }),
      assignedTo: relationship({ ref: 'Person', many: false }),
      finishBy: timestamp(),
    },
  }),
  Project: list({
    fields: {
      title: text({ isRequired: true }),
      slug: text({ isRequired: true}),
      image: text(),
      video: text(),
      projectId: text({ isUnique: true}),
      description: text({ isRequired: true}),
      tags: text(),
      priority: select({
        dataType: 'enum',
        options: [
          { label: 'Low', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High', value: 'high' },
        ],
      }),
      status: select({
        dataType: 'enum',
        options: [
          { label: 'Draft', value: 'draft' },
          { label: 'Open Call', value: 'opencall' },
          { label: 'Done', value: 'done' },
        ],
        defaultValue: 'draft',
        isRequired: true
      }),
      leads: relationship({ ref: 'Person'}),
      owner: relationship({ ref: 'Person', many: true}),
      collaborators: relationship({ ref: 'Person', many: true }),
      applicants: relationship({ ref: 'Person', many: true }),
    },
  }),
  Person: list({
    fields: {
      name: text({ isRequired: true }),
      alias: text(),
      auth0Id: text({ isUnique: true, isRequired: true}),
      roles: relationship({ref: 'Role', many: true}),
      activities: relationship({ ref: 'Activity', many: true }),
      applications: relationship({ ref: 'Project', many: true}),
      collaborations: relationship({ ref: 'Project', many: true}),
      sessions: relationship({ ref: 'Session', many: true}),
    },
  }),
  Role: list({
    fields: {
      name: text({isUnique: true,  isRequired: true}),
      description: text(),
    }
  }),
  Session: list({
    fields: {
      title: text({isRequired: true}),
      description: text(),
      slug: text({ isRequired: true}),
      image: text(),
      owner: relationship({ ref: 'Person', many: false}),
      inviteOnly: checkbox({ defaultValue: false}),
      invited: relationship({ ref: 'Person', many: true})
    }
  })
});

export default config({
  db: { provider: 'sqlite', url: 'file:./app.db' },
  experimental: {
    generateNextGraphqlAPI: true,
    generateNodeAPI: true,
  },
  lists: lists,
});