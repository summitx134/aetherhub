import type { BuiltinSkill } from '@lobechat/types';

import { AgentBrowserSkill } from './agent-browser';
import { ArtifactsSkill } from './artifacts';
import { AetherHubSkill } from './lobehub';
import { TaskSkill } from './task';

export { AgentBrowserIdentifier } from './agent-browser';
export { ArtifactsIdentifier } from './artifacts';
export { AetherHubIdentifier } from './lobehub';
export { TaskIdentifier } from './task';

export const builtinSkills: BuiltinSkill[] = [
  AgentBrowserSkill,
  ArtifactsSkill,
  AetherHubSkill,
  TaskSkill,
  // FindSkillsSkill
];
