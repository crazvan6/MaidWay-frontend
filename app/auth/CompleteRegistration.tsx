import React, { useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PhoneForm } from '../../components/forms/PhoneForm';

type UserRole = 'client' | 'prestator';

interface CompleteRegistrationProps {
  role: UserRole;
}

export default function CompleteRegistration({ role }: CompleteRegistrationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const handlePhoneSubmit = async (phoneNumber: string) => {
    setIsLoading(true);
    
    try {
      // Here you would typically:
      // 1. Send phone number to your backend
      // 2. Send SMS verification code
      // 3. Navigate to verification screen
      
      console.log('Registration data:', { role, phoneNumber });
      
      // For now, just simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to verification screen (you'll create this next)
      // router.push('/auth/VerifyPhone');
      
      // For now, just show success
      alert(`Registration started for ${role} with phone: ${phoneNumber}`);
      
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleInfo = () => {
    switch (role) {
      case 'client':
        return {
          title: 'Finalizează contul de Client',
          subtitle: 'Introdu numărul tău de telefon pentru a completa înregistrarea',
        };
      case 'prestator':
        return {
          title: 'Finalizează contul de Prestator',
          subtitle: 'Introdu numărul tău de telefon pentru a începe să oferi servicii',
        };
      default:
        return {
          title: 'Finalizează înregistrarea',
          subtitle: 'Introdu numărul tău de telefon',
        };
    }
  };

  const roleInfo = getRoleInfo();

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground 
        source={require('../../assets/images/4887687_52067.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={[styles.overlay]}>
          <PhoneForm
            title={roleInfo.title}
            subtitle={roleInfo.subtitle}
            buttonText="Trimite codul de verificare"
            onSubmit={handlePhoneSubmit}
            isLoading={isLoading}
          />
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Same as LoginScreen
  },
});
