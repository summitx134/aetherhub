import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { colors } from '../../constants/tokens';

type Props = { placeholder?: string; onSend: (text: string) => void };

export function PillInput({ placeholder = 'Message AetherHub...', onSend }: Props) {
  const [text, setText] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: colors.surface, borderRadius: 9999, height: 48, paddingLeft: 4, paddingRight: 4,
      borderWidth: 1.5, borderColor: focused ? colors.borderFocus : colors.border,
    }}>
      <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color: colors.textSecondary }}>+</Text>
      </TouchableOpacity>
      <TextInput
        style={{ flex: 1, height: '100%', paddingHorizontal: 8, fontSize: 16, color: colors.text }}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        value={text}
        onChangeText={setText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onSubmitEditing={handleSend}
      />
      <TouchableOpacity
        onPress={handleSend}
        disabled={!text.trim()}
        style={{
          width: 40, height: 40, borderRadius: 20,
          backgroundColor: text.trim() ? colors.accent : 'rgba(0,0,0,0.06)',
          justifyContent: 'center', alignItems: 'center',
        }}>
        <Text style={{ fontSize: 18, color: text.trim() ? '#FFF' : colors.textMuted }}>↑</Text>
      </TouchableOpacity>
    </View>
  );
}
