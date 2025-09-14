import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import colors from "../../assets/colors";
import { AuthButton } from "../../components/primitives/ButtonAuth";
import sizes from "../../constants/sizes";
import spacing from "../../constants/spacing";
import typography from "../../constants/typography";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={styles.backgroundGradient}>
        {/* Header Section */}
        <SafeAreaView style={styles.headerSection}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Ionicons name="sparkles" size={32} color={colors.primary} />
            </View>
            <Text style={styles.appName}>MaidWay</Text>
            <Text style={styles.tagline}>Professional Cleaning Services</Text>
          </View>
        </SafeAreaView>

        {/* Main Content */}
        <View style={styles.contentSection}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>Welcome Back</Text>
            <Text style={styles.welcomeSubtitle}>
              Connect with trusted cleaning professionals in your area
            </Text>
          </View>

          {/* Auth Button */}
          <View style={styles.authContainer}>
            <AuthButton
              icon={<Ionicons name="call" size={24} color={colors.neutral[100]} />}
              text={"Continue with Phone Number"}
              onPress={() => null}
              style={[styles.buttonAuth, styles.buttonAuthPhone]}
              textStyle={styles.buttonAuthText}
            />
          </View>

          {/* Decorative Elements */}
          <View style={styles.decorativeContainer}>
            <View style={styles.cleaningIcon}>
              <Ionicons name="home" size={20} color={colors.primary} />
            </View>
            <View style={styles.cleaningIcon}>
              <Ionicons name="sparkles" size={18} color={colors.primary} />
            </View>
            <View style={styles.cleaningIcon}>
              <Ionicons name="checkmark-circle" size={22} color={colors.primary} />
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerSection}>
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.linkText} onPress={() => {/* handle terms */}}>
              Terms of Service
            </Text>
            {' '}and{' '}
            <Text style={styles.linkText} onPress={() => {/* handle privacy */}}>
              Privacy Policy
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral[100],
  },

  backgroundGradient: {
    flex: 1,
    backgroundColor: colors.neutral[100],
  },

  // Header Section
  headerSection: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },

  logoContainer: {
    alignItems: 'center',
  },

  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  appName: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.black,
    marginBottom: spacing.xs,
  },

  tagline: {
    fontSize: typography.fontSize.md,
    color: colors.neutral[600],
    fontWeight: typography.fontWeight.medium,
    textAlign: 'center',
  },

  // Content Section
  contentSection: {
    flex: 0.5,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },

  welcomeContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },

  welcomeTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.black,
    marginBottom: spacing.sm,
  },

  welcomeSubtitle: {
    fontSize: typography.fontSize.md,
    color: colors.neutral[600],
    textAlign: 'center',
    lineHeight: typography.lineHeight.md,
    paddingHorizontal: spacing.md,
  },

  // Auth Section
  authContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  buttonAuth: {
    flexDirection: 'row',
    borderRadius: 16,
    width: sizes.buttons.lg.width,
    height: sizes.buttons.lg.height,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  buttonAuthPhone: {
    backgroundColor: colors.primary,
  },

  buttonAuthText: {
    color: colors.neutral[100],
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    marginLeft: spacing.sm,
  },

  // Decorative Elements
  decorativeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },

  cleaningIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: spacing.sm,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Footer Section
  footerSection: {
    flex: 0.1,
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },

  termsText: {
    fontSize: typography.fontSize.xs,
    color: colors.neutral[500],
    textAlign: 'center',
    lineHeight: typography.lineHeight.sm,
  },

  linkText: {
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
})