import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '../styles/theme';

const AiChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Ensure you are running the backend server.
      // For iOS simulator, it's localhost. For Android emulator, you might need to use 10.0.2.2
      const response = await fetch('https://us-central1-women-shealthapp.cloudfunctions.net/chatWithOpenAI', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const aiMessage = { role: 'assistant', content: data.response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage = { role: 'assistant', content: 'Sorry, I ran into an error. Please ensure the backend server is running.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={item.role === 'user' ? styles.userMessage : styles.aiMessage}>
            <Text style={item.role === 'user' ? styles.userMessageText : styles.aiMessageText}>{item.content}</Text>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
        style={styles.messageList} // Add style to FlatList itself
        contentContainerStyle={styles.list} // Adjust contentContainerStyle
      />
      {loading && <ActivityIndicator size="large" color={colors.accent} style={styles.loading} />}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask your mentor..."
          placeholderTextColor={colors.textSecondary}
        />
        <Button title="Send" onPress={handleSend} color={colors.accent} disabled={loading} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    messageList: {
      flex: 1, // Ensure FlatList takes up all available space
    },
    list: {
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    inputContainer: {
      flexDirection: 'row',
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      backgroundColor: colors.card,
    },
    input: {
      flex: 1,
      borderColor: colors.border,
      borderWidth: 1,
      marginRight: 10,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: colors.background,
      color: colors.textPrimary,
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: colors.accent,
      padding: 12,
      borderRadius: 20,
      marginVertical: 5,
      maxWidth: '80%',
    },
    aiMessage: {
      alignSelf: 'flex-start',
      backgroundColor: colors.card,
      padding: 12,
      borderRadius: 20,
      marginVertical: 5,
      borderWidth: 1,
      borderColor: colors.border,
      maxWidth: '80%',
    },
    userMessageText: {
      fontSize: 16,
      color: '#fff',
    },
    aiMessageText: {
      fontSize: 16,
      color: colors.textPrimary,
    },
    loading: {
      marginVertical: 10,
    }
});

export default AiChatScreen;