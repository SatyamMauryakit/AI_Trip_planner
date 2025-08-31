# AI Trip Planner Setup Guide

## Issues Fixed

1. **API Issues**: Fixed JSON parsing errors and improved error handling
2. **Auto-submit Issues**: Removed automatic submission when selecting options
3. **Navigation Issues**: Fixed input handling between Hero and Chatbox components
4. **Authentication Issues**: Updated middleware to properly handle API routes

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# OpenRouter API Key (for GPT-4)
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Clerk Authentication (if using)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### 2. Get OpenRouter API Key

1. Go to [OpenRouter](https://openrouter.ai/)
2. Sign up and create an account
3. Get your API key from the dashboard
4. Copy the key and paste it in your `.env.local` file

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

## How It Works Now

### Hero Page

- Users can type in the textarea
- Clicking suggestions fills the textarea (doesn't auto-submit)
- Press Enter or click Send button to navigate to create trip page
- Input is stored in sessionStorage and passed to the next page

### Create Trip Page

- Receives initial input from Hero page
- Shows EmptyBoxState with suggestions
- Clicking suggestions fills the input (doesn't auto-submit)
- Users must manually click Send or press Enter to submit
- Proper error handling for API calls

### API Route

- Uses OpenRouter with GPT-4 model
- Requires authentication
- Handles JSON parsing errors gracefully
- Provides fallback responses when API doesn't return valid JSON
- Better error messages for different scenarios

## Troubleshooting

### API Not Working

1. Check if `.env.local` file exists with `OPENROUTER_API_KEY`
2. Verify the API key is valid
3. Check browser console for error messages
4. Ensure you're signed in (authentication required)

### Auto-submit Issues

- Fixed: Options no longer auto-submit
- Users must manually click Send or press Enter
- Input is preserved for review before sending

### Navigation Issues

- Fixed: Input from Hero page is properly passed to Chatbox
- SessionStorage is used to transfer data between pages
- Data is cleared after being read to prevent duplicates

## Features

- ✅ Proper input handling
- ✅ No auto-submit on option selection
- ✅ Error handling for API calls
- ✅ Authentication protection
- ✅ Graceful JSON parsing
- ✅ User-friendly error messages
- ✅ Input persistence between pages
- ✅ GPT-4 powered AI responses
