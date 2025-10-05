import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from '../components/FriendsScreenStyles';

export default function FriendsScreen({ navigation }) {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const uid = auth().currentUser?.uid;

  useEffect(() => {
    if (!uid) return;

    // Fetch friends
    const unsubscribeFriends = firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot(doc => {
        if (doc.exists) {
          const userData = doc.data();
          if (userData.friends) {
            Promise.all(
              userData.friends.map(friendId =>
                firestore().collection('users').doc(friendId).get()
              )
            ).then(friendDocs => {
              setFriends(friendDocs.map(doc => ({ id: doc.id, ...doc.data() })));
            });
          }
        }
      });

    // Fetch friend requests
    const unsubscribeRequests = firestore()
      .collection('users')
      .doc(uid)
      .collection('receivedFriendRequests')
      .onSnapshot(snapshot => {
        console.log('Friend requests snapshot:', snapshot);
        if (snapshot) {
          Promise.all(
            snapshot.docs.map(doc =>
              firestore().collection('users').doc(doc.id).get()
            )
          ).then(requestDocs => {
            setFriendRequests(requestDocs.map(doc => ({ id: doc.id, ...doc.data() })));
          });
        }
      });

    return () => {
      unsubscribeFriends();
      unsubscribeRequests();
    };
  }, [uid]);

  const acceptFriendRequest = async (friendId) => {
    if (!uid) return;

    try {
      // Add to friends list for both users
      await firestore().collection('users').doc(uid).update({
        friends: firestore.FieldValue.arrayUnion(friendId),
      });
      await firestore().collection('users').doc(friendId).update({
        friends: firestore.FieldValue.arrayUnion(uid),
      });

      // Remove from friend requests
      await firestore().collection('users').doc(uid).collection('receivedFriendRequests').doc(friendId).delete();
      await firestore().collection('users').doc(friendId).collection('sentFriendRequests').doc(uid).delete();

      Alert.alert('Friend added!');
    } catch (error) {
      console.error('Error accepting friend request:', error);
      Alert.alert('Error', 'Could not accept friend request.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Friend Requests</Text>
      <FlatList
        data={friendRequests}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.requestContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text style={styles.name}>{item.name}</Text>
            </View>
            <TouchableOpacity style={styles.acceptButton} onPress={() => acceptFriendRequest(item.id)}>
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No new friend requests.</Text>}
      />

      <Text style={styles.header}>Friends</Text>
      <FlatList
        data={friends}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendContainer}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>You have no friends yet.</Text>}
      />
    </View>
  );
}
