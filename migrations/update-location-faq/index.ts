import { at, defineMigration, set } from "sanity/migrate";
import chatbotFaqs from "../../sanity/data/chatbot-faqs";

const QUESTION = "Where are you located?";
const answer = chatbotFaqs.find((faq) => faq.question === QUESTION)?.answer;
if (!answer) throw new Error(`The seed data has no "${QUESTION}" FAQ`);

/**
 * Copies the answer to Mochi's "Where are you located?" FAQ from
 * sanity/data/chatbot-faqs.ts, which gives the business address and service
 * area, to the FAQ document in Sanity.
 *
 * Dry run: npx sanity migration run update-location-faq
 * Apply:   npx sanity migration run update-location-faq --no-dry-run
 */
export default defineMigration({
  title: "Give Mochi's location FAQ the business address and service area",
  documentTypes: ["chatbotFaq"],
  filter: `question == "${QUESTION}"`,
  migrate: {
    document(doc) {
      if (doc.answer !== answer) return at("answer", set(answer));
    },
  },
});
