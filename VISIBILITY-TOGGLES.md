# Content Visibility Toggles

## How to Use

You can now show/hide any section of the homepage from Sanity Studio.

### Location in Sanity Studio

1. Go to **Home Page** document
2. Click the **Section Visibility** tab at the top
3. Toggle any section on/off

### Available Toggles

| Toggle | Section | Default |
|--------|---------|---------|
| Show About Section | "Musician, Amp Maker, Artist" section | ON |
| Show Album Section | Featured album section | ON |
| Show Upcoming Shows Section | Upcoming shows on homepage | ON |
| Show Lessons CTA Section | Lessons call-to-action | ON |
| Show Booking Section | Booking inquiry section | ON |
| Show Gallery Section | Floating gallery | ON |
| Show Studio Videos Section | Studio video embeds | ON |
| Show Newsletter Section | Newsletter signup | ON |

### How It Works

- When a toggle is OFF, that entire section is completely hidden from the page
- No blank space is left - the section is removed from the DOM
- Changes take effect immediately after publishing in Sanity
- All toggles default to ON (true) so nothing is hidden by default

### Setting Defaults

All visibility fields are already set to `true` by default in Sanity. If you need to change them:

```bash
npx tsx scripts/set-visibility-defaults.ts
```

This will ensure all visibility toggles are set to true (visible) for existing content.
