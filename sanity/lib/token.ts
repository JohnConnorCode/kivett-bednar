import 'server-only'

// Make token optional at build-time to avoid failing deployments if env is not configured yet.
// Features that require a token (draft mode, visual editing) will simply be disabled until set.
export const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_VIEWER_TOKEN || undefined
