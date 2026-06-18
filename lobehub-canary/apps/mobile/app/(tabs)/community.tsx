import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';

const c = {
  bg: '#0A0F1E',
  surface: '#1A1D23',
  surfaceHigh: '#2D333B',
  border: 'rgba(255,255,255,0.06)',
  primary: '#007AFF',
  text: '#E1E2EA',
  textSecondary: '#88898E',
  online: 'rgba(34,197,94,0.8)',
};

const TABS = ['Assistants', 'Skills', 'MCP', 'Models'];
const AGENTS = [
  { name: 'Nexus Prime', model: 'GPT-4o', desc: 'High-performance reasoning agent for complex tasks', online: true },
  { name: 'Ether Artist', model: 'DALL-E 4', desc: 'Creative visual generation from natural language', online: true },
  { name: 'Data Architect', model: 'Claude 3.5', desc: 'Enterprise data modeling and SQL optimization', online: false },
  { name: 'Aether Guide', model: 'Gemini 2.0', desc: 'Your onboarding companion and help assistant', online: true },
  { name: 'Cipher Solver', model: 'DeepSeek V4', desc: 'Cryptographic analysis and code breaking', online: false },
  { name: 'Vox Stream', model: 'ElevenLabs', desc: 'Real-time voice synthesis with 40+ languages', online: true },
];

export default function CommunityScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      {/* Top App Bar */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 16, paddingVertical: 12, paddingTop: 52,
        borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)',
      }}>
        <Text style={{ fontFamily: 'Geist-SemiBold', fontSize: 20, color: c.text }}>AetherHub</Text>
        <Text style={{ fontSize: 20, color: c.textSecondary }}>🔍</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Sub-tab bar — horizontal scroll */}
        <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12, gap: 8 }}>
            {TABS.map((tab, i) => (
              <TouchableOpacity key={tab} style={{
                paddingHorizontal: 14, paddingVertical: 7, borderRadius: 100,
                backgroundColor: i === 0 ? c.primary : 'transparent',
                borderWidth: 1, borderColor: i === 0 ? c.primary : c.border,
              }}>
                <Text style={{ fontSize: 13, fontFamily: 'Geist-Medium', color: i === 0 ? '#FFF' : c.textSecondary }}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 2-column card grid */}
        <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {AGENTS.map((agent) => (
              <TouchableOpacity key={agent.name} activeOpacity={0.8} style={{
                width: '47%', backgroundColor: c.surface, borderRadius: 12, padding: 12,
                borderWidth: 1, borderColor: c.border,
              }}>
                {/* Model badge + online dot */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={{ fontSize: 10, fontFamily: 'Geist-SemiBold', color: c.primary, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {agent.model}
                  </Text>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: agent.online ? c.online : c.textSecondary }} />
                </View>
                {/* Agent name */}
                <Text style={{ fontSize: 16, fontFamily: 'Geist-SemiBold', color: c.text, marginBottom: 4 }}>
                  {agent.name}
                </Text>
                {/* Description */}
                <Text style={{ fontSize: 13, fontFamily: 'Geist-Regular', color: c.textSecondary, lineHeight: 18 }} numberOfLines={2}>
                  {agent.desc}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Trending Bento card — Stitch format */}
          <Text style={{ fontSize: 13, fontFamily: 'Geist-SemiBold', color: c.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 24, marginBottom: 12 }}>
            Trending Now
          </Text>
          <View style={{ backgroundColor: c.surface, borderRadius: 16, borderWidth: 1, borderColor: c.border, padding: 16, gap: 12 }}>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={{ flex: 1, backgroundColor: c.surfaceHigh, borderRadius: 12, padding: 14 }}>
                <Text style={{ fontSize: 11, fontFamily: 'Geist-SemiBold', color: c.primary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
                  🔥 HOT SKILL
                </Text>
                <Text style={{ fontSize: 15, fontFamily: 'Geist-SemiBold', color: c.text, marginBottom: 4 }}>
                  Market Sentiment MCP
                </Text>
                <Text style={{ fontSize: 12, fontFamily: 'Geist-Regular', color: c.textSecondary }}>
                  2.4k active users · Real-time data
                </Text>
              </View>
              <View style={{ flex: 1, backgroundColor: c.surfaceHigh, borderRadius: 12, padding: 14 }}>
                <Text style={{ fontSize: 11, fontFamily: 'Geist-SemiBold', color: c.primary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>
                  ⚡ TRENDING
                </Text>
                <Text style={{ fontSize: 15, fontFamily: 'Geist-SemiBold', color: c.text, marginBottom: 4 }}>
                  Babel-Node
                </Text>
                <Text style={{ fontSize: 12, fontFamily: 'Geist-Regular', color: c.textSecondary }}>
                  1.8k users · Code transpiler
                </Text>
              </View>
            </View>
            <TouchableOpacity style={{ backgroundColor: c.primary, borderRadius: 100, paddingVertical: 12, alignItems: 'center' }}>
              <Text style={{ fontSize: 14, fontFamily: 'Geist-SemiBold', color: '#FFF' }}>View Marketplace →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
