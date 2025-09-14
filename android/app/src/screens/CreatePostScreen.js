import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from '../components/CreatePostScreenStyles';

export default function CreatePostScreen({ navigation }) {
  const [content, setContent] = useState('');

  const handlePost = async () => {
    const uid = auth().currentUser?.uid;
    if (content && uid) {
      try {
        await firestore().collection('posts').add({
          author: uid,
          content,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
        Alert.alert('Posted!', 'Your post has been shared.');
        setContent('');
        navigation.goBack();
      } catch (error) {
        Alert.alert('Error', error.message || 'Could not create post.');
      }
    } else {
      Alert.alert('Error', 'Post cannot be empty and you must be signed in.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        value={content}
        onChangeText={setContent}
        multiline
        placeholderTextColor="#888"
      />
      <Button title="Post" onPress={handlePost} color="#e67e22" />
    </View>
  );
}