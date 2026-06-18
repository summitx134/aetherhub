import type { PlatformDefinition } from '../types';
import { ImessageClientFactory } from './client';
import { schema } from './schema';

export const imessage: PlatformDefinition = {
  id: 'imessage',
  name: 'iMessage',
  connectionMode: 'webhook',
  description: 'Connect iMessage through the local AetherHub Desktop BlueBubbles bridge.',
  documentation: {
    portalUrl: 'https://bluebubbles.app/',
    setupGuideUrl: 'http://localhost:9876/docs/usage/channels/imessage',
  },
  schema,
  showWebhookUrl: false,
  supportsMarkdown: false,
  supportsMessageEdit: false,
  clientFactory: new ImessageClientFactory(),
};
