/** Elixderm's business address, shown in the footer and given to Mochi. */
export const ADDRESS = {
  street: "1200 Aerowood Drive, Unit 33",
  locality: "Mississauga, ON L4W 2S7",
  country: "Canada",
} as const;

export const ADDRESS_LINE = `${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.country}`;

/** Where Elixderm serves clients, as the Who We Help pages and Mochi's FAQs describe it. */
export const SERVICE_AREA =
  "We serve brands across Canada and the United States, and we ship internationally, for example to Mexico and the EU, with export documentation when required.";
