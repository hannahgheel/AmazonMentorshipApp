import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import Logo from '../components/Logo';
import styles from '../components/LoginScreenStyles';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      navigation.navigate('Feed');
    } else {
      Alert.alert('Login Failed', 'Please enter both username and password.');
    }
  };

  return (
    <View style={styles.container}>
      <Logo size={100} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
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
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Bio" value={bio} onChangeText={setBio} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
