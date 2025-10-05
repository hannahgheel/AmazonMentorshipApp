import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../components/Logo';
import styles from '../components/WelcomeScreenStyles';
import { colors } from '../styles/theme';

export default function WelcomeScreen({ navigation }) {
  return (
    <LinearGradient
      colors={[colors.backgroundGradientStart, colors.backgroundGradientEnd]}
      style={styles.container}
    >
      <Logo size={350} style={{ marginBottom: 0 }} />
      <Text style={styles.vitaText}>Vita</Text>
      <Text style={styles.title}>Welcome to Vita!</Text>
      <Text style={styles.subtitle}>
        A safespace for women to share and connect about their health!
      </Text>
      <View style={styles.signupBox}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.secondaryButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.brownLinkText}>
          Already have an account? Click here to log in
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}