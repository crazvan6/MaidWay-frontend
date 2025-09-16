import { Stack } from 'expo-router';
import React from 'react';
import colors from '../../assets/colors';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide header for auth screens
        presentation: 'card',
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Login' }} />
      <Stack.Screen name="LoginScreen" />
      <Stack.Screen 
        name="RegisterScreen" 
        options={{ 
          headerShown: true,
          title: '',
          headerBackTitle: 'Înapoi',
          headerTintColor: colors.primary,
          headerStyle: {
            backgroundColor: colors.neutral[100],
          },
        }} 
      />
      <Stack.Screen 
        name="CompleteRegistration" 
        options={{ 
          headerShown: true,
          title: '',
          headerBackTitle: 'Înapoi',
          headerTintColor: colors.primary,
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTransparent: true,
        }} 
      />
    </Stack>
  );
}
