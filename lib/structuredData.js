export const publisherIdentity = {
  '@type': 'Organization',
  '@id': 'https://matematik-ai.com/#organization',
  name: 'MatAI',
  url: 'https://matematik-ai.com',
  logo: { '@type': 'ImageObject', url: 'https://matematik-ai.com/assets/MatAI-logo.png' },
};

export const applicationIdentity = {
  '@type': 'SoftwareApplication',
  '@id': 'https://matematik-ai.com/#app',
  name: 'MatAI',
  image: 'https://matematik-ai.com/assets/MatAI-logo.png',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'iOS, iPadOS',
  url: 'https://matematik-ai.com',
  installUrl: 'https://apps.apple.com/us/app/matai-yapay-zeka-matematik/id6756010761',
  publisher: publisherIdentity,
};

// Preserve text after JSON.parse while preventing HTML script termination.
export function serializeStructuredData(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
