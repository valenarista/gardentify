/**
 * Returns true if app is in production or false if in development.
 */
export const __PROD__: boolean = process.env.NODE_ENV === 'production';

/**
 * Returns the port used on production
 */
export const __PORT__ = process.env.PORT || 4000;
