import { router } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../assets/colors";
import { PhoneForm } from "../../components/forms/PhoneForm";
import spacing from "../../constants/spacing";
import typography from "../../constants/typography";

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneSubmit = (phoneNumber: string) => {
    console.log('Phone number:', '+40' + phoneNumber);
    // Handle phone authentication
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground 
        source={require('../../assets/images/4887687_52067.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {/* Main Content - PhoneForm centered vertically */}
          <View style={styles.contentSection}>
            <PhoneForm
              title="Introdu numărul tău de telefon"
              buttonText="Conectează-te"
              onSubmit={handlePhoneSubmit}
              isLoading={isLoading}
            />
          </View>

          {/* Registration Link */}
          <View style={styles.registrationContainer}>
            <Text style={styles.registrationQuestion}>Prima dată pe MaidWay?</Text>
            <TouchableOpacity onPress={() => router.push('/auth/RegisterScreen')}>
              <Text style={styles.registrationLink}>
                Creează cont nou
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footerSection}>
            <Text style={styles.termsText}>
              Prin înregistrare, ești de acord cu{' '}
              <Text style={styles.linkText} onPress={() => {/* handle terms */}}>
                Termenii și condițiile
              </Text>
              {' '}alături de{' '}
              <Text style={styles.linkText} onPress={() => {/* handle privacy */}}>
                Politica de confidențialitate
              </Text>
              .
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Same as CompleteRegistration
  },

  // Header Section
  headerSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
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
    lineHeight: typography.lineHeight.md,
  },

  // Content Section - PhoneForm takes center space like CompleteRegistration
  contentSection: {
    flex: 1,
    justifyContent: 'center',
  },

  // Registration Section
  registrationContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },

  registrationQuestion: {
    fontSize: typography.fontSize.md,
    color: colors.neutral[700],
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.sm,
  },

  registrationLink: {
    fontSize: typography.fontSize.md,
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },

  // Footer Section
  footerSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },

  termsText: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[700],
    textAlign: 'center',
    lineHeight: typography.lineHeight.sm,
  },

  linkText: {
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },




})