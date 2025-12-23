# How to Disable Email Confirmation in Supabase

If you want users to be automatically signed in after sign up (without email confirmation), follow these steps:

## Step 1: Disable Email Confirmation in Supabase

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Settings** (or **Configuration**)
3. Find **"Enable email confirmations"** or **"Confirm email"** setting
4. Toggle it to **OFF** or **Disabled**
5. Click **Save**

## Step 2: Test Sign Up

After disabling email confirmation:
- When users sign up, they will be automatically signed in
- No email confirmation link will be sent
- Users can immediately use the app

## Note

- **For Production**: Keep email confirmation enabled for security
- **For Development**: You can disable it for easier testing
- The code already handles both cases automatically

