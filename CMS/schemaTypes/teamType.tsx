import {defineField, defineType} from 'sanity'

export const teamType = defineType({
  name: 'teamPage',
  title: 'Team Page Organization',
  type: 'document',
  fields: [
    defineField({
      name: 'sections',
      title: 'Team Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'category',
          fields: [
            { name: 'categoryName', type: 'string', title: 'Category Title' }, // e.g. "Board"
            {
              name: 'members',
              type: 'array',
              title: 'Members in this category',
              of: [{ type: 'reference', to: [{ type: 'person' }] }],
            },
          ],
        },
      ],
    }),
  ],
})