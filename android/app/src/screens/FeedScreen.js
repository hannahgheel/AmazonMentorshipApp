import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from '../components/FeedScreenStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FeedScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  // Make handleLike async
  const handleLike = async (postId) => {
    const uid = auth().currentUser?.uid;
    if (!uid) return;

    const postRef = firestore().collection('posts').doc(postId);
    const postDoc = await postRef.get();

    if (postDoc.exists) {
      const postData = postDoc.data();
      const likes = postData.likes || [];
      const userLiked = likes.includes(uid);

      if (userLiked) {
        await postRef.update({
          likes: firestore.FieldValue.arrayRemove(uid),
        });
      } else {
        await postRef.update({
          likes: firestore.FieldValue.arrayUnion(uid),
        });
      }
    }
  };

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot(async snapshot => {
        if (!snapshot || !snapshot.docs) {
          setPosts([]);
          return;
        }
        const postsData = await Promise.all(
          snapshot.docs.map(async doc => {
            const post = { id: doc.id, ...doc.data() };
            const userDoc = await firestore().collection('users').doc(post.author).get();
            const userData = userDoc.data();
            return { ...post, authorName: userData?.name, authorAvatar: userData?.avatar };
          })
        );
        setPosts(postsData);
      });
    return unsubscribe;
  }, []);

  const renderItem = ({ item }) => {
    const uid = auth().currentUser?.uid;
    const userLiked = item.likes?.includes(uid);

    return (
      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <Image source={{ uri: item.authorAvatar }} style={styles.avatar} />
          <Text style={styles.authorName}>{item.authorName}</Text>
        </View>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
        ) : (
          <View style={styles.placeholderImage} />
        )}
        <View style={styles.postActions}>
          <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.actionButton}>
            <View style={styles.likeButtonContent}>
              <MaterialCommunityIcons name={userLiked ? 'heart' : 'heart-outline'} size={24} color={userLiked ? 'red' : 'black'} />
              <Text style={styles.likeCount}>{item.likes?.length || 0}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CommentScreen', { postId: item.id })} style={styles.actionButton}>
            <MaterialCommunityIcons name="comment-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.captionContainer}>
          <Text style={styles.caption}>{item.content}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Feed</Text>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}