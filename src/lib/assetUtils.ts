/**
 * Utility functions for handling asset paths in both development and production environments
 */

/**
 * Returns the correct base path for assets based on the current environment
 * In production, this will include the base path from vite.config.ts
 */
export function getBasePath(): string {
  // Check if we're in production by looking at the import.meta.env.MODE
  // This is set by Vite based on the environment
  const isProd = import.meta.env.MODE === 'production';
  return isProd ? '/ui-tribe-gms-complete' : '';
}

/**
 * Prefixes an asset path with the correct base path for the current environment
 * @param path The asset path (should start with a forward slash)
 * @returns The full path including the base path if needed
 */
export function getAssetPath(path: string): string {
  // Ensure path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getBasePath()}${normalizedPath}`;
}
