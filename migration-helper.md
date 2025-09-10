# Blog Author Migration Guide

## Issue
Existing blog posts have author as string ("Rasoul") but new schema expects author references.

## Solution Steps

### Step 1: Create Author Profile in Sanity
1. Go to your Sanity Studio (`/admin`)
2. Click "Authors" in the left menu
3. Click "Create" to add new author
4. Fill in the details:
   - **Name**: Rasoul
   - **Slug**: rasoul (will auto-generate)
   - **Profile Image**: Upload an image
   - **Professional Title**: (e.g., "Beauty Industry Expert", "Formulation Chemist")
   - **Biography**: Write a brief bio
   - **LinkedIn URL**: (optional)
   - **Expertise**: Add relevant tags
   - **Featured**: Check if you want to feature this author

### Step 2: Update Existing Blog Posts
1. In Sanity Studio, go to "Blog Posts"
2. Open each post that shows the "Invalid property value" error
3. In the "Author" field, you'll see the error message
4. Click the "Author" dropdown and select "Rasoul" from the list
5. Save the post

### Step 3: Verification
- Visit `/learn` to see all posts display correctly
- Visit `/learn/author/rasoul` to see the author profile
- Check individual blog posts show the author info properly

## Alternative: Temporary Fallback
If you want to handle this programmatically, I can modify the code to handle both string and reference types during the transition period.
