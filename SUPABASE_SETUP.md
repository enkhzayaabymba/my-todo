# Supabase Setup Guide

## Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details and create the project

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

## Step 3: Create Environment Variables

1. Create a `.env.local` file in the root of your project (same level as `package.json`)
2. Add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace `your-project-url-here` and `your-anon-key-here` with the values from Step 2.

## Step 4: Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Open the `supabase-schema.sql` file from this project
3. Copy and paste the SQL code into the SQL Editor
4. Click "Run" to execute the SQL

This will create:
- A `tasks` table
- Row Level Security (RLS) policies

## Step 5: (Optional) Disable Authentication

If you want to use the app without authentication, you can modify the SQL policies. See the comments in `supabase-schema.sql` for the public access option.

## Step 6: Test the Connection

1. Restart your Next.js dev server:
   ```bash
   npm run dev
   ```
2. Go to your todo list page
3. Try adding a task - it should save to Supabase!

## Troubleshooting

- **Error: Missing Supabase environment variables**
  - Make sure `.env.local` exists and has the correct variable names
  - Restart your dev server after creating/updating `.env.local`

- **Error: relation "tasks" does not exist**
  - Make sure you ran the SQL schema in Step 4

- **Tasks not saving**
  - Check the browser console for errors
  - Verify your API keys are correct in `.env.local`

