export const normalizeImageSrc = (value, fallback) => {
  if (typeof value !== "string") return fallback;

  const src = value.trim();
  if (!src) return fallback;

  if (src.startsWith("/")) return src;
  if (src.startsWith("data:image/")) return src;

  try {
    const url = new URL(src);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return src;
    }
  } catch {
    return fallback;
  }

  return fallback;
};