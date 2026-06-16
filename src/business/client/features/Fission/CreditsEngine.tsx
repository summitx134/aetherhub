'use client';

import { Flexbox } from '@lobehub/ui';
import { Button, Card, Col, InputNumber, message, Modal, Row, Statistic, Table, Tabs, Tag, Typography } from 'antd';
import {
  DollarOutlined,
  GiftOutlined,
  PhoneOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { memo, useCallback, useState } from 'react';

const { Text, Title } = Typography;

// ---- storage ----
const STORAGE_KEY = 'aetherhub_credits';

interface CreditsState {
  totalBalance: number;
  subscriptionCredits: number;
  rechargeCredits: number;
  membershipDays: number;
  isNewUser: boolean;
}

const loadCredits = (): CreditsState => {
  if (typeof window === 'undefined')
    return { totalBalance: 0, subscriptionCredits: 0, rechargeCredits: 0, membershipDays: 0, isNewUser: true };
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) ||
        '{"totalBalance":0,"subscriptionCredits":0,"rechargeCredits":0,"membershipDays":0,"isNewUser":true}',
    );
  } catch {
    return { totalBalance: 0, subscriptionCredits: 0, rechargeCredits: 0, membershipDays: 0, isNewUser: true };
  }
};

const saveCredits = (s: CreditsState) => {
  if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
};

// ---- recharge plans ----
const RECHARGE_PLANS = [
  { amount: 99, bonus: 10, label: '¥99 赠 10 元' },
  { amount: 199, bonus: 30, label: '¥199 赠 30 元' },
  { amount: 499, bonus: 100, label: '¥499 赠 100 元' },
];

