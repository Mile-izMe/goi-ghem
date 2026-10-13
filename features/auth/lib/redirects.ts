export const DEFAULT_AUTH_REDIRECT = "/app/plans";

// Only allow existing workspace routes; never redirect to a URL from user input.
export function getAuthRedirect(requested: string | null | undefined) {
  return requested &&
    requested === requested.trim() &&
    /^\/app(?:\/(?:plans(?:\/[a-zA-Z0-9_-]+)?|items|templates))?$/.test(
      requested,
    )
    ? requested
    : DEFAULT_AUTH_REDIRECT;
}
