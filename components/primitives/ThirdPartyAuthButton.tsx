import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import colors from '../../assets/colors';
import spacing from '../../constants/spacing';
import typography from '../../constants/typography';

interface ThirdPartyAuthButtonProps {
  onPress: () => void;
  icon?: React.ReactNode;
  text: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const ThirdPartyAuthButton: React.FC<ThirdPartyAuthButtonProps> = ({
  onPress,
  icon,
  text,
  backgroundColor = colors.neutral[100],
  textColor = colors.neutral[900],
  borderColor = colors.neutral[200],
  disabled = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor,
          borderColor,
        },
        style,
        disabled && styles.buttonDisabled,
      ]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {icon && (
        <View style={styles.iconContainer}>
          {icon}
        </View>
      )}
      <Text style={[
        styles.buttonText,
        { color: textColor },
        textStyle,
        disabled && styles.buttonTextDisabled,
      ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    marginVertical: spacing.sm,
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  buttonDisabled: {
    backgroundColor: colors.neutral[200],
    borderColor: colors.neutral[300],
    shadowOpacity: 0.05,
  },

  iconContainer: {
    marginRight: spacing.md,
  },

  buttonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'center',
  },

  buttonTextDisabled: {
    color: colors.neutral[500],
  },
});
