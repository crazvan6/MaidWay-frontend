import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import colors from "../../assets/colors";
import { AppleAuthButton, GoogleAuthButton } from "../../components";
import spacing from "../../constants/spacing";
import typography from "../../constants/typography";
import { supabase } from "../../lib/supabase";

// Configure WebBrowser for better OAuth experience
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);

  useEffect(() => {
    // Configure Google Sign-In
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
      iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    });
  }, []);

  const handleGoogleAuth = async () => {
    setIsGoogleLoading(true);
    console.log('Google authentication initiated');
    
    try {
      // Check if Google Play Services are available
      await GoogleSignin.hasPlayServices();
      
      // Sign in with Google
      const userInfo = await GoogleSignin.signIn();
      
      if (userInfo.data!.idToken) {
        console.log('ID Token received:', userInfo!.data!.idToken);
        
        // Sign in with Supabase using the ID token
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: userInfo.data!.idToken,
        });
        
        if (error) {
          console.error('Supabase auth error:', error);
          alert('Authentication failed: ' + error.message);
        } else {
          console.log('Authentication successful:', data);
          alert('Welcome! You are now logged in.');
          // TODO: Navigate to main app
        }
      } else {
        throw new Error('No ID token present!');
      }
      
    } catch (error: any) {
      console.error('Google auth error:', error);
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Operation is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Google Play Services not available or outdated');
      } else {
        alert('Authentication failed: ' + error.message);
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleAppleAuth = async () => {
    setIsAppleLoading(true);
    console.log('Apple authentication initiated');
    // Simulate authentication process
    setTimeout(() => {
      setIsAppleLoading(false);
      // Navigate to main app after successful auth
      console.log('Apple authentication successful');
    }, 1000);
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
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.title}></Text>
            <Text style={styles.subtitle}>
              
            </Text>
          </View>

          {/* Main Content - Third Party Auth Buttons */}
          <View style={styles.contentSection}>
            <View style={styles.authButtonsContainer}>
              <GoogleAuthButton 
                onPress={handleGoogleAuth}
                disabled={isGoogleLoading}
              />
              <AppleAuthButton 
                onPress={handleAppleAuth}
                disabled={isAppleLoading}
              />
            </View>
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

  // Content Section - Auth buttons centered vertically
  contentSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Auth buttons container
  authButtonsContainer: {
    width: '85%',
    maxWidth: 500,
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