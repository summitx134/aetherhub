import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { colors } from '../../constants/tokens';

type Props = {
  label: string;
  variant?: 'primary' | 'secondary';
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export function Button({ label, variant = 'primary', onPress, disabled, loading }: Props) {
  const isPrimary = variant === 'primary';
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.95}
      style={{
        height: 48,
        borderRadius: 9999,
        backgroundColor: isPrimary ? (disabled ? 'rgba(15,118,110,0.4)' : colors.accent) : 'transparent',
        borderWidth: isPrimary ? 0 : 1.5,
        borderColor: 'rgba(0,0,0,0.12)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
      }}>
      {loading ? (
        <ActivityIndicator color={isPrimary ? '#FFF' : colors.text} />
      ) : (
        <Text style={{ color: isPrimary ? '#FFF' : colors.text, fontSize: 16, fontFamily: 'Geist-SemiBold' }}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}
