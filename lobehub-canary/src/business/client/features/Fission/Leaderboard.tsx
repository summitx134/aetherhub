'use client';

import { Flexbox } from '@lobehub/ui';
import { Card, Col, Row, Statistic, Table, Tag, Tabs, Typography } from 'antd';
import { CrownOutlined, ShareAltOutlined, DollarOutlined, TrophyOutlined } from '@ant-design/icons';
import { memo, useMemo } from 'react';

const { Text } = Typography;

const MOCK_INVITE_DATA = [
  { key: '1', rank: 1, name: 'Alice', count: 128, reward: '¥300 + 年费会员' },
  { key: '2', rank: 2, name: 'Bob', count: 89, reward: '¥100 + 季卡' },
  { key: '3', rank: 3, name: 'Charlie', count: 56, reward: '¥50 + 月卡' },
  { key: '4', rank: 4, name: 'Diana', count: 42, reward: '30天会员' },
  { key: '5', rank: 5, name: 'Eve', count: 31, reward: '7天会员' },
];

const MOCK_CONSUME_DATA = [
  { key: '1', rank: 1, name: 'Frank', amount: 2999, reward: '年费会员' },
  { key: '2', rank: 2, name: 'Grace', amount: 1899, reward: '季卡' },
  { key: '3', rank: 3, name: 'Henry', amount: 899, reward: '月卡' },
  { key: '4', rank: 4, name: 'Ivy', amount: 599, reward: '7天会员' },
  { key: '5', rank: 5, name: 'Jack', amount: 299, reward: '3天会员' },
];

const RankBadge = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Tag color="gold">🥇 第 1 名</Tag>;
  if (rank === 2) return <Tag color="silver">🥈 第 2 名</Tag>;
  if (rank === 3) return <Tag color="bronze">🥉 第 3 名</Tag>;
  return <Tag>第 {rank} 名</Tag>;
};

const Leaderboard = memo(() => {
  return (
    <Flexbox gap={24} style={{ padding: '0 4px' }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card size="small">
            <Statistic title="本月邀请达人" value={128} prefix={<CrownOutlined />} suffix="人" />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic title="本月消费冠军" value={2999} prefix={<DollarOutlined />} suffix="元" />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic title="总奖池" value={5000} prefix={<TrophyOutlined />} suffix="元" />
          </Card>
        </Col>
      </Row>

      <Card>
        <Tabs
          items={[
            {
              key: 'invite',
              label: (
                <Flexbox horizontal gap={4}>
                  <ShareAltOutlined />
                  <span>邀请榜</span>
                </Flexbox>
              ),
              children: (
                <Flexbox gap={12}>
                  <Text strong style={{ fontSize: 16 }}>
                    邀请排行榜（每月结算）
                  </Text>
                  <Text type="secondary">每月前 10 名获得现金 + 会员奖励</Text>
                  <Table
                    dataSource={MOCK_INVITE_DATA}
                    columns={[
                      {
                        title: '排名',
                        dataIndex: 'rank',
                        key: 'rank',
                        render: (r: number) => <RankBadge rank={r} />,
                      },
                      { title: '用户', dataIndex: 'name', key: 'name' },
                      { title: '邀请人数', dataIndex: 'count', key: 'count' },
                      { title: '奖励', dataIndex: 'reward', key: 'reward' },
                    ]}
                    pagination={false}
                  />
                </Flexbox>
              ),
            },
            {
              key: 'consume',
              label: (
                <Flexbox horizontal gap={4}>
                  <DollarOutlined />
                  <span>消费榜</span>
                </Flexbox>
              ),
              children: (
                <Flexbox gap={12}>
                  <Text strong style={{ fontSize: 16 }}>
                    消费排行榜（每月结算）
                  </Text>
                  <Text type="secondary">每月前 5 名获得会员奖励</Text>
                  <Table
                    dataSource={MOCK_CONSUME_DATA}
                    columns={[
                      {
                        title: '排名',
                        dataIndex: 'rank',
                        key: 'rank',
                        render: (r: number) => <RankBadge rank={r} />,
                      },
                      { title: '用户', dataIndex: 'name', key: 'name' },
                      {
                        title: '消费金额',
                        dataIndex: 'amount',
                        key: 'amount',
                        render: (a: number) => `¥${a}`,
                      },
                      { title: '奖励', dataIndex: 'reward', key: 'reward' },
                    ]}
                    pagination={false}
                  />
                </Flexbox>
              ),
            },
          ]}
        />
      </Card>
    </Flexbox>
  );
});

Leaderboard.displayName = 'Leaderboard';
export default Leaderboard;
