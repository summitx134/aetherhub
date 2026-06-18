import type {
  AetherHubGroupChatConfig,
  AetherHubGroupFullConfig,
  AetherHubGroupMetaConfig,
} from '@lobechat/types';

export const DEFAULT_CHAT_GROUP_CHAT_CONFIG: AetherHubGroupChatConfig = {
  allowDM: true,
  openingMessage: '',
  openingQuestions: [],
  revealDM: false,
  systemPrompt: '',
};

export const DEFAULT_CHAT_GROUP_META_CONFIG: AetherHubGroupMetaConfig = {
  description: '',
  title: '',
};

export const DEFAULT_CHAT_GROUP_CONFIG: AetherHubGroupFullConfig = {
  chat: DEFAULT_CHAT_GROUP_CHAT_CONFIG,
  meta: DEFAULT_CHAT_GROUP_META_CONFIG,
};
