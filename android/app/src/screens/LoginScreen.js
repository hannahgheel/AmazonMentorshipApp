import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import Logo from '../components/Logo';
import styles from '../components/LoginScreenStyles';
import registerStyles from '../components/RegisterScreenStyles';
import { colors } from '../styles/theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          const user = userCredential.user;
          Alert.alert('Login Successful', `Welcome, ${user.email}!`);
        })
        .catch(error => {
          Alert.alert('Login Failed', error.message);
        });
    } else {
      Alert.alert('Login Failed', 'Please enter both email and password.');
    }
  };

  return (
    <View style={styles.container}>
      <Logo size={100} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.textSecondary}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.textSecondary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

export function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');

  const handleRegister = () => {
    if (username && password) {
      // Save user info to backend or local storage !!!
      Alert.alert('Account Created', 'You can now log in.');
      navigation.navigate('Login');
    } else {
      Alert.alert('Registration Failed', 'Please fill all fields.');
    }
  };

  return (
    <View style={registerStyles.container}>
      <Text style={registerStyles.title}>Create Account</Text>
      <TextInput
        style={registerStyles.input}
        placeholder="Username"
        placeholderTextColor={colors.textSecondary}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={registerStyles.input}
        placeholder="Password"
        placeholderTextColor={colors.textSecondary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={registerStyles.input}
        placeholder="Bio"
        placeholderTextColor={colors.textSecondary}
        value={bio}
        onChangeText={setBio}
      />
      <TouchableOpacity style={registerStyles.button} onPress={handleRegister}>
        <Text style={registerStyles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
