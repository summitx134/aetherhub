'use client';

import { Flexbox } from '@lobehub/ui';
import { Button, Card, Col, message, Row, Statistic, Steps, Tag, Typography } from 'antd';
import {
  ClockCircleOutlined,
  GiftOutlined,
  PhoneOutlined,
  TeamOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { memo } from 'react';

const { Text, Title } = Typography;

const RecallAndGroupBuy = memo(() => {
  return (
    <Flexbox gap={24} style={{ padding: '0 4px' }}>
      {/* Recall section */}
      <Card
        title={
          <Flexbox horizontal gap={8} align="center">
            <ClockCircleOutlined style={{ color: '#faad14' }} />
            <Text strong>召回活动（非常重要）</Text>
            <Tag color="orange">很多用户注册后就不来了</Tag>
          </Flexbox>
        }
      >
        <Flexbox gap={16}>
          <Card size="small" style={{ background: '#fff7e6' }}>
            <Flexbox horizontal style={{ justifyContent: 'space-between' }}>
              <Flexbox>
                <Text strong style={{ fontSize: 15 }}>7 天未登录</Text>
                <Text type="secondary">APP 推送：送会员 3 天，回来领取</Text>
              </Flexbox>
              <Button type="primary" size="small">
                模拟推送
              </Button>
            </Flexbox>
          </Card>

          <Card size="small" style={{ background: '#fff1f0' }}>
            <Flexbox horizontal style={{ justifyContent: 'space-between' }}>
              <Flexbox>
                <Text strong style={{ fontSize: 15 }}>30 天未登录</Text>
                <Text type="secondary">推送：送 10 元话费</Text>
              </Flexbox>
              <Button type="primary" danger size="small">
                模拟推送
              </Button>
            </Flexbox>
          </Card>

          <Card size="small" style={{ background: '#f6ffed' }}>
            <Flexbox horizontal style={{ justifyContent: 'space-between' }}>
              <Flexbox>
                <Text strong style={{ fontSize: 15 }}>老用户回归</Text>
                <Text type="secondary">回归后签到双倍积分</Text>
              </Flexbox>
              <Tag color="green">自动生效</Tag>
            </Flexbox>
          </Card>
        </Flexbox>
      </Card>

      {/* Group buy section */}
      <Card
        title={
          <Flexbox horizontal gap={8} align="center">
            <TeamOutlined style={{ color: '#52c41a' }} />
            <Text strong>拼团会员</Text>
            <Tag color="green">用户主动拉人</Tag>
          </Flexbox>
        }
      >
        <Flexbox gap={12}>
          <Card size="small" style={{ background: '#f6ffed' }}>
            <Flexbox horizontal style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Flexbox>
                <Text strong style={{ fontSize: 15 }}>
                  年费会员拼团
                </Text>
                <Text type="secondary">
                  原价 ¥99 <Text delete>¥99</Text> → 3 人成团 ¥59
                </Text>
              </Flexbox>
              <Button type="primary">发起拼团</Button>
            </Flexbox>
          </Card>
          <Text type="secondary">
            开团后分享给好友，3 人成团即可享受折扣价。未成团自动退款。
          </Text>
        </Flexbox>
      </Card>

      {/* Growth funnel visualization */}
      <Card title={<Text strong>增长漏斗（最强组合）</Text>}>
        <Flexbox gap={16}>
          <Row gutter={12}>
            <Col span={8}>
              <Card size="small" style={{ background: '#e6f4ff' }}>
                <Text strong style={{ color: '#1677ff' }}>一级增长</Text>
                <br />
                <Text type="secondary">邀请送会员 · 新人大礼包 · 签到系统 · 积分商城</Text>
              </Card>
            </Col>
            <Col span={8}>
              <Card size="small" style={{ background: '#f9f0ff' }}>
                <Text strong style={{ color: '#722ed1' }}>二级增长</Text>
                <br />
                <Text type="secondary">师徒系统 · 大转盘 · 拼团会员 · 邀请排行榜</Text>
              </Card>
            </Col>
            <Col span={8}>
              <Card size="small" style={{ background: '#fff7e6' }}>
                <Text strong style={{ color: '#fa8c16' }}>三级增长</Text>
                <br />
                <Text type="secondary">话费兑换 · 现金返现 · 分销佣金</Text>
              </Card>
            </Col>
          </Row>

          <Text strong style={{ marginTop: 12 }}>用户成长路径：</Text>
          <Steps
            direction="vertical"
            size="small"
            items={[
              { title: '注册', description: '新人礼包' },
              { title: '完成新手任务', description: '获得积分' },
              { title: '签到', description: '持续获取积分' },
              { title: '抽奖', description: '消耗积分' },
              { title: '收藏工具', description: '形成留存' },
              { title: '邀请好友', description: '获得会员' },
              { title: '拼团购买', description: '社交裂变' },
              { title: '成为推广者', description: '获得佣金' },
            ]}
          />
        </Flexbox>
      </Card>
    </Flexbox>
  );
});

RecallAndGroupBuy.displayName = 'RecallAndGroupBuy';
export default RecallAndGroupBuy;
