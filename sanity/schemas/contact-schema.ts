import { defineType } from 'sanity'

const contact = defineType({
  name: "contact",
  title: "Contact Submissions", 
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "company",
      title: "Company",
      type: "string",
    },
    {
      name: "hasBrand",
      title: "Has Brand",
      type: "string",
    },
    {
      name: "packagingIdeas",
      title: "Packaging Ideas",
      type: "text",
    },
    {
      name: "productType",
      title: "Product Type",
      type: "string",
    },
    {
      name: "timeline",
      title: "Timeline",
      type: "string",
    },
    {
      name: "quantity",
      title: "Quantity",
      type: "string",
    },
    {
      name: "formulation",
      title: "Formulation",
      type: "string",
    },
    {
      name: "vision",
      title: "Vision",
      type: "text",
    },
    {
      name: "targetMarket",
      title: "Target Market Location",
      type: "string",
    },
    {
      name: "businessStage",
      title: "Business Stage",
      type: "string",
    },
    {
      name: "hasBenchmarkProduct",
      title: "Has Benchmark Product",
      type: "string",
    },
    {
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted", value: "contacted" },
          { title: "In Progress", value: "in-progress" },
          { title: "Completed", value: "completed" },
        ],
      },
      initialValue: "new",
    },
  ],
  // Custom preview for list view
  preview: {
    select: {
      title: 'name',
      subtitle: 'company',
      email: 'email',
      submittedAt: 'submittedAt'
    },
    prepare(value: any) {
      const { title, subtitle, email, submittedAt } = value;
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString() : 'No date';
      return {
        title: `${title} (${subtitle})`,
        subtitle: `${email} • ${date}`,
      };
    },
  },
  // Custom list view configuration
  orderings: [
    {
      title: 'Newest First',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }]
    },
    {
      title: 'Oldest First', 
      name: 'submittedAtAsc',
      by: [{ field: 'submittedAt', direction: 'asc' }]
    },
    {
      title: 'Status',
      name: 'status',
      by: [{ field: 'status', direction: 'asc' }]
    },
    {
      title: 'Company Name',
      name: 'company',
      by: [{ field: 'company', direction: 'asc' }]
         }
   ]
});

export default contact; 