import { Stack } from 'expo-router';
import React from 'react';

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
    </Stack>
  );
}
