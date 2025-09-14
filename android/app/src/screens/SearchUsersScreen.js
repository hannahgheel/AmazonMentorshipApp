import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from '../components/SearchUsersScreenStyles';

export default function SearchUsersScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const uid = auth().currentUser?.uid;

  useEffect(() => {
    if (!uid) return;

    const unsubscribeUsers = firestore()
      .collection('users')
      .onSnapshot(snapshot => {
        if (snapshot && Array.isArray(snapshot.docs)) {
          const filteredUsers = snapshot.docs
            .map(doc => ({ uid: doc.id, ...doc.data() }))
            .filter(user => user.uid && user.uid !== uid);
          setUsers(filteredUsers);
        }
        setLoading(false);
      });

    const unsubscribeFriends = firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot(doc => {
        const data = doc.data();
        setMyFriends(data?.friends || []);
      });

    return () => {
      unsubscribeUsers();
      unsubscribeFriends();
    };
  }, [uid]);

  const handleAddFriend = async (friendUid) => {
    await firestore()
      .collection('users')
      .doc(uid)
      .update({
        friends: firestore.FieldValue.arrayUnion(friendUid)
      });
    await firestore()
      .collection('users')
      .doc(friendUid)
      .update({
        friends: firestore.FieldValue.arrayUnion(uid)
      });
  };

  if (!uid || loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={styles.header?.color || '#000'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Users</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.uid}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.bio}>{item.bio}</Text>
            </View>
            {myFriends.includes(item.uid) ? (
              <View style={styles.friendsButton}>
                <Text style={styles.friendsButtonText}>Friends</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddFriend(item.uid)}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}

