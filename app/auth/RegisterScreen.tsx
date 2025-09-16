import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from "react-native";
import colors from "../../assets/colors";
import { RoleCard } from "../../components/features/auth/RoleCard";
import { AuthButton } from "../../components/primitives/ButtonAuth";
import spacing from "../../constants/spacing";
import typography from "../../constants/typography";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type UserRole = 'client' | 'prestator';

export default function RegisterScreen() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelection = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      // Navigate to registration completion screen with role parameter
      router.push({
        pathname: '/auth/CompleteRegistration',
        params: { role: selectedRole }
      });
    }
    // If no role selected, do nothing (button is disabled)
  };

  // Role configuration data
  const roles = {
    client: {
      title: 'Client',
      description: 'Caut servicii de curățenie pentru casa sau biroul meu',
      icon: 'home' as const,
      features: [
        'Găsește prestatori de încredere',
        'Programează servicii rapid',
        'Plătește în siguranță'
      ]
    },
    prestator: {
      title: 'Prestator',
      description: 'Ofer servicii de curățenie și vreau să găsesc clienți',
      icon: 'sparkles' as const,
      features: [
        'Accesează noi clienți',
        'Stabilește-ți propriile tarife',
        'Construiește-ți reputația'
      ]
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.roleContainer}>
        {Object.entries(roles).map(([roleKey, roleData]) => (
          <RoleCard
            key={roleKey}
            title={roleData.title}
            description={roleData.description}
            icon={roleData.icon}
            features={roleData.features}
            isSelected={selectedRole === roleKey}
            onPress={() => handleRoleSelection(roleKey as UserRole)}
          />
        ))}
      </View>

      {/* Continue Button - Always rendered to prevent layout shift */}
      <View style={styles.continueContainer}>
        <AuthButton
          icon={<Ionicons name="arrow-forward" size={24} color={colors.neutral[100]} />}
          text={`Continuă`}
          onPress={handleContinue}
          style={[
            styles.continueButton,
            !selectedRole && styles.continueButtonDisabled
          ]}
          textStyle={[
            styles.continueButtonText,
            !selectedRole && styles.continueButtonTextDisabled
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
    backgroundColor: colors.neutral[100],
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
  },

  // Role Selection
  roleContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  // Continue Button
  continueContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },

  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    width: screenWidth * 0.9,
    height: 56,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  continueButtonText: {
    color: colors.neutral[100],
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },

  // Disabled Button States
  continueButtonDisabled: {
    backgroundColor: colors.neutral[300],
    shadowOpacity: 0,
    elevation: 0,
  },

  continueButtonTextDisabled: {
    color: colors.neutral[500],
  },
});
