'use client';

import { memo } from 'react';
import TaskCenter from '@/business/client/features/Fission/TaskCenter';

const Tasks = memo(() => <TaskCenter />);
Tasks.displayName = 'Tasks';
export default Tasks;
