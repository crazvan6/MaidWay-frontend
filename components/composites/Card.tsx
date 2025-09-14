import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'small' | 'medium' | 'large';
  shadow?: boolean;
  rounded?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 'medium',
  shadow = true,
  rounded = true,
}) => {
  const getPaddingStyle = (padding: 'small' | 'medium' | 'large') => {
    switch (padding) {
      case 'small':
        return styles.paddingSmall;
      case 'medium':
        return styles.paddingMedium;
      case 'large':
        return styles.paddingLarge;
      default:
        return styles.paddingMedium;
    }
  };

  const cardStyle = [
    styles.card,
    getPaddingStyle(padding),
    shadow && styles.shadow,
    rounded && styles.rounded,
    style,
  ];

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  paddingSmall: {
    padding: 12,
  },
  paddingMedium: {
    padding: 16,
  },
  paddingLarge: {
    padding: 20,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rounded: {
    borderRadius: 8,
  },
});
