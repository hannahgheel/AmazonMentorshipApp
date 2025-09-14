import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { colors } from '../styles/theme';
import styles from '../components/ProfileScreenStyles';

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const uid = auth().currentUser?.uid;

  // Fetch profile, friends, and posts
  useEffect(() => {
    if (!uid) return;
    const userRef = firestore().collection('users').doc(uid);
    userRef.get().then(doc => setProfile(doc.data()));

    userRef.onSnapshot(doc => {
      const data = doc.data();
      setProfile(data);
      if (data?.friends?.length) {
        Promise.all(
          data.friends.map(fid =>
            firestore().collection('users').doc(fid).get().then(fdoc => ({ uid: fid, ...fdoc.data() }))
          )
        ).then(setFriends);
      } else {
        setFriends([]);
      }
    });

    // Fetch user's posts
    const unsubscribePosts = firestore()
      .collection('posts')
      .where('author', '==', uid)
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        if (!snapshot || !snapshot.docs) {
          setPosts([]);
          return;
        }
        setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

    return () => unsubscribePosts();
  }, [uid]);

  // Create a new post
  const handleCreatePost = async () => {
    if (!newPost.trim()) return;
    await firestore().collection('posts').add({
      authorUid: uid,
      content: newPost,
      timestamp: firestore.FieldValue.serverTimestamp(),
    });
    setNewPost('');
  };

  if (!profile) return <Text style={styles.loading}>Loading...</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.bio}>{profile.bio}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Friends</Text>
        <FlatList
          horizontal
          data={friends}
          keyExtractor={item => item.uid}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.friendCard}
              onPress={() => navigation.navigate('Chat', { friendUid: item.uid, friendName: item.name, friendAvatar: item.avatar })}
            >
              <Image source={{ uri: item.avatar }} style={styles.friendAvatar} />
              <Text style={styles.friendName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Create Post</Text>
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          value={newPost}
          onChangeText={setNewPost}
          placeholderTextColor={colors.textSecondary}
        />
        <Button title="Post" onPress={handleCreatePost} color={colors.button} />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Posts</Text>
        <FlatList
          data={posts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <Text style={styles.postContent}>{item.content}</Text>
              <Text style={styles.postTimestamp}>{item.timestamp?.toDate().toLocaleString() || ''}</Text>
            </View>
          )}
        />
      </View>
      <Button title="Search Users" onPress={() => navigation.navigate('SearchUsers')} color={colors.button} />
    </View>
  );
}