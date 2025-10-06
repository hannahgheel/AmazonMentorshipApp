import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import styles from '../components/CreateProfileScreenStyles';

export default function CreateProfileScreen({ navigation, route }) {
  const uid = route.params?.uid || auth().currentUser?.uid;
  const [bio, setBio] = useState('');
  const [photoUri, setPhotoUri] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Generate AI avatar URL for this user
  const randomIndex = Math.floor(Math.random() * 100); // 0 to 99
  const avatarUrl = `https://randomuser.me/api/portraits/women/${randomIndex}.jpg`;

  const pickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo' },
      (response) => {
        if (response.assets && response.assets.length > 0) {
          setPhotoUri(response.assets[0].uri);
        }
      }
    );
  };

  const handleContinue = async () => {
    setUploading(true);
    let photoURL = avatarUrl; // Default to AI avatar
    if (photoUri) {
      const ref = storage().ref(`profilePictures/${uid}.jpg`);
      await ref.putFile(photoUri);
      photoURL = await ref.getDownloadURL();
    }
    await firestore().collection('users').doc(uid).set({
      bio,
      avatar: photoURL,
      profileComplete: true,
    }, { merge: true });
    setUploading(false);

    // Navigate to Feed screen
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Profile</Text>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick Profile Picture</Text>
      </TouchableOpacity>
      {/* Show picked image if available, otherwise show AI avatar */}
      {photoUri ? (
        <Image source={{ uri: photoUri }} style={styles.image} />
      ) : (
        <Image source={{ uri: avatarUrl }} style={styles.image} />
      )}
      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
      />
      <TouchableOpacity
        style={[styles.button, uploading || !bio ? { opacity: 0.6 } : null]}
        onPress={handleContinue}
        disabled={uploading || !bio}
      >
        <Text style={styles.buttonText}>
          {uploading ? "Uploading..." : "Continue to App"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
