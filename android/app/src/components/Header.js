import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Logo from './Logo';
import { colors, fonts } from '../styles/theme';

export default function Header() {
  return (
    <View style={styles.header}>
      <Logo size={100} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
});