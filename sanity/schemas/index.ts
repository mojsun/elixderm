import { defineType } from 'sanity'
import project from "./project-schema";
import page from "./page-schema";
import contact from "./contact-schema";
import homeContact from "./home-contact-schema";
import product from "./product-schema";
import service from "./service-schema";

const schemas = [project, page, contact, homeContact, product, service];

export default schemas;
