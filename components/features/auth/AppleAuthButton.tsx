import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '../../../assets/colors';
import { ThirdPartyAuthButton } from '../../primitives/ThirdPartyAuthButton';

interface AppleAuthButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export const AppleAuthButton: React.FC<AppleAuthButtonProps> = ({
  onPress,
  disabled = false,
}) => {
  return (
    <ThirdPartyAuthButton
      onPress={onPress}
      icon={
        <Ionicons 
          name="logo-apple" 
          size={20} 
          color={colors.neutral[900]} 
        />
      }
      text="Continuă cu Apple"
      backgroundColor={colors.neutral[100]}
      textColor={colors.neutral[900]}
      // borderColor={colors.neutral[900]}
      disabled={disabled}
      style={styles.appleButton}
    />
  );
};

const styles = StyleSheet.create({
  appleButton: {
    // Apple-specific styling if needed
  },
});
