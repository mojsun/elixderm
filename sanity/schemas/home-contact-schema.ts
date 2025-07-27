import { defineType } from 'sanity'

export default defineType({
  name: 'homeContact',
  title: 'Home Contact Submissions',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'projectDescription',
      title: 'Project Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Progress', value: 'in_progress' },
          { title: 'Completed', value: 'completed' },
        ],
      },
      initialValue: 'new',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      description: 'projectDescription',
    },
    prepare(value: any) {
      const { title, subtitle, description } = value;
      return {
        title: `${title} (${subtitle})`,
        subtitle: description ? description.substring(0, 100) + '...' : 'No description',
      };
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
    {
      title: 'Oldest First',
      name: 'submittedAtAsc',
      by: [{ field: 'submittedAt', direction: 'asc' }],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
}); 