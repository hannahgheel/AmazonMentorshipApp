import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import styles from '../components/CreateProfileScreenStyles';

export default function CreateProfileScreen({ navigation, route }) {
  const { uid } = route.params;
  const [bio, setBio] = useState('');
  const [photoUri, setPhotoUri] = useState(null);
  const [uploading, setUploading] = useState(false);

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
    let photoURL = '';
    if (photoUri) {
      const ref = storage().ref(`profilePictures/${uid}.jpg`);
      await ref.putFile(photoUri);
      photoURL = await ref.getDownloadURL();
    }
    await firestore().collection('users').doc(uid).update({
      bio,
      photoURL,
    });
    setUploading(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Profile</Text>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick Profile Picture</Text>
      </TouchableOpacity>
      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
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
