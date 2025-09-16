import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../../assets/colors';
import spacing from '../../../constants/spacing';
import typography from '../../../constants/typography';

interface RoleCardProps {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  features: string[];
  isSelected: boolean;
  onPress: () => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({
  title,
  description,
  icon,
  features,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.roleCard,
        isSelected && styles.roleCardSelected
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.roleIconContainer}>
        <Ionicons 
          name={icon} 
          size={32} 
          color={colors.primary} 
        />
      </View>
      
      <Text style={styles.roleTitle}>
        {title}
      </Text>
      
      <Text style={styles.roleDescription}>
        {description}
      </Text>
      
      <View style={styles.roleFeatures}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
            <Text style={styles.featureText}>
              {feature}
            </Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roleCard: {
    backgroundColor: colors.neutral[100],
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.neutral[200],
    shadowColor: colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  roleCardSelected: {
    borderColor: colors.primary,
  },

  roleIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.neutral[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.neutral[200],
  },

  roleTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.neutral[800],
    marginBottom: spacing.sm,
  },

  roleDescription: {
    fontSize: typography.fontSize.md,
    color: colors.neutral[600],
    lineHeight: typography.lineHeight.md,
    marginBottom: spacing.md,
  },

  roleFeatures: {
    gap: spacing.sm,
  },

  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  featureText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral[600],
    marginLeft: spacing.sm,
    flex: 1,
  },
});
