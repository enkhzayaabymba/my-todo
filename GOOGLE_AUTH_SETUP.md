# Google Authentication Setup Guide

## Step 1: Enable Google Provider in Supabase

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Providers**
3. Find **Google** in the list and click on it
4. Toggle **Enable Google provider** to ON

## Step 2: Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Choose **Web application** as the application type
6. Add authorized redirect URIs:
   - `https://your-project-ref.supabase.co/auth/v1/callback`
   - (You can find your project ref in Supabase Settings → API)

## Step 3: Add Credentials to Supabase

1. Copy the **Client ID** and **Client Secret** from Google Cloud Console
2. Go back to Supabase → **Authentication** → **Providers** → **Google**
3. Paste the **Client ID** and **Client Secret**
4. Click **Save**

## Step 4: Update Redirect URL (if needed)

The redirect URL in the code is set to `/auth/callback`. Make sure this matches your Supabase project settings.

## Step 5: Test the Authentication

1. Start your Next.js dev server: `npm run dev`
2. Go to `/login` page
3. Click "Continue with Google"
4. You should be redirected to Google's login page
5. After logging in, you'll be redirected back to your app

## Troubleshooting

- **Error: redirect_uri_mismatch**
  - Make sure the redirect URI in Google Cloud Console matches your Supabase callback URL exactly
  - Format: `https://your-project-ref.supabase.co/auth/v1/callback`

- **Error: invalid_client**
  - Verify your Client ID and Client Secret are correct in Supabase
  - Make sure you copied the entire values without extra spaces

- **Not redirecting after login**
  - Check that the `/auth/callback/route.ts` file exists
  - Verify the redirect URL in the login page matches your domain

