import { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';

// ChatGPT-inspired color palette
const c = {
  bg: '#1A1A1A',              // Warm deep gray (not blue-black)
  surface: '#2F2F2F',         // Elevated surface
  surfaceHigh: '#3D3D3D',     // Higher elevation
  border: 'rgba(255,255,255,0.1)',
  primary: '#10A37F',         // ChatGPT brand green
  primaryHover: '#1A7F64',
  text: '#ECECF1',            // Soft white
  textSecondary: '#8E8EA0',   // Muted gray
  userBubble: '#10A37F',      // Brand green for user
  aiBubble: '#2F2F2F',        // Surface gray for AI
};

const DEFAULT_AGENT = { name: 'AetherHub', topic: 'General Chat' };

const WELCOME_QUESTIONS = [
  'What can you help me with?',
  'Explain quantum computing in simple terms',
  'Write a Python script for data analysis',
  'Help me brainstorm app ideas',
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [topic, setTopic] = useState(DEFAULT_AGENT.topic);
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, `user:${text}`, `ai:Processing "${text}"...`]);
    setInput('');
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      {/* Header */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', paddingTop: 56, paddingHorizontal: 16, paddingBottom: 14,
        borderBottomWidth: 1, borderBottomColor: c.border,
      }}>
        <TouchableOpacity 
          style={{ 
            width: 32, height: 32, borderRadius: 16, 
            justifyContent: 'center', alignItems: 'center',
            marginRight: 12
          }}
          activeOpacity={0.6}
        >
          <Text style={{ fontSize: 20, color: c.text }}>‹</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 17, fontFamily: 'Geist-SemiBold', color: c.text, letterSpacing: -0.2 }}>
            {DEFAULT_AGENT.name}
          </Text>
          <TouchableOpacity 
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}
            activeOpacity={0.6}
          >
            <Text style={{ fontSize: 13, fontFamily: 'Geist-Regular', color: c.textSecondary }}>{topic}</Text>
            <Text style={{ fontSize: 10, color: c.textSecondary, marginLeft: 4 }}>▾</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={{ 
            width: 32, height: 32, borderRadius: 16,
            justifyContent: 'center', alignItems: 'center'
          }}
          activeOpacity={0.6}
        >
          <Text style={{ fontSize: 18, color: c.textSecondary }}>⋯</Text>
        </TouchableOpacity>
      </View>

      {/* Conversation */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16, gap: 14, flexGrow: 1 }}
          ListEmptyComponent={
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }}>
              {/* Logo/Avatar */}
              <View style={{ 
                width: 64, height: 64, borderRadius: 32, 
                backgroundColor: c.primary, 
                justifyContent: 'center', alignItems: 'center', 
                marginBottom: 20,
                shadowColor: c.primary,
                shadowOpacity: 0.3,
                shadowRadius: 16,
                shadowOffset: { width: 0, height: 4 },
              }}>
                <Text style={{ fontSize: 28, color: '#FFF', fontFamily: 'Geist-Bold' }}>A</Text>
              </View>
              
              <Text style={{ 
                fontSize: 22, 
                fontFamily: 'Geist-Bold', 
                color: c.text, 
                marginBottom: 8, 
                textAlign: 'center',
                letterSpacing: -0.4
              }}>
                Hi, I'm {DEFAULT_AGENT.name}
              </Text>
              
              <Text style={{ 
                fontSize: 15, 
                fontFamily: 'Geist-Regular', 
                color: c.textSecondary, 
                textAlign: 'center', 
                marginBottom: 28,
                lineHeight: 22
              }}>
                Your AI assistant. Ask me anything or try one of these:
              </Text>
              
              {WELCOME_QUESTIONS.map((q) => (
                <TouchableOpacity 
                  key={q} 
                  onPress={() => { setInput(q); handleSend(); }}
                  activeOpacity={0.7}
                  style={{
                    backgroundColor: c.surface, 
                    borderRadius: 14, 
                    paddingHorizontal: 18, 
                    paddingVertical: 14, 
                    marginBottom: 10, 
                    width: '100%',
                    borderWidth: 1, 
                    borderColor: c.border,
                  }}>
                  <Text style={{ 
                    fontSize: 15, 
                    fontFamily: 'Geist-Regular', 
                    color: c.text,
                    lineHeight: 21
                  }}>{q}</Text>
                </TouchableOpacity>
              ))}
            </View>
          }
          renderItem={({ item }) => {
            const isUser = item.startsWith('user:');
            const text = item.slice(isUser ? 5 : 3);
            return (
              <View style={{ alignItems: isUser ? 'flex-end' : 'flex-start' }}>
                <View style={{
                  maxWidth: '80%', 
                  borderRadius: 18,
                  borderBottomRightRadius: isUser ? 6 : 18,
                  borderBottomLeftRadius: isUser ? 18 : 6,
                  backgroundColor: isUser ? c.userBubble : c.aiBubble,
                  borderWidth: isUser ? 0 : 1, 
                  borderColor: c.border,
                  paddingHorizontal: 16, 
                  paddingVertical: 12,
                  shadowColor: isUser ? c.primary : '#000',
                  shadowOpacity: isUser ? 0.15 : 0.1,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 2 },
                }}>
                  <Text style={{ 
                    fontSize: 15, 
                    fontFamily: 'Geist-Regular', 
                    color: isUser ? '#FFF' : c.text, 
                    lineHeight: 22,
                    letterSpacing: -0.1
                  }}>
                    {text}
                  </Text>
                </View>
              </View>
            );
          }}
        />

        {/* Input bar */}
        <View style={{
          flexDirection: 'row', 
          alignItems: 'flex-end', 
          gap: 10,
          paddingHorizontal: 14, 
          paddingVertical: 12,
          backgroundColor: c.bg,
          borderTopWidth: 1, 
          borderTopColor: c.border,
        }}>
          <TouchableOpacity 
            style={{
              width: 36, height: 36, borderRadius: 18, 
              backgroundColor: c.surface,
              justifyContent: 'center', alignItems: 'center',
              borderWidth: 1,
              borderColor: c.border,
            }}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 20, color: c.textSecondary }}>+</Text>
          </TouchableOpacity>
          
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Message..."
            placeholderTextColor={c.textSecondary}
            multiline
            style={{
              flex: 1, 
              maxHeight: 120, 
              fontSize: 15, 
              fontFamily: 'Geist-Regular', 
              color: c.text,
              backgroundColor: c.surface, 
              borderRadius: 20, 
              paddingHorizontal: 16, 
              paddingVertical: 10,
              borderWidth: 1, 
              borderColor: c.border,
              letterSpacing: -0.1
            }}
          />
          
          {input.trim() ? (
            <TouchableOpacity 
              onPress={handleSend} 
              activeOpacity={0.8}
              style={{
                width: 36, height: 36, borderRadius: 18, 
                backgroundColor: c.primary,
                justifyContent: 'center', alignItems: 'center',
                shadowColor: c.primary,
                shadowOpacity: 0.3,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
              }}>
              <Text style={{ fontSize: 18, color: '#FFF', fontWeight: '600' }}>↑</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={{
                width: 36, height: 36, borderRadius: 18, 
                backgroundColor: c.surface,
                justifyContent: 'center', alignItems: 'center',
                borderWidth: 1,
                borderColor: c.border,
              }}
              activeOpacity={0.7}
            >
              <Text style={{ fontSize: 18, color: c.textSecondary }}>🎤</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
