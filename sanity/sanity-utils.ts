import { createClient, groq } from "next-sanity";
import { Project } from "@/types/project";
import { Page } from "@/types/Page";
import { Product } from "@/types/Product";
import { Service } from "@/types/Service";
import clientConfig from "./config/client-config";
export async function getProjects(): Promise<Project[]> {
  return createClient(clientConfig).fetch(groq`*[_type == "project"]{
    _id,
    _createdAt,
    name,
    "slug" :slug.current,
    "image" : image.asset->url,
    url,
    content
  }`);
}
export async function getProject(slug: string): Promise<Project> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
    _id,
    _createdAt,
    name,
    "slug" :slug.current,
    "image" : image.asset->url,
    url,
    content
  }
  `,
    { slug }
  );
}

export async function getPages(): Promise<Page[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "page"]{
_id,
_createdAt,
title,
"slug":slug.current

    }`
  );
}
export async function getPage(slug: string): Promise<Page> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "page" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    "slug":slug.current,
    content
  }`,

    { slug }
  );
}

export async function getProducts(): Promise<Product[]> {
  return createClient(clientConfig).fetch(groq`*[_type == "product"]{
    _id,
    _createdAt,
    name,
    "slug": slug.current,
    menuName,
    showInMenu,
    category,
    hero {
      heading,
      description
    },
    slider {
      images[] {
        "url": image.asset->url,
        alt
      }
    }
  }`);
}

export async function getMenuProducts(): Promise<Product[]> {
  return createClient(clientConfig).fetch(groq`*[_type == "product" && showInMenu == true] | order(category asc, name asc){
    _id,
    name,
    "slug": slug.current,
    menuName,
    category
  }`);
}

export async function getProduct(slug: string): Promise<Product> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      menuName,
      showInMenu,
      category,
      seo {
        metaTitle,
        metaDescription,
        noIndex
      },
      hero {
        subheading,
        heading,
        description,
        "image": image.asset->url,
        imageAlt
      },
      value {
        heading,
        description,
        images[] {
          "url": image.asset->url,
          alt,
          heading
        }
      },
      slider {
        images[] {
          "url": image.asset->url,
          alt
        }
      },
      howItWorks {
        title,
        description,
        steps[] {
          "imageUrl": image.asset->url,
          imageAlt,
          title,
          description
        }
      },
      topCTA {
        text
      },
      features {
        heading,
        subheading,
        centerImage {
          "url": image.asset->url,
          alt
        },
        items[] {
          "image": image.asset->url,
          imageAlt,
          heading,
          subheading
        }
      },
      middleCTA {
        subheading,
        heading,
        ctaText,
        "image": image.asset->url,
        imageAlt
      },
      faq {
        title,
        subtitle,
        items[] {
          question,
          answer
        }
      },
      bottomCTA {
        text,
        buttonText
      }
    }`,
    { slug }
  );
}

export async function getServices(): Promise<Service[]> {
  return createClient(clientConfig).fetch(groq`*[_type == "service"]{
    _id,
    _createdAt,
    name,
    "slug": slug.current,
    menuName,
    showInMenu,
    category,
    hero {
      heading,
      description
    }
  }`);
}

export async function getMenuServices(): Promise<Service[]> {
  return createClient(clientConfig).fetch(groq`*[_type == "service" && showInMenu == true] | order(category asc, name asc){
    _id,
    name,
    "slug": slug.current,
    menuName,
    category
  }`);
}

export async function getService(slug: string): Promise<Service> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "service" && slug.current == $slug][0]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      menuName,
      showInMenu,
      category,
      seo {
        metaTitle,
        metaDescription,
        noIndex
      },
      hero {
        subheading,
        heading,
        description,
        ctaText,
        ctaUrl,
        "image": image.asset->url,
        imageAlt
      },
      featuresOverview {
        items[] {
          "image": image.asset->url,
          imageAlt,
          title,
          description
        }
      },
      value {
        heading,
        description,
        "image": image.asset->url,
        imageAlt
      },
      specialties {
        heading,
        description,
        items[] {
          "image": image.asset->url,
          imageAlt,
          title,
          description
        }
      },
      process {
        title,
        description,
        steps[] {
          "image": image.asset->url,
          imageAlt,
          title,
          description
        }
      },
      topCTA {
        text,
        url
      },
      productRange {
        heading,
        description,
        items[] {
          "image": image.asset->url,
          imageAlt,
          title,
          description
        }
      },
      middleCTA {
        subheading,
        heading,
        ctaText,
        ctaUrl,
        "image": image.asset->url,
        imageAlt
      },
      faq {
        title,
        subtitle,
        items[] {
          question,
          answer
        }
      },
      bottomCTA {
        text,
        buttonText,
        url
      }
    }`,
    { slug }
  );
}
