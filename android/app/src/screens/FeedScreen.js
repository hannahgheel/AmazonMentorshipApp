import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from '../components/FeedScreenStyles';

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        if (!snapshot || !snapshot.docs) {
          setPosts([]);
          return;
        }
        setPosts(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })));
      });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Feed</Text>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.content}>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
}