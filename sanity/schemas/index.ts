import { defineType } from 'sanity'
import project from "./project-schema";
import page from "./page-schema";
import contact from "./contact-schema";
import homeContact from "./home-contact-schema";
import product from "./product-schema";

const schemas = [project, page, contact, homeContact, product];

export default schemas;
