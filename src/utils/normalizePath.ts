//NOTE: Removes trailing slashes to ensure consistent path comparisons across environments (e.g., "/example" vs "/example/").
export const normalizePath = (path: string): string => path.replace(/\/+$/, '');