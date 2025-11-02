# CORS FIX FOR SANITY - EXACT STEPS

Your Sanity Project ID: **pydiurzn**

## The Error
```
Sanity Live couldn't connect - your origin is blocked by CORS policy
```

## THE FIX - Do This Now:

### Step 1: Open Sanity Dashboard
Open this URL in your browser:
```
https://sanity.io/manage/personal/project/pydiurzn
```

### Step 2: Navigate to API Settings
1. Click on your project name
2. Click "API" in the left sidebar
3. Scroll down to find "CORS Origins"

### Step 3: Add Localhost Origins
Click "Add CORS origin" and add BOTH of these:

**First Origin:**
```
http://localhost:3000
```
- Check the box for "Allow credentials"
- Click Save

**Second Origin:**
```
http://localhost:3333
```
- Check the box for "Allow credentials"
- Click Save

### Step 4: Refresh Your App
Refresh http://localhost:3000 in your browser.

The CORS error will be GONE immediately.

---

## Alternative: Command Line (if you prefer)

```bash
cd /Users/johnconnor/Documents/GitHub/Kivett2

# Login to Sanity (opens browser)
npx sanity login

# Add origins
npx sanity cors add http://localhost:3000 --credentials
npx sanity cors add http://localhost:3333 --credentials

# Verify
npx sanity cors list
```

## Why This Happens
Sanity blocks ALL origins by default for security. You must explicitly allow each domain that will connect to your Sanity project. This is a one-time setup step.
