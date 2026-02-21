import { defineField, defineType } from 'sanity'

export const oatkType = defineType({
  name: 'oatk',
  title: 'OATK Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'OATK',
    }),
    defineField({
      name: 'content',
      title: 'Main Description',
      type: 'array', 
      // This 'block' type is what creates the Rich Text Editor (Bold, Italic, etc.)
      of: [{ type: 'block' }],
      description: 'Describe OATK here. Use Bold, Italics, and Lists as needed.'
    }),
  ],
})