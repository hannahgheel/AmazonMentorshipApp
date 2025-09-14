import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import styles from '../components/ChatScreenStyles';

const ChatScreen = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { uid } = auth().currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }

    const unsubscribe = firestore().collection('users').doc(uid).onSnapshot(doc => {
      const data = doc.data();
      console.log('User data:', data);
      const friendsUids = data?.friends || [];
      console.log('Friend UIDs:', friendsUids);
      if (friendsUids.length > 0) {
        const fetchFriends = async () => {
          try {
            const friendsArr = await Promise.all(
              friendsUids.map(async fid => {
                if (!fid) return null;
                const userDoc = await firestore().collection('users').doc(fid).get();
                const fdata = userDoc.data();
                console.log('Friend data for UID', fid, fdata);
                if (userDoc.exists) {
                  return { ...fdata, uid: fid };
                }
                return null;
              })
            );
            setFriends(friendsArr.filter(Boolean));
          } catch (error) {
            console.error('Error fetching friends:', error);
          } finally {
            setLoading(false);
          }
        };
        fetchFriends();
      } else {
        setFriends([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [uid]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        keyExtractor={item => item.uid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate('ChatMessage', {
              friendUid: item.uid,
              friendName: item.name,
              friendAvatar: item.avatar
            })}
          >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No friends yet. Add users to start chatting!</Text>}
      />
    </View>
  );
};

export default ChatScreen;