// ---- component ----
const CreditsEngine = memo(() => {
  const [credits, setCredits] = useState<CreditsState>(loadCredits);
  const [rechargeAmount, setRechargeAmount] = useState(99);
  const [showGiftModal, setShowGiftModal] = useState(credits.isNewUser);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [phonePoints, setPhonePoints] = useState(1000);

  const handleRecharge = useCallback(() => {
    const plan = RECHARGE_PLANS.find((p) => p.amount === rechargeAmount) || RECHARGE_PLANS[0];
    const firstTimeBonus = credits.rechargeCredits === 0 ? rechargeAmount : 0;
    const totalNewCredits = rechargeAmount + plan.bonus + firstTimeBonus;

    const newCredits = {
      ...credits,
      totalBalance: credits.totalBalance + totalNewCredits,
      rechargeCredits: credits.rechargeCredits + totalNewCredits,
    };
    setCredits(newCredits);
    saveCredits(newCredits);
    message.success(
      `充值成功！获得 ${totalNewCredits} 积分${firstTimeBonus ? '（含首充双倍）' : ''}${plan.bonus ? `（含赠 ${plan.bonus} 积分）` : ''}`,
    );
  }, [credits, rechargeAmount]);

  const claimNewUserGift = useCallback(() => {
    const newCredits = {
      ...credits,
      totalBalance: credits.totalBalance + 500,
      membershipDays: credits.membershipDays + 30,
      isNewUser: false,
    };
    setCredits(newCredits);
    saveCredits(newCredits);
    setShowGiftModal(false);
    message.success('🎉 新人礼包已领取！获得 500 积分 + 30 天会员');
  }, [credits]);

  const exchangePhone = useCallback(() => {
    if (credits.totalBalance < phonePoints) {
      message.warning('积分不足');
      return;
    }
    const phoneAmount = Math.floor(phonePoints / 100);
    const newCredits = { ...credits, totalBalance: credits.totalBalance - phonePoints };
    setCredits(newCredits);
    saveCredits(newCredits);
    setShowPhoneModal(false);
    message.success(`话费兑换成功！${phoneAmount} 元话费将在 24 小时内到账`);
  }, [credits, phonePoints]);

  const recalcPrice = (pts: number) => `约 ${Math.floor(pts / 100)} 元话费`;

  return (
    <Flexbox gap={24} style={{ padding: '0 4px' }}>
      {/* Balance */}
      <Row gutter={16}>
        <Col span={6}>
          <Card size="small">
            <Statistic title="总余额" value={credits.totalBalance} suffix="积分" prefix={<DollarOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic title="充值积分" value={credits.rechargeCredits} />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic title="会员剩余" value={credits.membershipDays} suffix="天" />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic
              title="可兑话费"
              value={Math.floor(credits.totalBalance / 100)}
              prefix={<PhoneOutlined />}
              suffix="元"
            />
          </Card>
        </Col>
      </Row>

      <Tabs
        items={[
          {
            key: 'recharge',
            label: '充值活动',
            children: (
              <Flexbox gap={16}>
                <Card title={<Text strong>充值赠送</Text>}>
                  <Flexbox gap={12}>
                    {RECHARGE_PLANS.map((p) => (
                      <Card
                        key={p.amount}
                        size="small"
                        hoverable
                        style={{
                          background: rechargeAmount === p.amount ? '#e6f4ff' : undefined,
                          border: rechargeAmount === p.amount ? '1px solid #1677ff' : undefined,
                        }}
                        onClick={() => setRechargeAmount(p.amount)}
                      >
                        <Flexbox horizontal style={{ justifyContent: 'space-between' }}>
                          <Text strong>{p.label}</Text>
                          <Tag color="green">到账 {p.amount + p.bonus} 积分</Tag>
                        </Flexbox>
                      </Card>
                    ))}
                    <Flexbox horizontal gap={12} align="center">
                      <Button type="primary" size="large" onClick={handleRecharge}>
                        充值 ¥{rechargeAmount}
                      </Button>
                      {credits.rechargeCredits === 0 && (
                        <Tag color="orange">首充双倍！到账 {rechargeAmount * 2} 积分</Tag>
                      )}
                    </Flexbox>
                  </Flexbox>
                </Card>

                <Card title={<Text strong>累计充值奖励</Text>}>
                  <Flexbox gap={8}>
                    <Tag color="blue">累计 ¥500 → 送月卡</Tag>
                    <Tag color="purple">累计 ¥1000 → 送季卡</Tag>
                    <Tag color="gold">累计 ¥3000 → 送年卡</Tag>
                  </Flexbox>
                </Card>
              </Flexbox>
            ),
          },
          {
            key: 'phone',
            label: '话费兑换',
            children: (
              <Flexbox gap={16}>
                <Card>
                  <Flexbox gap={12} align="center" style={{ textAlign: 'center' }}>
                    <PhoneOutlined style={{ fontSize: 48, color: '#1677ff' }} />
                    <Text strong style={{ fontSize: 18 }}>积分兑换话费</Text>
                    <Text type="secondary">100 积分 = 1 元话费</Text>
                    <Button type="primary" size="large" onClick={() => setShowPhoneModal(true)}>
                      立即兑换
                    </Button>
                  </Flexbox>
                </Card>
                <Card title={<Text strong>邀请送话费</Text>}>
                  <Flexbox gap={8}>
                    <Tag color="green">邀请 3 人 → 送 5 元话费</Tag>
                    <Tag color="green">邀请 10 人 → 送 20 元话费</Tag>
                  </Flexbox>
                </Card>
              </Flexbox>
            ),
          },
        ]}
      />

      {/* New user gift modal */}
      <Modal
        title="🎉 新人大礼包"
        open={showGiftModal}
        onOk={claimNewUserGift}
        onCancel={() => setShowGiftModal(false)}
        okText="领取礼包"
      >
        <Flexbox gap={8}>
          <Text strong>价值 ¥50 的新人专属礼包：</Text>
          <Text>✅ 一个月会员</Text>
          <Text>✅ 500 积分</Text>
          <Text>✅ 9 折充值优惠</Text>
          <Text type="secondary" style={{ marginTop: 8 }}>
            注册后 24 小时内购买会员享首单 5 折（原价 ¥99 → ¥49）
          </Text>
        </Flexbox>
      </Modal>

      {/* Phone exchange modal */}
      <Modal
        title="积分兑换话费"
        open={showPhoneModal}
        onOk={exchangePhone}
        onCancel={() => setShowPhoneModal(false)}
        okText="确认兑换"
      >
        <Flexbox gap={12}>
          <Text>当前余额：{credits.totalBalance} 积分</Text>
          <Flexbox horizontal gap={12} align="center">
            <Text>兑换积分：</Text>
            <InputNumber min={100} max={credits.totalBalance} step={100} value={phonePoints} onChange={(v) => setPhonePoints(v || 100)} />
          </Flexbox>
          <Text type="secondary">{recalcPrice(phonePoints)}</Text>
        </Flexbox>
      </Modal>
    </Flexbox>
  );
});

CreditsEngine.displayName = 'CreditsEngine';
export default CreditsEngine;
