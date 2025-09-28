import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '../../../assets/colors';
import { ThirdPartyAuthButton } from '../../primitives/ThirdPartyAuthButton';

interface GoogleAuthButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  onPress,
  disabled = false,
}) => {
  return (
    <ThirdPartyAuthButton
      onPress={onPress}
      icon={
        <Ionicons 
          name="logo-google" 
          size={20} 
          color={colors.neutral[100]} 
        />
      }
      text="Continuă cu Google"
      backgroundColor={colors.primary}
      textColor={colors.neutral[100]}
      borderColor={colors.primary}
      disabled={disabled}
      style={styles.googleButton}
    />
  );
};

const styles = StyleSheet.create({
  googleButton: {
    // Google-specific styling if needed
  },
});