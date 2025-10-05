import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Image, TouchableOpacity, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from '../components/CreatePostScreenStyles';

export default function CreatePostScreen({ navigation }) {
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handlePost = async () => {
    const uid = auth().currentUser?.uid;
    if (!uid) {
      Alert.alert('Error', 'You must be signed in to create a post.');
      return;
    }
    if (!content.trim() && !imageUri) {
      Alert.alert('Error', 'Post cannot be empty.');
      return;
    }

    try {
      let imageUrl = null;
      if (imageUri) {
        const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
        const storageRef = storage().ref(`post_images/${uid}/${filename}`);
        await storageRef.putFile(imageUri);
        imageUrl = await storageRef.getDownloadURL();
      }

      await firestore().collection('posts').add({
        author: uid,
        content,
        imageUrl,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Posted!', 'Your post has been shared.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message || 'Could not create post.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.imagePickerText}>Select a Photo</Text>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.captionInput}
        placeholder="Write a caption..."
        value={content}
        onChangeText={setContent}
        multiline
        placeholderTextColor="#888"
      />
      <Button title="Post" onPress={handlePost} color="#e67e22" />
    </View>
  );
}