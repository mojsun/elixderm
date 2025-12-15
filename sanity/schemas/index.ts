import { defineType } from 'sanity'
import project from "./project-schema";
import page from "./page-schema";
import contact from "./contact-schema";
import homeContact from "./home-contact-schema";
import product from "./product-schema";
import service from "./service-schema";
import blogPost from "./blog-post-schema";
import author from "./author-schema";
import whoWeHelp from "./who-we-help-schema";
import news from "./news-schema";
import productOptions from "./product-options-schema";

const schemas = [project, page, contact, homeContact, product, service, blogPost, author, whoWeHelp, news, productOptions];

export default schemas;
