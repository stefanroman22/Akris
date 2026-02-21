import {defineField, defineType} from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero Content',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3, 
      validation: (rule) => rule.required(),
    }),
  ],
})