import { defineField, defineType } from 'sanity'


export const historyType = defineType({
  name: 'historyPage',
  title: 'History Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Our History',
    }),
    defineField({
      name: 'tables',
      title: 'History Tables',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'historyTable',
          title: 'History Table',
          fields: [
            { name: 'heading', type: 'string', title: 'Table Heading (e.g., Club Champions)' },
            {
              name: 'rows',
              title: 'Table Rows',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'season', type: 'string', title: 'Season' },
                    { name: 'name', type: 'string', title: 'Name' },
                  ],
                  // This makes the rows look clean in the Studio list
                  preview: {
                    select: { title: 'name', subtitle: 'season' }
                  }
                }
              ]
            }
          ]
        }
      ]
    })
  ]
})