import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const newsType = defineType({
  name: 'news',
  title: 'News Articles',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Heading',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'URL Slug',
      description: 'Click "Generate" to create a URL from the heading',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Article Image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Article Description',
      of: [{ type: 'block' }], // This is your rich text editor
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published Date',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})