# Supabase Authentication Settings Guide

## Current Settings (What You Should Have)

### ✅ Keep ON (Recommended):

1. **"Allow new users to sign up"** - **ON** ✅
   - Users need this to create accounts
   - Keep this ON for your todo app

2. **"Confirm email"** - **ON** ✅ (or OFF for testing)
   - If ON: Users must confirm email before login
   - If OFF: Users can login immediately after signup
   - For development/testing: You can turn OFF
   - For production: Keep ON for security

### ❌ Keep OFF (Not Needed):

3. **"Allow manual linking"** - **OFF** ❌
   - Only needed if you want to manually link accounts
   - Not needed for basic todo app
   - Keep OFF

4. **"Allow anonymous sign-ins"** - **OFF** ❌
   - Only for apps that allow users without accounts
   - Not needed for todo app (users need accounts)
   - Keep OFF

## Recommended Settings for Your Todo App:

- ✅ **Allow new users to sign up:** ON
- ❌ **Allow manual linking:** OFF
- ❌ **Allow anonymous sign-ins:** OFF
- ⚠️ **Confirm email:** OFF (for testing) or ON (for production)

## For Development/Testing:

If you want to test quickly without email confirmation:
1. Turn **"Confirm email"** to **OFF**
2. Users can login immediately after signup
3. No need to check email

## For Production:

1. Keep **"Confirm email"** **ON** for security
2. Users will need to confirm email before first login

## Summary:

**You DON'T need to turn on the other 2 buttons:**
- ❌ "Allow manual linking" - Keep OFF
- ❌ "Allow anonymous sign-ins" - Keep OFF

**Current settings are fine!** Just make sure:
- ✅ "Allow new users to sign up" is ON
- ⚠️ "Confirm email" - Your choice (OFF for testing, ON for production)

