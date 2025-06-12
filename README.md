# ADAS Safe Website

## Setup

1. Copy `.env.example` to `.env` with your Supabase credentials
2. Create database tables (SQL below)
3. Set up storage bucket for resume uploads

## Database Setup

Run this in Supabase SQL editor:

```sql
CREATE TABLE contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text,
  last_name text,
  email text,
  phone text,
  message text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE career_applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text,
  last_name text,
  phone text,
  email text,
  experience_years text,
  country text,
  address_line_1 text,
  address_line_2 text,
  city text,
  state text,
  zip_code text,
  resume_url text,
  resume_filename text,
  resume_file_size integer,
  created_at timestamp DEFAULT now()
);

-- Disable RLS for form submissions
ALTER TABLE contact_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE career_applications DISABLE ROW LEVEL SECURITY;
```

## Configuration

Edit `js/config.js`:
- `fileUpload`: Enable/disable resume uploads  
- `debugMode`: Console logging for development

## File Structure

- `index.html` - Homepage
- `mobile.html` - Mobile services  
- `careers.html` - Careers page with application form
- `contact.html` - Contact form
- `js/config.js` - Configuration and credentials
- `js/forms.js` - Form handling and Supabase integration
- `js/main.js` - General site functionality

## Common Issues

**Forms not working**: Check console errors and verify Supabase credentials in config.js

**File upload failing**: Storage RLS is blocking uploads. Either fix storage policies in Supabase dashboard or keep fileUpload disabled.

**Database errors**: Make sure tables exist and RLS is disabled per SQL above.
