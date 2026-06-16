import type { ModelProviderCard } from '@/types/llm';

const AetherHub: ModelProviderCard = {
  chatModels: [],
  description:
    'AetherHub Cloud uses official APIs to access AI models and measures usage with Credits tied to model tokens.',
  enabled: true,
  id: 'lobehub',
  modelsUrl: 'https://aetherhub.local/zh/docs/usage/subscription/model-pricing',
  name: 'AetherHub',
  settings: {
    modelEditable: false,
    showAddNewModel: false,
    showModelFetcher: false,
  },
  showConfig: false,
  url: 'https://aetherhub.local',
};

export default AetherHub;

export const planCardModels = [
  'deepseek-v4-pro',
  'claude-sonnet-4-6',
  'gemini-3.1-pro-preview',
  'gpt-5.5',
];
