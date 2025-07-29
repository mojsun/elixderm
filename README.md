# 🧴 Elixderm - Professional Beauty Solutions

A modern, responsive website for Elixderm, a professional beauty and cosmetics company specializing in custom formulation and product development.

[![Next.js](https://img.shields.io/badge/Next.js-15.4.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Sanity](https://img.shields.io/badge/Sanity-CMS-F03E2F?style=flat-square&logo=sanity)](https://www.sanity.io/)

## 🚀 Live Demo

- **Production**: [elixderm.com](https://elixderm.com)
- **Sanity Studio**: [elixderm.com/admin](https://elixderm.com/admin)

## ✨ Features

### 🎨 **Modern Design**
- **Responsive Design** - Optimized for all devices
- **Tailwind CSS** - Utility-first styling for beautiful UI
- **Smooth Animations** - Engaging user experience
- **Professional Layout** - Clean, modern aesthetic

### 📝 **Content Management**
- **Sanity CMS Integration** - Headless CMS for content management
- **Real-time Updates** - Instant content synchronization
- **Rich Media Support** - Images, videos, and structured content
- **Admin Dashboard** - Easy content management interface

### 📧 **Contact Forms**
- **Dual Contact Forms**:
  - **Home Page Form** - Quick project inquiries
  - **Detailed Contact Form** - Comprehensive project details
- **Email Integration** - Resend API for reliable email delivery
- **Form Validation** - Client and server-side validation
- **Status Management** - Track inquiry progress

### 🔧 **Admin Features**
- **Contact Submission Tables** - Manage all inquiries
- **Status Updates** - New, Contacted, In Progress, Completed
- **Delete Functionality** - Remove outdated submissions
- **CSV Export** - Download contact data
- **Real-time Notifications** - Instant submission alerts

### 🏢 **Business Sections**
- **Hero Section** - Compelling company introduction
- **About Us** - Company story and values
- **Our Story** - Detailed company background
- **How It Works** - Process explanation
- **Why Elixderm** - Unique value propositions
- **Team Section** - Meet the professionals
- **Partners** - Industry partnerships
- **Philosophy** - Company principles
- **Testimonials** - Client success stories

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15.4.1 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **CMS** | Sanity.io |
| **Email** | Resend API |
| **Deployment** | Vercel |
| **Version Control** | Git + GitHub |

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Quick Start

```bash
# Clone the repository
git clone https://github.com/mojsun/elixderm.git
cd elixderm

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.




## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Sanity Studio
npm run sanity       # Start Sanity Studio locally
npm run sanity:build # Build Sanity Studio
npm run sanity:deploy # Deploy Sanity Studio
```

## 📝 API Endpoints

### Contact Forms
- `POST /api/contact` - Handle detailed contact form submissions
- `POST /api/home-contact` - Handle home page quick inquiries

### Admin Operations
- `POST /api/update-contact-status` - Update contact submission status
- `POST /api/update-home-contact-status` - Update home contact status
- `DELETE /api/delete-contact` - Delete contact submission
- `DELETE /api/delete-home-contact` - Delete home contact submission

## 🔒 Authentication

- **Sanity Studio**: Protected admin interface
- **API Routes**: Server-side validation and authentication
- **Environment Variables**: Secure configuration management

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop** (1920px+)
- **Laptop** (1024px - 1920px)
- **Tablet** (768px - 1024px)
- **Mobile** (320px - 768px)

## 🎨 Styling Guide

### Tailwind CSS Classes
- **Primary Colors**: Custom Elixderm brand colors
- **Typography**: Professional, readable font hierarchy
- **Spacing**: Consistent spacing system
- **Components**: Reusable UI components

### Custom CSS
- **Animations**: Smooth transitions and hover effects
- **Grid Layouts**: Flexible, responsive layouts
- **Form Styling**: Consistent form appearance

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

### Manual Deployment
```bash
# Build the project
npm run build

# Start production server
npm run start
```

## 📊 Content Management


### Content Types
- **Pages** - Website pages and content
- **Projects** - Portfolio items
- **Home Contact** - Quick inquiry submissions
- **Contact** - Detailed contact submissions

### Managing Submissions
- **View Tables** - All submissions in organized tables
- **Update Status** - Track inquiry progress
- **Export Data** - CSV download functionality
- **Delete Records** - Remove outdated submissions

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Use TypeScript for all new code
- Follow the existing code style
- Add proper documentation
- Test your changes thoroughly
- Update README if needed

## 📞 Support

For support, email [hello@elixderm.com](mailto:hello@elixderm.com) or visit our [contact page](https://elixderm.com/contact-us).

## 📄 License

This project is proprietary and confidential. All rights reserved by Elixderm.

---

## 🏆 Project Highlights

- ✅ **Modern Tech Stack** - Latest Next.js, TypeScript, Tailwind
- ✅ **SEO Optimized** - Server-side rendering and meta tags
- ✅ **Performance** - Optimized images, lazy loading, fast loading
- ✅ **Accessibility** - WCAG compliant, keyboard navigation
- ✅ **Mobile First** - Responsive design principles
- ✅ **CMS Integration** - Easy content management
- ✅ **Email System** - Reliable contact form handling
- ✅ **Admin Dashboard** - Comprehensive submission management

---

<div align="center">
  <strong>Built with ❤️ for Elixderm Professional Beauty Solutions</strong>
</div>
