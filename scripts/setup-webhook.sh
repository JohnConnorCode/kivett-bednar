#!/bin/bash

# Sanity Webhook Setup Script
# This script creates a webhook for instant content updates

set -e

PROJECT_ID="pydiurzn"
DATASET="production"
WEBHOOK_NAME="Production Site Revalidation"
SECRET="kivett-revalidate-secret-2025"

# Check if production URL is provided
if [ -z "$1" ]; then
  echo "Usage: ./scripts/setup-webhook.sh <your-production-url>"
  echo "Example: ./scripts/setup-webhook.sh https://kivettbednar.com"
  echo ""
  echo "For local testing with ngrok:"
  echo "  1. Run: ngrok http 3000"
  echo "  2. Use the ngrok URL: ./scripts/setup-webhook.sh https://abc123.ngrok.io"
  exit 1
fi

PRODUCTION_URL="$1"
WEBHOOK_URL="${PRODUCTION_URL}/api/revalidate"

echo "Setting up Sanity webhook..."
echo "Project ID: $PROJECT_ID"
echo "Dataset: $DATASET"
echo "Webhook URL: $WEBHOOK_URL"
echo ""

# Check if user is logged in
if ! npx sanity projects list &> /dev/null; then
  echo "Not logged in to Sanity. Logging in..."
  npx sanity login
fi

# Create the webhook using Sanity CLI
echo "Creating webhook..."
npx sanity hook create \
  --project "$PROJECT_ID" \
  --dataset "$DATASET" \
  --name "$WEBHOOK_NAME" \
  --url "$WEBHOOK_URL" \
  --secret "$SECRET" \
  --on "create,update,delete"

echo ""
echo "✅ Webhook created successfully!"
echo ""
echo "The webhook will trigger on all content changes (create, update, delete)"
echo "and automatically revalidate your site for instant updates."
echo ""
echo "To test it:"
echo "1. Make a change in Sanity Studio"
echo "2. Check your site - updates should appear in 1-2 seconds!"
