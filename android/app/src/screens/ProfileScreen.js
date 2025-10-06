import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { colors } from '../styles/theme';
import styles from '../components/ProfileScreenStyles';

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const isFocused = useIsFocused();
  const uid = auth().currentUser?.uid;

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid;
        const userRef = firestore().collection('users').doc(uid);

        const unsubscribeProfile = userRef.onSnapshot(doc => {
          if (doc && doc.exists) {
            const userData = doc.data();
            setProfile(userData);
            if (userData.friends) {
              Promise.all(
                userData.friends.map(friendId =>
                  firestore().collection('users').doc(friendId).get()
                )
              ).then(friendDocs => {
                setFriends(friendDocs.map(doc => ({ id: doc.id, ...doc.data() })));
              });
            }
          } else {
            setProfile(null);
          }
        });

        const unsubscribePosts = firestore()
          .collection('posts')
          .where('author', '==', uid)
          .orderBy('timestamp', 'desc')
          .onSnapshot(async snapshot => {
            if (snapshot) {
              const postsData = await Promise.all(
                snapshot.docs.map(async doc => {
                  const post = { id: doc.id, ...doc.data() };
                  const userDoc = await firestore().collection('users').doc(post.author).get();
                  const userData = userDoc.data();
                  return { ...post, authorName: userData?.name, authorAvatar: userData?.avatar };
                })
              );
              setPosts(postsData);
            }
          });

        const unsubscribeRequests = firestore()
          .collection('users')
          .doc(uid)
          .collection('receivedFriendRequests')
          .onSnapshot(snapshot => {
            if (snapshot) {
              setFriendRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            }
          });

        return () => {
          unsubscribeProfile();
          unsubscribePosts();
          unsubscribeRequests();
        };
      }
    });
    return subscriber;
  }, [isFocused]);

  const handleLogout = () => {
    auth()
      .signOut()
      .catch(error => {
        console.error('Sign out error', error);
      });
  };

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

  if (!profile) {
    return null; // or a loading indicator
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{profile.name}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileHeader}>
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
        <View style={styles.statsContainer}>
          <View style={styles.stat}><Text style={styles.statNumber}>{posts.length}</Text><Text style={styles.statLabel}>Posts</Text></View>
          <TouchableOpacity style={styles.stat} onPress={() => navigation.navigate('Friends')}>
            <Text style={[styles.statNumber, friendRequests.length > 0 && styles.statNumberHighlight]}>{friends.length}</Text>
            <Text style={styles.statLabel}>Friends</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.bio}>{profile.bio}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreatePost')}><Text style={styles.buttonText}>Create Post</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SearchUsers')}><Text style={styles.buttonText}>Search Users</Text></TouchableOpacity>
      </View>
      <Text style={styles.sectionTitle}>My Posts</Text>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const userLiked = item.likes?.includes(uid);

          return (
            <View style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image source={{ uri: item.authorAvatar }} style={styles.postAvatar} />
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
        }}
      />
    </View>
  );
}