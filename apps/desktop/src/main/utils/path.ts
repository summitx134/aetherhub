import { pathToFileURL } from 'node:url';

export const filePathToAppUrl = (filePath: string) => {
  return `app://aetherhub.local${pathToFileURL(filePath).pathname}`;
};
