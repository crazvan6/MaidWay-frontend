import { Button } from '@/components/primitives/Button';
import React from 'react';

interface LoginButtonProps {
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  onPress,
  loading = false,
  disabled = false,
}) => {
  return (
    <Button
      title="Sign In"
      onPress={onPress}
      variant="primary"
      size="large"
      fullWidth
      loading={loading}
      disabled={disabled}
      style={{ marginTop: 16 }}
    />
  );
};
