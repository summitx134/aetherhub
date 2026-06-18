import { View, TouchableOpacity } from 'react-native';
import { colors, radius, shadows } from '../../constants/tokens';

type Props = { children: React.ReactNode; onPress?: () => void; style?: any };

export function Card({ children, onPress, style }: Props) {
  const cardStyle = {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    ...shadows.card,
    ...style,
  };
  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={cardStyle}>
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={cardStyle}>{children}</View>;
}
