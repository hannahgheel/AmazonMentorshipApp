import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { colors } from '../styles/theme';
import styles from '../components/ChatMessageScreenStyles';

export default function ChatMessageScreen({ route }) {
  const { friendUid, friendName, friendAvatar } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const uid = auth().currentUser?.uid;

  useEffect(() => {
    if (!uid || !friendUid) return;
    const chatId = [uid, friendUid].sort().join('_');
    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot => {
        console.log('Snapshot received:', snapshot);
        if (!snapshot || !snapshot.docs) {
          console.log('Snapshot is null or has no docs, clearing messages.');
          setMessages([]);
          return;
        }
        const newMessages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('New messages:', newMessages);
        setMessages(newMessages);
      });
    return unsubscribe;
  }, [uid, friendUid]);

  const handleSend = async () => {
    if (!message.trim()) return;
    const chatId = [uid, friendUid].sort().join('_');
    await firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add({
        sender: uid,
        receiver: friendUid,
        body: message,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
    setMessage('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Image source={{ uri: friendAvatar }} style={styles.avatar} />
        <Text style={styles.header}>{friendName}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sender === uid ? styles.myMessageContainer : styles.theirMessageContainer]}>
            <View style={[styles.messageBubble, item.sender === uid ? styles.myMessage : styles.theirMessage]}>
              <Text style={styles.messageText}>{item.body}</Text>
            </View>
          </View>
        )}
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