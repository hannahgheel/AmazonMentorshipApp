import React from 'react';
import { View, Image } from 'react-native';

export default function Logo({ size = 100 }) {
  return (
    <View style={{ alignItems: 'center', margin: 20 }}>
      <Image
        source={require('../assets/logo.svg')}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        resizeMode="contain"
      />
    </View>
  );
}