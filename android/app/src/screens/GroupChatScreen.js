import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { colors } from '../styles/theme';
import styles from '../components/GroupChatScreenStyles';

export default function GroupChatScreen({ route }) {
  const { groupId, groupName } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userProfiles, setUserProfiles] = useState({});
  const uid = auth().currentUser?.uid;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('groups')
      .doc(groupId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(async (snapshot) => {
        if (!snapshot) {
          setMessages([]);
          return;
        }
        const newMessages = await Promise.all(snapshot.docs.map(async (doc) => {
          const messageData = doc.data();
          if (!userProfiles[messageData.sender]) {
            const userDoc = await firestore().collection('users').doc(messageData.sender).get();
            setUserProfiles(prev => ({ ...prev, [messageData.sender]: userDoc.data() }));
          }
          return { id: doc.id, ...messageData };
        }));
        setMessages(newMessages);
      });
    return unsubscribe;
  }, [groupId]);

  const handleSend = async () => {
    if (!message.trim()) return;
    await firestore()
      .collection('groups')
      .doc(groupId)
      .collection('messages')
      .add({
        sender: uid,
        body: message,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{groupName}</Text>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const userProfile = userProfiles[item.sender];
          return (
            <View style={[styles.messageRow, item.sender === uid ? styles.myMessageContainer : styles.theirMessageContainer]}>
              {/* Show sender's name above messages only if not the current user */}
              {item.sender !== uid && userProfile && (
                <Text style={styles.senderName}>
                  {userProfile.name || 'Unknown User'}
                </Text>
              )}
              <View style={[styles.messageBubble, item.sender === uid ? styles.myMessage : styles.theirMessage]}>
                <Text style={styles.messageText}>{item.body}</Text>
              </View>
            </View>
          );
        }}
        style={{ flex: 1 }}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor={colors.textSecondary}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
