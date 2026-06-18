import { ChatErrorType } from '@lobechat/types';
import { TRPCClientError } from '@trpc/client';
import { t } from 'i18next';

import { message } from '@/components/AntdStaticMethods';

interface AetherHubModelDeprecatedErrorData {
  modelType?: string;
  requestedModel?: string;
}

export const handleAetherHubModelDeprecatedError = (error: unknown) => {
  if (!(error instanceof TRPCClientError) || error.message !== ChatErrorType.AetherHubModelDeprecated)
    return;

  const requestedModel = (error.data?.errorData as AetherHubModelDeprecatedErrorData | undefined)
    ?.requestedModel;

  message.error(
    t('response.AetherHubModelDeprecated', {
      model: requestedModel ?? '-',
      ns: 'error',
    }),
  );
};
