import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import colors from '../../assets/colors';
import spacing from '../../constants/spacing';
import typography from '../../constants/typography';
import { validatePhone } from '../../lib/utils';
import { AuthButton } from '../primitives/ButtonAuth';

interface PhoneFormProps {
  onSubmit: (phoneNumber: string) => void;
  buttonText: string;
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
}

export const PhoneForm: React.FC<PhoneFormProps> = ({
  onSubmit,
  buttonText,
  isLoading = false,
  title = "Introdu numărul tău de telefon",
  subtitle,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleInputChange = (text: string) => {
    setPhoneNumber(text);
    if (text.trim().length > 0) {
      const valid = validatePhone(text.trim());
      setIsValid(valid);
      setShowFeedback(true);
    } else {
      setIsValid(null);
      setShowFeedback(false);
    }
  };

  const handleSubmit = () => {
    if (phoneNumber.trim()) {
      const isValidPhone = validatePhone(phoneNumber.trim());
      if (isValidPhone) {
        onSubmit(phoneNumber.trim());
      } else {
        setShowFeedback(true);
        setIsValid(false);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {title && <Text style={styles.title}>{title}</Text>}
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        
        <View>
          <View style={[
            styles.phoneInputContainer,
            showFeedback && isValid === false && styles.phoneInputError
          ]}>
            <View style={styles.countryCodeContainer}>
              <Text style={styles.countryCodeText}>+40</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              placeholder="Numărul de telefon"
              placeholderTextColor={colors.neutral[400]}
              value={phoneNumber}
              onChangeText={handleInputChange}
              keyboardType="phone-pad"
              autoFocus={true}
              maxLength={9}
            />
          </View>
          
          <View style={styles.feedbackSpace}>
            {showFeedback && isValid === false && (
              <Text style={styles.feedbackTextErrorClose}>
                Număr incorect.
              </Text>
            )}
          </View>
        </View>

        <AuthButton
          icon={<Ionicons name="checkmark" size={24} color={colors.neutral[100]} />}
          text={buttonText}
          onPress={handleSubmit}
          style={[
            styles.submitButton,
            showFeedback && isValid === false && styles.submitButtonDisabled
          ]}
          textStyle={[
            styles.submitButtonText,
            showFeedback && isValid === false && styles.submitButtonTextDisabled
          ]}
          disabled={showFeedback && isValid === false}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },

  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[800],
    textAlign: 'center',
    marginBottom: spacing.sm,
  },

  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.neutral[600],
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: typography.lineHeight.md,
  },

  phoneInputContainer: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Much more opaque white
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.neutral[200],
    overflow: 'hidden',
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },

  countryCodeContainer: {
    backgroundColor: 'rgba(243, 244, 246, 0.95)', // More opaque light gray
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },

  countryCodeText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.neutral[700],
  },

  phoneInput: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: typography.fontSize.md,
    color: colors.neutral[800],
  },

  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },

  submitButtonText: {
    color: colors.neutral[100],
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    marginLeft: spacing.sm,
  },

  // Validation feedback styles
  feedbackContainer: {
    minHeight: 24, // Reserve minimum space to prevent layout shifting
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
    justifyContent: 'center',
  },

  feedbackText: {
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
    lineHeight: typography.lineHeight.sm,
  },

  feedbackTextError: {
    color: colors.feedback.error,
  },

  feedbackSpace: {
    minHeight: 20, // Reserve space for error message
    marginLeft: spacing.sm,
  },

  feedbackTextErrorClose: {
    color: colors.feedback.error,
    fontSize: typography.fontSize.sm,
    textAlign: 'left',
  },

  phoneInputError: {
    borderColor: colors.feedback.error,
  },

  submitButtonDisabled: {
    backgroundColor: colors.neutral[300],
    shadowOpacity: 0.1,
  },

  submitButtonTextDisabled: {
    color: colors.neutral[500],
  },
});
