import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { colors, radius, shadows } from '../../src/constants/tokens';

const SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: '👤', label: 'Profile', value: 'demo@aetherhub.local' },
      { icon: '🔑', label: 'API Keys', value: '3 keys' },
    ],
  },
  {
    title: 'AI Preferences',
    items: [
      { icon: '🧠', label: 'Service Model', value: 'DeepSeek V4 Pro' },
      { icon: '🔌', label: 'Providers', value: '3 connected' },
      { icon: '🎨', label: 'Appearance', value: 'Auto' },
    ],
  },
  {
    title: 'Growth',
    items: [
      { icon: '📅', label: 'Daily Check-in', value: '+50 pts', accent: true },
      { icon: '✅', label: 'Task Center', value: '3/10 done', accent: true },
      { icon: '🎰', label: 'Lucky Draw', value: '50 pts/spin', accent: true },
      { icon: '🏆', label: 'Leaderboard', value: '#42', accent: true },
      { icon: '👥', label: 'Group Buy', value: '2 active', accent: true },
    ],
  },
  {
    title: 'App',
    items: [
      { icon: 'ℹ️', label: 'About', value: 'v1.0.0' },
    ],
  },
];

function SettingsItem({ icon, label, value, accent }: any) {
  return (
    <TouchableOpacity activeOpacity={0.7}
      style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12 }}>
      <Text style={{ fontSize: 20, width: 28, textAlign: 'center' }}>{icon}</Text>
      <Text style={{ flex: 1, fontSize: 16, color: colors.text }}>{label}</Text>
      <Text style={{ fontSize: 14, color: accent ? colors.accent : colors.textMuted }}>{value}</Text>
      <Text style={{ fontSize: 16, color: colors.textMuted }}>›</Text>
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.canvas }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 48, paddingBottom: 16 }}>
        <Text style={{ fontSize: 32, fontFamily: 'Geist-Bold', color: colors.text, letterSpacing: -0.5 }}>Settings</Text>
      </View>
      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }} contentContainerStyle={{ paddingBottom: 32 }}>
        {SECTIONS.map((section) => (
          <View key={section.title} style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 13, fontFamily: 'Geist-SemiBold', color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8, marginLeft: 4 }}>
              {section.title}
            </Text>
            <View style={{
              backgroundColor: colors.surface, borderRadius: radius.lg,
              borderWidth: 1, borderColor: colors.border, overflow: 'hidden',
            }}>
              {section.items.map((item, i) => (
                <View key={item.label}>
                  <SettingsItem {...item} />
                  {i < section.items.length - 1 && <View style={{ height: 0.5, backgroundColor: colors.divider, marginLeft: 56 }} />}
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
