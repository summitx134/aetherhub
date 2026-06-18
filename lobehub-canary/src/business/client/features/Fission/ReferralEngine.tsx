'use client';

import { BRANDING_NAME } from '@lobechat/business-const';
import { Flexbox } from '@lobehub/ui';
import { Button, Card, Col, Input, message, Row, Statistic, Table, Tabs, Tag, Typography } from 'antd';
import { CopyOutlined, GiftOutlined, ShareAltOutlined, TrophyOutlined } from '@ant-design/icons';
import { memo, useCallback, useMemo, useState } from 'react';

const { Text, Title } = Typography;

// ---- mock data / storage helpers ----
const STORAGE_KEY = 'aetherhub_referral';

interface ReferralRecord {
  key: string;
  email: string;
  registeredAt: string;
  status: 'pending' | 'active' | 'paid';
  reward: string;
  rewardedAt: string;
}

const loadState = () => {
  if (typeof window === 'undefined') return { records: [] as ReferralRecord[] };
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"records":[]}');
  } catch {
    return { records: [] as ReferralRecord[] };
  }
};

// ---- component ----
const REFERRAL_CODE = 'spIUya2c';
const REFERRAL_LINK = `/signin?referral=${REFERRAL_CODE}`;

const ReferralEngine = memo(() => {
  const [state, setState] = useState(loadState);
  const [activeTab, setActiveTab] = useState('invite');

  const copyToClipboard = useCallback(async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      message.success(`${label} 已复制`);
    } catch {
      message.info('请手动复制');
    }
  }, []);

  const inviteStats = useMemo(() => {
    const records = state.records || [];
    return {
      total: records.length,
      active: records.filter((r) => r.status !== 'pending').length,
      paid: records.filter((r) => r.status === 'paid').length,
    };
  }, [state]);

  const columns = [
    { title: '邮箱', dataIndex: 'email', key: 'email' },
    { title: '注册时间', dataIndex: 'registeredAt', key: 'registeredAt' },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (s: string) => {
        const color = s === 'paid' ? 'green' : s === 'active' ? 'blue' : 'default';
        const label = s === 'paid' ? '已付费' : s === 'active' ? '已激活' : '待激活';
        return <Tag color={color}>{label}</Tag>;
      },
    },
    { title: '奖励', dataIndex: 'reward', key: 'reward' },
    { title: '发放时间', dataIndex: 'rewardedAt', key: 'rewardedAt' },
  ];

  return (
    <Flexbox gap={24} style={{ padding: '0 4px' }}>
      {/* Stats */}
      <Row gutter={16}>
        <Col span={6}>
          <Card size="small">
            <Statistic title="邀请总数" value={inviteStats.total} prefix={<ShareAltOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic title="有效转化" value={inviteStats.active} prefix={<GiftOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic title="已付费" value={inviteStats.paid} prefix={<TrophyOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic
              title="预估返利"
              value={inviteStats.paid * 3 + inviteStats.active * 0.5}
              prefix="¥"
              precision={0}
            />
          </Card>
        </Col>
      </Row>

      {/* Referral code & link */}
      <Card title={<Text strong>我的推荐码</Text>}>
        <Flexbox gap={12}>
          <Flexbox horizontal gap={12} align="center">
            <Input
              readOnly
              style={{ width: 200, fontSize: 18, fontFamily: 'monospace', letterSpacing: 2 }}
              value={REFERRAL_CODE}
            />
            <Button icon={<CopyOutlined />} onClick={() => copyToClipboard(REFERRAL_CODE, '推荐码')}>
              复制推荐码
            </Button>
          </Flexbox>
          <Flexbox horizontal gap={12} align="center">
            <Input
              readOnly
              style={{ flex: 1 }}
              value={REFERRAL_LINK}
            />
            <Button
              type="primary"
              icon={<CopyOutlined />}
              onClick={() => copyToClipboard(REFERRAL_LINK, '推荐链接')}
            >
              复制推荐链接
            </Button>
          </Flexbox>
        </Flexbox>
      </Card>

      {/* Invite Rewards Tabs */}
      <Card>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'invite',
              label: '邀请返现',
              children: (
                <Flexbox gap={8}>
                  <Text strong style={{ fontSize: 16 }}>邀请返现（阶梯奖励）</Text>
                  <Table
                    dataSource={[
                      { key: '1', invites: 1, reward: '¥3', type: '现金' },
                      { key: '2', invites: 5, reward: '¥20', type: '现金' },
                      { key: '3', invites: 10, reward: '¥50', type: '现金' },
                      { key: '4', invites: 50, reward: '¥300', type: '现金' },
                    ]}
                    columns={[
                      { title: '邀请人数', dataIndex: 'invites', key: 'invites' },
                      { title: '奖励', dataIndex: 'reward', key: 'reward' },
                      { title: '类型', dataIndex: 'type', key: 'type' },
                    ]}
                    pagination={false}
                    size="small"
                  />
                  <Text type="secondary">限制：必须完成注册 · 绑定邮箱 · 登录3天</Text>
                </Flexbox>
              ),
            },
            {
              key: 'membership',
              label: '邀请送会员',
              children: (
                <Flexbox gap={8}>
                  <Text strong style={{ fontSize: 16 }}>邀请送平台会员</Text>
                  <Table
                    dataSource={[
                      { key: '1', invites: 1, reward: '会员 3天' },
                      { key: '2', invites: 3, reward: '会员 7天' },
                      { key: '3', invites: 10, reward: '会员 30天' },
                      { key: '4', invites: 50, reward: '年费会员' },
                    ]}
                    columns={[
                      { title: '邀请人数', dataIndex: 'invites', key: 'invites' },
                      { title: '奖励', dataIndex: 'reward', key: 'reward' },
                    ]}
                    pagination={false}
                    size="small"
                  />
                </Flexbox>
              ),
            },
            {
              key: 'mentor',
              label: '师徒系统',
              children: (
                <Flexbox gap={8}>
                  <Text strong style={{ fontSize: 16 }}>师徒系统 · 永久绑定</Text>
                  <Card size="small" style={{ background: '#fafafa' }}>
                    <Text>徒弟消费 <Text strong>¥100</Text> → 师傅获得 <Text strong type="success">¥10 佣金</Text></Text>
                    <br />
                    <Text type="secondary">绑定关系永久有效，每笔消费师傅都可获得佣金</Text>
                  </Card>
                </Flexbox>
              ),
            },
          ]}
        />
      </Card>

      {/* Records */}
      <Card title={<Text strong>推荐记录</Text>}>
        <Table
          dataSource={state.records || []}
          columns={columns}
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: '暂无推荐记录' }}
        />
      </Card>
    </Flexbox>
  );
});

ReferralEngine.displayName = 'ReferralEngine';
export default ReferralEngine;
