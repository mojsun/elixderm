import { createClient, groq } from "next-sanity";
import { Project } from "@/types/project";
import { Page } from "@/types/Page";
import { Product } from "@/types/Product";
import { Service } from "@/types/Service";
import { BlogPost } from "@/types/BlogPost";
import { Author } from "@/types/Author";
import { WhoWeHelp } from "@/types/WhoWeHelp";
import { News } from "@/types/News";
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
      description,
      "image": image.asset->url,
      imageAlt
    }
  }`);
}

export async function getMenuServices(): Promise<Service[]> {
  return createClient(clientConfig).fetch(groq`*[_type == "service" && showInMenu == true] | order(menuOrder asc, name asc){
    _id,
    name,
    "slug": slug.current,
    menuName,
    menuDescription,
    menuOrder,
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

// Blog Posts Functions
export async function getBlogPosts(): Promise<BlogPost[]> {
  return createClient(clientConfig).fetch(groq`*[_type == "blogPost"] | order(publishedAt desc){
    _id,
    _createdAt,
    title,
    "slug": slug.current,
    excerpt,
    "featuredImage": featuredImage{
      "url": asset->url,
      alt
    },
    author->{
      _id,
      name,
      "slug": slug.current,
      "image": image{
        "url": asset->url,
        alt
      },
      title,
      bio,
      linkedinUrl,
      expertise,
      featured
    },
    publishedAt,
    category,
    readingTime,
    featured
  }`);
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  return createClient(clientConfig).fetch(groq`*[_type == "blogPost" && featured == true] | order(publishedAt desc){
    _id,
    _createdAt,
    title,
    "slug": slug.current,
    excerpt,
    "featuredImage": featuredImage{
      "url": asset->url,
      alt
    },
    author->{
      _id,
      name,
      "slug": slug.current,
      "image": image{
        "url": asset->url,
        alt
      },
      title,
      bio,
      linkedinUrl,
      expertise,
      featured
    },
    publishedAt,
    category,
    readingTime,
    featured
  }`);
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "blogPost" && slug.current == $slug][0]{
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      excerpt,
      "featuredImage": featuredImage{
        "url": asset->url,
        alt
      },
      author->{
        _id,
        name,
        "slug": slug.current,
        "image": image{
          "url": asset->url,
          alt
        },
        title,
        bio,
        linkedinUrl,
        expertise,
        featured
      },
      publishedAt,
      category,
      content,
      readingTime,
      featured,
      seo {
        metaTitle,
        metaDescription,
        noIndex
      }
    }`,
    { slug }
  );
}

export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "blogPost" && category == $category] | order(publishedAt desc){
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      excerpt,
      "featuredImage": featuredImage{
        "url": asset->url,
        alt
      },
      author->{
        _id,
        name,
        "slug": slug.current,
        "image": image{
          "url": asset->url,
          alt
        },
        title,
        bio,
        linkedinUrl,
        expertise,
        featured
      },
      publishedAt,
      category,
      readingTime,
      featured
    }`,
    { category }
  );
}

export async function getRecentBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  return createClient(clientConfig).fetch(groq`*[_type == "blogPost"] | order(publishedAt desc)[0...${limit}]{
    _id,
    _createdAt,
    title,
    "slug": slug.current,
    excerpt,
    "featuredImage": featuredImage{
      "url": asset->url,
      alt
    },
    author->{
      _id,
      name,
      "slug": slug.current,
      "image": image{
        "url": asset->url,
        alt
      },
      title,
      bio,
      linkedinUrl,
      expertise,
      featured
    },
    publishedAt,
    category,
    readingTime,
    featured
  }`);
}

// Author Functions
export async function getAuthors(): Promise<Author[]> {
  return createClient(clientConfig).fetch(groq`*[_type == "author"] | order(name asc){
    _id,
    _createdAt,
    name,
    "slug": slug.current,
    "image": image{
      "url": asset->url,
      alt
    },
    title,
    bio,
    linkedinUrl,
    expertise,
    featured
  }`);
}

export async function getFeaturedAuthors(): Promise<Author[]> {
  return createClient(clientConfig).fetch(groq`*[_type == "author" && featured == true] | order(name asc){
    _id,
    _createdAt,
    name,
    "slug": slug.current,
    "image": image{
      "url": asset->url,
      alt
    },
    title,
    bio,
    linkedinUrl,
    expertise,
    featured
  }`);
}

export async function getAuthor(slug: string): Promise<Author> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "author" && slug.current == $slug][0]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "image": image{
        "url": asset->url,
        alt
      },
      title,
      bio,
      linkedinUrl,
      expertise,
      featured,
      seo {
        metaTitle,
        metaDescription
      }
    }`,
    { slug }
  );
}

export async function getBlogPostsByAuthor(authorSlug: string): Promise<BlogPost[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "blogPost" && author->slug.current == $authorSlug] | order(publishedAt desc){
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      excerpt,
      "featuredImage": featuredImage{
        "url": asset->url,
        alt
      },
      author->{
        _id,
        name,
        "slug": slug.current,
        "image": image{
          "url": asset->url,
          alt
        },
        title,
        bio,
        linkedinUrl,
        expertise,
        featured
      },
      publishedAt,
      category,
      readingTime,
      featured
    }`,
    { authorSlug }
  );
}

// Who We Help Functions
export async function getWhoWeHelps(): Promise<WhoWeHelp[]> {
  return createClient(clientConfig).fetch(groq`*[_type == "whoWeHelp"]{
    _id,
    _createdAt,
    name,
    "slug": slug.current,
    menuName,
    showInMenu,
    category,
    hero {
      heading,
      description,
      "image": image.asset->url,
      imageAlt
    }
  }`);
}

export async function getMenuWhoWeHelps(): Promise<WhoWeHelp[]> {
  return createClient(clientConfig).fetch(groq`*[_type == "whoWeHelp" && showInMenu == true] | order(category asc, name asc){
    _id,
    name,
    "slug": slug.current,
    menuName,
    category
  }`);
}

export async function getWhoWeHelp(slug: string): Promise<WhoWeHelp> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "whoWeHelp" && slug.current == $slug][0]{
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

// News Functions
export async function getNews(): Promise<News[]> {
  return createClient(clientConfig).fetch(groq`*[_type == "news" && isPublished == true] | order(publishDate desc){
    _id,
    _createdAt,
    title,
    content[]{
      ...,
      _type == 'image' => {
        ...,
        asset->{
          _id,
          url
        }
      }
    },
    publishDate,
    isPublished
  }`);
}

export async function getAllNews(): Promise<News[]> {
  return createClient(clientConfig).fetch(groq`*[_type == "news"] | order(publishDate desc){
    _id,
    _createdAt,
    title,
    content[]{
      ...,
      _type == 'image' => {
        ...,
        asset->{
          _id,
          url
        }
      }
    },
    publishDate,
    isPublished
  }`);
}

export async function getRecentNews(limit: number = 5): Promise<News[]> {
  return createClient(clientConfig).fetch(groq`*[_type == "news" && isPublished == true] | order(publishDate desc)[0...${limit}]{
    _id,
    _createdAt,
    title,
    content[]{
      ...,
      _type == 'image' => {
        ...,
        asset->{
          _id,
          url
        }
      }
    },
    publishDate,
    isPublished
  }`);
}
