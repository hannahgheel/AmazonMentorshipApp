import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { colors } from '../styles/theme';
import styles from '../components/CommentScreenStyles';

export default function CommentScreen({ route }) {
  const { postId } = route.params;
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const uid = auth().currentUser?.uid;

  useEffect(() => {
    if (!uid) return;

    const fetchUserProfile = async () => {
      const userDoc = await firestore().collection('users').doc(uid).get();
      if (userDoc.exists) {
        setCurrentUserProfile(userDoc.data());
      }
    };
    fetchUserProfile();

    const unsubscribe = firestore()
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        const newComments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setComments(newComments);
      });

    return unsubscribe;
  }, [postId, uid]);

  const handlePostComment = async () => {
    if (!commentText.trim()) {
      Alert.alert('Error', 'Comment cannot be empty.');
      return;
    }
    if (!currentUserProfile) {
      Alert.alert('Error', 'User profile not loaded.');
      return;
    }

    try {
      await firestore()
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .add({
          userId: uid,
          userName: currentUserProfile.name || 'Anonymous',
          userAvatar: currentUserProfile.avatar || 'https://via.placeholder.com/150',
          commentText: commentText,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
      setCommentText('');
    } catch (error) {
      Alert.alert('Error', error.message || 'Could not post comment.');
    }
  };

  const renderCommentItem = ({ item }) => (
    <View style={styles.commentItem}>
      <Image source={{ uri: item.userAvatar }} style={styles.commentAvatar} />
      <View style={styles.commentContent}>
        <Text style={styles.commentAuthor}>{item.userName}</Text>
        <Text style={styles.commentText}>{item.commentText}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={item => item.id}
        renderItem={renderCommentItem}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={commentText}
          onChangeText={setCommentText}
          multiline
          placeholderTextColor={colors.textSecondary}
        />
        <TouchableOpacity style={styles.postButton} onPress={handlePostComment}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
