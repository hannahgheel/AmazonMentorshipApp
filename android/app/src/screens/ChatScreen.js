import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import styles from '../components/ChatScreenStyles';

const ChatScreen = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = auth().currentUser;
  const uid = currentUser ? currentUser.uid : null;
  const navigation = useNavigation();

  useEffect(() => {
    if (!uid) {
      setLoading(false);
      return;
    }

    const unsubscribe = firestore().collection('users').doc(uid).onSnapshot(doc => {
      if (!doc || !doc.exists) {
        setLoading(false);
        return;
      }
      const data = doc.data();
      const friendsUids = data?.friends || [];
      if (friendsUids.length > 0) {
        const fetchFriends = async () => {
          try {
            const friendsArr = await Promise.all(
              friendsUids.map(async fid => {
                if (!fid) return null;
                const userDoc = await firestore().collection('users').doc(fid).get();
                const fdata = userDoc.data();
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
      <Text style={styles.header}>Chats</Text>
      <TouchableOpacity
        style={styles.chatListCard}
        onPress={() => navigation.navigate('AiChatScreen')}
      >
        <Image source={{ uri: 'https://i.imgur.com/6b6Xq8E.png' }} style={styles.avatar} />
        <View>
          <Text style={styles.name}>Chat with AI</Text>
          <Text style={styles.subtitle}>Get instant help and advice</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        data={friends}
        keyExtractor={item => item.uid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatListCard}
            onPress={() => navigation.navigate('ChatMessage', {
              friendUid: item.uid,
              friendName: item.name,
              friendAvatar: item.avatar
            })}
          >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.subtitle}>Tap to chat</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No friends yet. Add users to start chatting!</Text>}
      />
    </View>
  );
};

export default ChatScreen;
