import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import colors from '../../assets/colors';
import { AuthButton } from '../../components/primitives/ButtonAuth';
import spacing from '../../constants/spacing';
import typography from '../../constants/typography';

export default function OTPConfirmation() {
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
  const [otp, setOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const router = useRouter();

  // Redirect to login if no phone number provided
  useEffect(() => {
    if (!phoneNumber) {
      // Navigate back to login if no phone number
      router.replace('/auth');
    }
  }, [phoneNumber, router]);

  // Keyboard detection
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      if (interval) clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer]);

  const formatPhoneNumber = (phone: string): string => {
    return `+40${phone}`.replace(/(\d{3})(\d{3})(\d{3})/, '$1****$3');
  };

  const handleChange = (text: string) => {
    // Only allow digits and limit to 4
    const numericText = text.replace(/[^0-9]/g, '').slice(0, 4);
    setOtp(numericText);
  };

  const handleSubmit = async () => {
    if (otp.length === 4) {
      setIsLoading(true);
      console.log('OTP confirmed:', otp);
      // Here you would typically verify the OTP and navigate to main app
      setTimeout(() => {
        setIsLoading(false);
        // Navigate to main app or show success
      }, 1000);
    }
  };

  const handleResend = () => {
    setCanResend(false);
    setResendTimer(60);
    console.log('Resending OTP to:', phoneNumber);
  };

  const isValidOTP = otp.length === 4;

  // Don't render if no phone number - will redirect
  if (!phoneNumber) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.contentWrapper}>
          {/* Header */}  
          <View style={styles.headerSection}>
            <Text style={styles.title}>Introdu codul</Text>
                <Text style={styles.subtitle}>
                  Codul a fost trimis la {formatPhoneNumber(phoneNumber)}
                </Text>
          </View>

          {/* OTP Input */}
          <View style={styles.otpSection}>
            <View style={styles.otpInputContainer}>
              <TextInput
                style={styles.otpInput}
                placeholder="0000"
                placeholderTextColor={colors.neutral[300]}
                value={otp}
                onChangeText={handleChange}
                keyboardType="numeric"
                maxLength={4}
                textAlign="center"
                autoFocus={true}
              />
            </View>

            {/* Resend link on the left */}
            <View style={styles.resendSection}>
              {!canResend ? (
                <Text style={styles.timerText}>
                  {resendTimer}s până când poți retrimite
                </Text>
              ) : (
                <TouchableOpacity onPress={handleResend} style={styles.resendContainer}>
                  <Text style={styles.resendText}>
                    Resend code
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Submit Button */}
          <View style={styles.buttonSection}>
            <AuthButton
              icon={<Ionicons name="checkmark" size={24} color={colors.neutral[100]} />}
              text="Confirmă"
              onPress={handleSubmit}
              style={[
                styles.submitButton,
                (!isValidOTP || isLoading) && styles.submitButtonDisabled
              ]}
              textStyle={[
                styles.submitButtonText,
                (!isValidOTP || isLoading) && styles.submitButtonTextDisabled
              ]}
              disabled={otp.length !== 4 || isLoading}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[100],
  },

  contentWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: '10%',
    paddingTop: '30%',
  },

  headerSection: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: spacing.xxl,
  },

  title: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[900],
    textAlign: 'left',
    marginBottom: spacing.md,
  },

  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.neutral[600],
    textAlign: 'left',
    lineHeight: typography.lineHeight.md,
  },

  phoneNumber: {
    fontWeight: typography.fontWeight.medium,
    color: colors.neutral[800],
  },

  otpSection: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: spacing.lg,
  },

  otpInputContainer: {
    width: '100%',
    maxWidth: 200,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    marginBottom: spacing.lg,
  },

  otpInput: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.normal,
    color: colors.neutral[900],
    textAlign: 'left',
    paddingVertical: spacing.md,
    letterSpacing: 4,
  },

  resendSection: {
    alignItems: 'flex-start',
    width: '100%',
  },

  resendContainer: {
    paddingVertical: spacing.sm,
  },

  timerText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[500],
    textAlign: 'left',
  },

  resendText: {
    fontSize: typography.fontSize.md,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'left',
  },

  buttonSection: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
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

  submitButtonDisabled: {
    backgroundColor: colors.neutral[300],
    shadowOpacity: 0.1,
  },

  submitButtonText: {
    color: colors.neutral[100],
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    marginLeft: spacing.sm,
  },

  submitButtonTextDisabled: {
    color: colors.neutral[500],
  },
});
