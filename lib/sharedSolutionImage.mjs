const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const DATA_IMAGE = /^data:image\/(jpeg|jpg|png|webp);base64,/i;
export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
export const validSolutionId = id => typeof id === 'string' && UUID.test(id);
export const solutionImagePath = id => validSolutionId(id) ? `/solution/${id}/image` : null;

// Never serialize a large data URI into SSR markup or social-image metadata.
export function sharedSolutionImageSource(value, id, apiBase = 'https://api.matematik-ai.com') {
  if (typeof value !== 'string' || !value.trim()) return null;
  const source = value.trim();
  if (DATA_IMAGE.test(source)) return solutionImagePath(id);
  if (source === solutionImagePath(id)) return source;
  try {
    const url = source.startsWith('/') && !source.startsWith('//') ? new URL(source, apiBase) : new URL(source);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return null;
    return url.href;
  } catch { return null; }
}

export function normalizeSharedQuestion(question, id, apiBase) {
  const read = (pascal, camel) => question?.[pascal] ?? question?.[camel];
  const image = read('ImageUri', 'imageUri');
  const type = read('Type', 'type');
  return {
    Id: id,
    Question: read('Question', 'question') || '',
    Solution: read('Solution', 'solution') || '',
    Steps: read('Steps', 'steps') || [],
    Type: type,
    ImageUri: sharedSolutionImageSource(image, id, apiBase),
    HasImage: Boolean(image) || Boolean(question?.HasImage) || type === 'image',
  };
}

