'use client';

import { Flexbox } from '@lobehub/ui';
import { Button, Card, Col, message, Modal, Row, Statistic, Tag, Typography } from 'antd';
import { GiftOutlined } from '@ant-design/icons';
import { memo, useCallback, useState } from 'react';

import { COST_PER_DRAW, getLottery, getWallet, saveLottery, spendPoints, type LotteryState } from './fissionStore';

const { Text } = Typography;

const PRIZES = [
  { name: '5 元话费', prob: 0.05, color: '#f50' },
  { name: '10 元话费', prob: 0.03, color: '#f50' },
  { name: '20 元话费', prob: 0.01, color: '#f50' },
  { name: '会员 3 天', prob: 0.10, color: '#2db7f5' },
  { name: '会员 7 天', prob: 0.05, color: '#2db7f5' },
  { name: '50 积分', prob: 0.15, color: '#87d068' },
  { name: '100 积分', prob: 0.10, color: '#87d068' },
  { name: '200 积分', prob: 0.05, color: '#87d068' },
  { name: '10 积分', prob: 0.20, color: '#d9d9d9' },
  { name: '5 积分', prob: 0.26, color: '#d9d9d9' },
];

const LotteryEngine = memo(() => {
  const [state, setState] = useState<LotteryState>(getLottery);
  const [walletPoints, setWalletPoints] = useState(() => getWallet().totalPoints);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const spin = useCallback(() => {
    if (state.todayDraws >= 10) {
      message.warning('今日抽奖次数已用完（每日上限 10 次）');
      return;
    }

    const wallet = spendPoints(COST_PER_DRAW, '大转盘抽奖');
    if (!wallet) {
      message.warning(`积分不足！需要 ${COST_PER_DRAW} 积分，当前余额 ${getWallet().totalPoints}`);
      return;
    }
    setWalletPoints(wallet.totalPoints);

    setSpinning(true);
    setResult(null);

    setTimeout(() => {
      const rand = Math.random();
      let cumulative = 0;
      let prize = PRIZES[PRIZES.length - 1];
      for (const p of PRIZES) { cumulative += p.prob; if (rand <= cumulative) { prize = p; break; } }

      const newState: LotteryState = {
        todayDraws: state.todayDraws + 1,
        history: [`${prize.name} (${new Date().toLocaleTimeString()})`, ...state.history].slice(0, 20),
      };
      setState(newState);
      saveLottery(newState);
      setResult(prize.name);
      setSpinning(false);
      message.success(`🎰 ${prize.name}`);
    }, 1500);
  }, [state]);

  return (
    <Flexbox gap={24} style={{ padding: '0 4px' }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card size="small">
            <Statistic title="我的积分" value={walletPoints} prefix={<GiftOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic title="今日抽奖" value={state.todayDraws} suffix="/ 10" />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic title="每抽消耗" value={COST_PER_DRAW} suffix="积分" />
          </Card>
        </Col>
      </Row>

      {/* Wheel area */}
      <Card style={{ textAlign: 'center' }}>
        <div
          style={{
            width: 260,
            height: 260,
            borderRadius: '50%',
            margin: '0 auto',
            background: 'conic-gradient(#f50 0deg 36deg, #2db7f5 36deg 72deg, #87d068 72deg 108deg, #faad14 108deg 144deg, #d9d9d9 144deg 180deg, #f50 180deg 216deg, #87d068 216deg 252deg, #2db7f5 252deg 288deg, #faad14 288deg 324deg, #d9d9d9 324deg 360deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: spinning ? 'spin 1.5s ease-out' : 'none',
          }}
        >
          <Button
            type="primary"
            size="large"
            shape="circle"
            loading={spinning}
            onClick={spin}
            style={{ width: 80, height: 80, fontSize: 14, fontWeight: 'bold' }}
          >
            {spinning ? '...' : '抽奖'}
          </Button>
        </div>
        {result && (
          <Text strong style={{ fontSize: 18, marginTop: 16, display: 'block', color: '#1677ff' }}>
            恭喜获得：{result}
          </Text>
        )}
      </Card>

      {/* Prize list */}
      <Card title={<Text strong>奖品列表</Text>}>
        <Flexbox gap={8}>
          {PRIZES.map((p) => (
            <Flexbox key={p.name} horizontal style={{ justifyContent: 'space-between' }}>
              <Tag color={p.color}>{p.name}</Tag>
              <Text type="secondary">概率 {(p.prob * 100).toFixed(0)}%</Text>
            </Flexbox>
          ))}
        </Flexbox>
      </Card>

      {/* History */}
      <Card title={<Text strong>抽奖记录</Text>}>
        <Flexbox gap={4}>
          {(state.history || []).map((h, i) => (
            <Text key={i} type="secondary">{h}</Text>
          ))}
          {(!state.history || state.history.length === 0) && (
            <Text type="secondary">暂无记录</Text>
          )}
        </Flexbox>
      </Card>
    </Flexbox>
  );
});

LotteryEngine.displayName = 'LotteryEngine';
export default LotteryEngine;
