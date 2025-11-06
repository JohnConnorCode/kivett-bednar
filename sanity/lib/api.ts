/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
 */

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

// Use placeholder values if environment variables are missing to allow builds to complete
// In production, these should be properly configured in Vercel
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder-project-id'

/**
 * see https://www.sanity.io/docs/api-versioning for how versioning works
 */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-09-25'

/**
 * Used to configure edit intent links, for Presentation Mode, as well as to configure where the Studio is mounted in the router.
 */
/**
 * Base URL to the embedded Studio. Prefer NEXT_PUBLIC_SANITY_STUDIO_URL when provided,
 * otherwise derive it from NEXT_PUBLIC_BASE_URL and the /studio mount.
 */
export const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ||
  (process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, '')}/studio`
    : 'http://localhost:3000/studio')
