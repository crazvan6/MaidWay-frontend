import colors from '@/assets/colors';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

interface AuthButtonProps {
  icon?: React.ReactNode;
  text: string;
  onPress: TouchableOpacityProps['onPress'];
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}
  
export const AuthButton: React.FC<AuthButtonProps> = ({ icon, text, onPress, style, textStyle, disabled }) => {
  return (
    <TouchableOpacity style={[styles.buttonAuth, style]} onPress={disabled ? undefined : onPress} disabled={disabled}>
      {icon}
      <Text style={[styles.buttonAuthText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonAuth: {
    flexDirection: 'row',
    borderRadius: 100,
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16
  },

  buttonAuthText: {
    color: colors.neutral[100],
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 16
  },
})