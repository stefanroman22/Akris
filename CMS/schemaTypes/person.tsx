import {defineField, defineType} from 'sanity'

export const personType = defineType({
  name: 'person',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true }, // Allows client to crop the face perfectly
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'function',
      type: 'string',
      description: 'e.g. Chair, Treasurer, Member',
    }),
    defineField({
      name: 'quote',
      type: 'text',
      rows: 2,
    }),
  ],
})