import type { AiFullModelCard, AiModelType } from 'model-bank';
import { loadModels as loadModelBankModels, ModelProvider } from 'model-bank';

interface AetherHubModelConfig {
  models: AiFullModelCard[];
  planCardModels: string[];
  updatedAt?: string;
  version: number;
}

const getDefaultAetherHubModelConfig = (): AetherHubModelConfig => ({
  models: [],
  planCardModels: [],
  version: 1,
});

const loadAetherHubModelConfig = async (): Promise<AetherHubModelConfig> =>
  getDefaultAetherHubModelConfig();

export const loadModels = async () =>
  loadModelBankModels({
    providerLoaders: {
      [ModelProvider.AetherHub]: loadAetherHubModels,
    },
  });

const loadAetherHubModels = async (): Promise<AiFullModelCard[]> =>
  (await loadAetherHubModelConfig()).models;

export const loadAetherHubPlanCardModels = async (): Promise<string[]> =>
  (await loadAetherHubModelConfig()).planCardModels;

export const isAetherHubModelAvailable = (
  _id: string,
  _expectedType: AiModelType,
  _options?: {
    getUserEmail?: () => Promise<string | null | undefined>;
    userEmail?: string | null;
  },
): boolean => false;
