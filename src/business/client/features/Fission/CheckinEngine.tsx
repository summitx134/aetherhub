'use client';

import { Flexbox } from '@lobehub/ui';
import { Button, Card, Col, message, Progress, Row, Statistic, Tag, Typography } from 'antd';
import { CalendarOutlined, CheckCircleFilled, GiftOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { addPoints, getCheckin, getWallet, saveCheckin, type CheckinState } from './fissionStore';

const { Text } = Typography;

const REWARDS = [
  { day: 1, points: 10, label: '10 积分' },
  { day: 2, points: 10, label: '10 积分' },
  { day: 3, points: 15, label: '15 积分' },
  { day: 4, points: 15, label: '15 积分' },
  { day: 5, points: 20, label: '20 积分' },
  { day: 6, points: 20, label: '20 积分' },
  { day: 7, points: 50, label: '50 积分（周奖励）' },
];

const DAY_30_POINTS = 300;
const DAY_100_POINTS = 1000;

const todayStr = () => new Date().toISOString().slice(0, 10);

// ---- component ----
const CheckinEngine = memo(() => {
  const [state, setState] = useState<CheckinState>(getCheckin);
  const [walletPoints, setWalletPoints] = useState(() => getWallet().totalPoints);

  useEffect(() => {
    if (state.lastDate !== todayStr()) setState((prev) => ({ ...prev, today: false }));
  }, [state.lastDate]);

  const handleCheckin = useCallback(() => {
    if (state.today) { message.warning('今日已签到'); return; }

    const dayIndex = state.streak % 7;
    const reward = REWARDS[dayIndex]?.points || 10;
    const newStreak = state.streak + 1;

    // 写入共享钱包
    addPoints(reward, `签到 Day ${newStreak}`);

    const newState: CheckinState = {
      streak: newStreak,
      lastDate: todayStr(),
      today: true,
      history: [...state.history, todayStr()],
    };
    setState(newState);
    saveCheckin(newState);
    message.success(`签到成功！获得 ${reward} 积分 (连续 ${newStreak} 天)`);
    setWalletPoints(getWallet().totalPoints); // refresh shared wallet display
    if (newStreak === 30) message.success('🎉 连续 30 天！300 积分超级奖励！');
    if (newStreak === 100) message.success('🏆 连续 100 天！超级礼包！');
  }, [state]);

  const weekProgress = useMemo(() => (state.streak % 7) / 7 * 100, [state.streak]);

  return (
    <Flexbox gap={24} style={{ padding: '0 4px' }}>
      {/* Stats */}
      <Row gutter={16}>
        <Col span={6}>
          <Card size="small">
            <Statistic title="连续签到" value={state.streak} suffix="天" prefix={<CalendarOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic title="钱包余额" value={walletPoints} prefix={<GiftOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic title="距 30 天礼包" value={Math.max(0, 30 - state.streak)} suffix="天" />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic title="距 100 天超级礼包" value={Math.max(0, 100 - state.streak)} suffix="天" />
          </Card>
        </Col>
      </Row>

      {/* Checkin button */}
      <Card style={{ textAlign: 'center' }}>
        <Flexbox gap={12} align="center">
          <Button
            type={state.today ? 'default' : 'primary'}
            size="large"
            icon={state.today ? <CheckCircleFilled /> : <ThunderboltOutlined />}
            onClick={handleCheckin}
            disabled={state.today}
            style={{ height: 56, fontSize: 18, minWidth: 200 }}
          >
            {state.today ? '今日已签到' : '每日签到'}
          </Button>
          {state.today && (
            <Text type="success">已签到，明天继续！连续 {state.streak} 天</Text>
          )}
        </Flexbox>
      </Card>

      {/* Weekly rewards */}
      <Card title={<Text strong>本周奖励进度</Text>}>
        <Flexbox gap={8}>
          <Progress percent={weekProgress} format={() => `${state.streak % 7} / 7`} />
          <Flexbox horizontal gap={4} style={{ flexWrap: 'wrap' }}>
            {REWARDS.map((r, i) => (
              <Tag key={r.day} color={(state.streak % 7) > i ? 'green' : 'default'} style={{ fontSize: 13, padding: '4px 8px' }}>
                Day {r.day}: {r.label}
              </Tag>
            ))}
          </Flexbox>
        </Flexbox>
      </Card>

      {/* Long-term rewards */}
      <Card title={<Text strong>里程碑奖励</Text>}>
        <Flexbox gap={12}>
          <Card size="small" style={{ background: state.streak >= 30 ? '#f6ffed' : '#fafafa' }}>
            <Flexbox horizontal style={{ justifyContent: 'space-between' }}>
              <Flexbox>
                <Text strong>30 天连续签到</Text>
                <Text type="secondary">300 积分</Text>
              </Flexbox>
              {state.streak >= 30 ? <Tag color="green">已达成</Tag> : <Tag>未达成</Tag>}
            </Flexbox>
          </Card>
          <Card size="small" style={{ background: state.streak >= 100 ? '#f6ffed' : '#fafafa' }}>
            <Flexbox horizontal style={{ justifyContent: 'space-between' }}>
              <Flexbox>
                <Text strong>100 天连续签到</Text>
                <Text type="secondary">超级礼包（含年费会员）</Text>
              </Flexbox>
              {state.streak >= 100 ? <Tag color="green">已达成</Tag> : <Tag>未达成</Tag>}
            </Flexbox>
          </Card>
        </Flexbox>
      </Card>

      {/* Make-up card */}
      <Card title={<Text strong>补签卡</Text>}>
        <Text type="secondary">会员可获得补签机会，中断后使用补签卡恢复连续签到记录。</Text>
      </Card>
    </Flexbox>
  );
});

CheckinEngine.displayName = 'CheckinEngine';
export default CheckinEngine;
