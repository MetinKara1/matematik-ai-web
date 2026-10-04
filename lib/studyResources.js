import resources from './studyResources.json';
export const studyResources = resources;
export const getStudyResource = (slug) => resources.find((resource) => resource.slug === slug);
export const getTopicResource = (topic) => resources.find((resource) => resource.topic === topic);
