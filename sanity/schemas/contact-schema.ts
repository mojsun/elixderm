const contact = {
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
      name: "phone",
      title: "Phone",
      type: "string",
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
      name: "budget",
      title: "Budget",
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
};

export default contact; 