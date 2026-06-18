'use client';

import { BRANDING_NAME } from '@lobechat/business-const';
import { Flexbox } from '@lobehub/ui';
import { message, Modal, Typography } from 'antd';
import { GiftOutlined } from '@ant-design/icons';
import { memo, useCallback, useEffect, useState } from 'react';

import { addPoints, isFirstVisit, markVisited } from './fissionStore';

const { Text, Title } = Typography;

const NewUserGiftPopup = memo(() => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isFirstVisit()) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClaim = useCallback(() => {
    addPoints(500, '新人礼包');
    markVisited();
    setVisible(false);
    message.success('🎉 新人礼包已领取！500 积分 + 30 天会员已到账');
  }, []);

  const handleDismiss = useCallback(() => {
    markVisited();
    setVisible(false);
  }, []);

  return (
    <Modal
      open={visible}
      onOk={handleClaim}
      onCancel={handleDismiss}
      okText="🎁 领取新人礼包"
      cancelText="稍后再说"
      width={440}
      centered
    >
      <Flexbox gap={12} align="center" style={{ padding: '16px 0' }}>
        <GiftOutlined style={{ fontSize: 48, color: '#D4A017' }} />
        <Title level={4} style={{ margin: 0 }}>欢迎来到 {BRANDING_NAME}</Title>
        <Text type="secondary" style={{ textAlign: 'center' }}>
          赠送给你的新人大礼包 · 价值 ¥50
        </Text>
        <Flexbox
          gap={6}
          style={{
            background: '#fffbe6',
            borderRadius: 8,
            padding: '12px 20px',
            width: '100%',
          }}
        >
          <Text>✅ 一个月会员（价值 ¥30）</Text>
          <Text>✅ 500 积分（价值 ¥20）</Text>
          <Text>✅ 首充双倍积分特权</Text>
          <Text>✅ 24 小时内购买会员享 5 折</Text>
        </Flexbox>
      </Flexbox>
    </Modal>
  );
});

NewUserGiftPopup.displayName = 'NewUserGiftPopup';
export default NewUserGiftPopup;
