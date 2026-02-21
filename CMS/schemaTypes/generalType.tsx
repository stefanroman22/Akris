import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons' // Optional: adds a settings icon

export const generalType = defineType({
  name: 'general',
  title: 'General Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'yearFounded',
      title: 'Year Founded',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'memberCount',
      title: 'Number of Members',
      type: 'number',
      description: 'Used for statistics on the website',
    }),
    defineField({
      name: 'membershipCost',
      title: 'Membership Cost (€)',
      type: 'number',
      description: 'The annual fee for new members',
    }),
    defineField({
      name: 'currentAcademicYear',
      title: 'Current Academic Year',
      type: 'string',
      description: 'e.g., 2025/2026',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coachName',
      title: 'Head Coach Name',
      type: 'string',
      description: 'Enter the name of the main coach',
    }),
    defineField({
      name: 'trainingDays',
      title: 'Training Days',
      type: 'array',
      description: 'Select at least one and at most two training days.',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Monday', value: 'MON' },
          { title: 'Tuesday', value: 'TUE' },
          { title: 'Wednesday', value: 'WED' },
          { title: 'Thursday', value: 'THU' },
          { title: 'Friday', value: 'FRI' },
          { title: 'Saturday', value: 'SAT' },
          { title: 'Sunday', value: 'SUN' },
        ],
      },
      // Validation to enforce 1-2 days and ensure 3-character values
      validation: (Rule) => 
        Rule.required()
          .min(1)
          .max(2)
          .error('Please select between 1 and 2 training days.'),
    }),
  ],
})