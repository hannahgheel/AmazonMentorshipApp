import React, { useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import styles from '../components/LearningHubScreenStyles';

export default function LearningHubScreen() {
  const [articles] = useState([
    {
      id: '1',
      title: 'Story of the Week: Car Crash Risks',
      author: 'Safety Advocate',
      summary: 'Women are more likely to die in car crashes because most safety tests use male crash dummies. Discover why this matters for everyone.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    },
    {
      id: '2',
      title: 'Nutrition Tips for PCOS',
      author: 'Dr. Smith',
      summary: 'Learn how nutrition can help manage PCOS symptoms.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    },
    {
      id: '3',
      title: 'Managing Endometriosis Pain',
      author: 'Dr. Lee',
      summary: 'Expert advice on pain management for endometriosis.',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
    },
    {
      id: '4',
      title: 'Misdiagnosed: Women & Heart Attacks',
      author: 'Health Reporter',
      summary: 'Many women are misdiagnosed when having a heart attack because their symptoms differ from men. Learn why awareness matters.',
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
    },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Learning Hub</Text>
      <FlatList
        data={articles}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.articleCard}>
            <Image source={{ uri: item.image }} style={styles.articleImage} />
            <Text style={styles.articleTitle}>{item.title}</Text>
            <Text style={styles.articleAuthor}>{item.author}</Text>
            <Text style={styles.articleSummary}>{item.summary}</Text>
          </View>
        )}
      />
    </View>
  );
}