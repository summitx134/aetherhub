'use client';

import { Flexbox } from '@lobehub/ui';
import { Button, Card, Col, message, Progress, Row, Statistic, Tag, Typography } from 'antd';
import { CheckCircleFilled, ClockCircleOutlined, GiftOutlined, StarOutlined } from '@ant-design/icons';
import { memo, useCallback, useMemo, useState } from 'react';

const { Text, Title } = Typography;

// ---- storage ----
const STORAGE_KEY = 'aetherhub_tasks';

interface Task {
  id: string;
  title: string;
  desc: string;
  reward: string;
  category: 'newbie' | 'daily' | 'growth';
  completed: boolean;
}

const DEFAULT_TASKS: Task[] = [
  { id: 'n1', title: '注册账号', desc: '创建 AetherHub 账号', reward: '50 积分', category: 'newbie', completed: false },
  { id: 'n2', title: '完善个人资料', desc: '填写头像、昵称等信息', reward: '30 积分', category: 'newbie', completed: false },
  { id: 'n3', title: '下载桌面端', desc: '安装 AetherHub 桌面应用', reward: '100 积分 + 7天会员', category: 'newbie', completed: false },
  { id: 'n4', title: '发送首条消息', desc: '在对话页发送一条 AI 消息', reward: '20 积分', category: 'newbie', completed: false },
  { id: 'd1', title: '每日签到', desc: '每日签到获取积分', reward: '10-50 积分', category: 'daily', completed: false },
  { id: 'd2', title: '发起一次对话', desc: '与 AI Agent 完成一次对话', reward: '5 积分', category: 'daily', completed: false },
  { id: 'd3', title: '邀请 1 位好友', desc: '通过推荐码邀请好友注册', reward: '20 积分', category: 'daily', completed: false },
  { id: 'g1', title: '邀请 10 位好友', desc: '累计邀请 10 位有效用户', reward: '500 积分 + 30天会员', category: 'growth', completed: false },
  { id: 'g2', title: '首次充值', desc: '完成首次积分充值', reward: '双倍积分', category: 'growth', completed: false },
  { id: 'g3', title: '消费满 ¥100', desc: '累计消费达到 ¥100', reward: '¥10 返利', category: 'growth', completed: false },
];

const loadTasks = (): Task[] => {
  if (typeof window === 'undefined') return DEFAULT_TASKS;
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(DEFAULT_TASKS));
  } catch {
    return DEFAULT_TASKS;
  }
};

const saveTasks = (tasks: Task[]) => {
  if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

// ---- component ----
const TaskCenter = memo(() => {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  const completeTask = useCallback((taskId: string) => {
    setTasks((prev) => {
      const next = prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
      saveTasks(next);
      const task = prev.find((t) => t.id === taskId);
      if (task && !task.completed) message.success(`完成任务：${task.title}，获得 ${task.reward}`);
      return next;
    });
  }, []);

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.completed).length;
    return { total, done, pct: Math.round((done / total) * 100) };
  }, [tasks]);

  const renderTaskCard = (task: Task) => (
    <Card
      key={task.id}
      size="small"
      style={{ background: task.completed ? '#f6ffed' : undefined }}
      hoverable={!task.completed}
    >
      <Flexbox horizontal style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Flexbox gap={4}>
          <Flexbox horizontal gap={8} align="center">
            <Text strong>{task.title}</Text>
            <Text type="secondary">— {task.reward}</Text>
          </Flexbox>
          <Text type="secondary">{task.desc}</Text>
        </Flexbox>
        <Button
          type={task.completed ? 'default' : 'primary'}
          icon={task.completed ? <CheckCircleFilled /> : undefined}
          onClick={() => completeTask(task.id)}
          size="small"
        >
          {task.completed ? '已完成' : '去完成'}
        </Button>
      </Flexbox>
    </Card>
  );

  return (
    <Flexbox gap={24} style={{ padding: '0 4px' }}>
      {/* Progress */}
      <Row gutter={16}>
        <Col span={8}>
          <Card size="small">
            <Statistic title="任务完成" value={stats.done} suffix={`/ ${stats.total}`} />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Progress type="circle" percent={stats.pct} size={80} />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic
              title="预估可获积分"
              value={tasks.filter((t) => !t.completed).reduce((acc, t) => acc + (t.reward.includes('积分') ? parseInt(t.reward) || 10 : 0), 0)}
              prefix={<GiftOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Newbie tasks */}
      <Card
        title={
          <Flexbox horizontal gap={8} align="center">
            <StarOutlined style={{ color: '#faad14' }} />
            <Text strong>新手任务</Text>
            <Tag color="orange">完成获得新人礼包 · 价值 ¥50</Tag>
          </Flexbox>
        }
      >
        <Flexbox gap={12}>
          {tasks.filter((t) => t.category === 'newbie').map(renderTaskCard)}
        </Flexbox>
      </Card>

      {/* Daily tasks */}
      <Card
        title={
          <Flexbox horizontal gap={8} align="center">
            <ClockCircleOutlined style={{ color: '#1677ff' }} />
            <Text strong>每日任务</Text>
            <Tag color="blue">提升 DAU 神器</Tag>
          </Flexbox>
        }
      >
        <Flexbox gap={12}>
          {tasks.filter((t) => t.category === 'daily').map(renderTaskCard)}
        </Flexbox>
      </Card>

      {/* Growth tasks */}
      <Card
        title={
          <Flexbox horizontal gap={8} align="center">
            <GiftOutlined style={{ color: '#52c41a' }} />
            <Text strong>成长任务</Text>
          </Flexbox>
        }
      >
        <Flexbox gap={12}>
          {tasks.filter((t) => t.category === 'growth').map(renderTaskCard)}
        </Flexbox>
      </Card>
    </Flexbox>
  );
});

TaskCenter.displayName = 'TaskCenter';
export default TaskCenter;
