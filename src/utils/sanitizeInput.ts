/**
 * Sanitizes user input to prevent unwanted characters or potential injection.
 * This function removes script tags, trims whitespace, and escapes special characters.
 */
export const sanitizeInput = (input: string): string => {
  const trimmed = input.trim();

  // Remove HTML/script tags and special chars like <, >, &, etc.
  const sanitized = trimmed
    .replace(/<script.*?>.*?<\/script>/gi, "")
    .replace(/[<>{}[\];]/g, "") // Remove suspicious characters
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
  return sanitized;
};
