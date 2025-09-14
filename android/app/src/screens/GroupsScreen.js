import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from '../components/GroupsScreenStyles';

const RECOMMENDED_GROUPS = [
  { id: '1', name: 'PCOS Support' },
  { id: '2', name: 'Endometriosis Warriors' },
  { id: '3', name: 'Fibroids Community' },
];

export default function GroupsScreen() {
  const [myGroups, setMyGroups] = useState([]);

  const handleJoin = (group) => {
    if (!myGroups.find(g => g.id === group.id)) {
      setMyGroups([...myGroups, group]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recommended Groups</Text>
      <FlatList
        data={RECOMMENDED_GROUPS}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.groupItem}>
            <Text style={styles.groupName}>{item.name}</Text>
            <TouchableOpacity
              style={styles.joinButton}
              onPress={() => handleJoin(item)}
              disabled={!!myGroups.find(g => g.id === item.id)}
            >
              <Text style={styles.joinButtonText}>
                {myGroups.find(g => g.id === item.id) ? 'Joined' : 'Join'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.header}>My Groups</Text>
      {myGroups.length === 0 ? (
        <Text style={styles.emptyText}>You haven't joined any groups yet.</Text>
      ) : (
        <FlatList
          data={myGroups}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.groupItem}>
              <Text style={styles.groupName}>{item.name}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
