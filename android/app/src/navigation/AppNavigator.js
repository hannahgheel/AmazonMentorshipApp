import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import FeedScreen from '../screens/FeedScreen';
import GroupsScreen from '../screens/GroupsScreen';
import ChatScreen from '../screens/ChatScreen';
import ChatMessageScreen from '../screens/ChatMessageScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LearningHubScreen from '../screens/LearningHubScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import CreateProfileScreen from '../screens/CreateProfileScreen';
import SearchUsersScreen from '../screens/SearchUsersScreen';
import FriendsScreen from '../screens/FriendsScreen';
import AiChatScreen from '../screens/AiChatScreen';
import GroupChatScreen from '../screens/GroupChatScreen';
import CommentScreen from '../screens/CommentScreen';
import { colors } from '../styles/theme';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.card,
    text: colors.textPrimary,
    border: colors.border,
    primary: colors.accent,
  },
};

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.forestGreen, // applies to all headers
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Feed') {
            iconName = 'home';
          } else if (route.name === 'Groups') {
            iconName = 'account-group';
          } else if (route.name === 'Chat') {
            iconName = 'chat';
          } else if (route.name === 'LearningHub') {
            iconName = 'school';
          } else if (route.name === 'Profile') {
            iconName = 'account';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Groups" component={GroupsScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="LearningHub" component={LearningHubScreen} options={{ title: 'Learning Hub' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}



function MainStack() {
  return (
    <Stack.Navigator initialRouteName="MainTabs">
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs} 
        options={{ 
          header: () => <Header />,
        }} 
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const [user, setUser] = useState(null);
  const [profileComplete, setProfileComplete] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let unsubscribeProfile = () => {}; // Initialize with a no-op function

    const unsubscribeAuth = auth().onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const userDocRef = firestore().collection('users').doc(firebaseUser.uid);
        unsubscribeProfile = userDocRef.onSnapshot(doc => {
          setProfileComplete(doc.data()?.profileComplete);
          setChecking(false);
        });
      } else {
        // Clean up profile listener if user logs out
        unsubscribeProfile(); 
        setProfileComplete(null);
        setChecking(false);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeProfile(); // Ensure cleanup on component unmount
    };
  }, []);

  if (checking) return null;

  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthStack} options={{ headerShown: false }} />
        ) : !profileComplete ? (
          <Stack.Screen name="CreateProfile" component={CreateProfileScreen} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Main" component={MainStack} options={{ headerShown: false }} />
        )}
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
        <Stack.Screen name="SearchUsers" component={SearchUsersScreen} />
        <Stack.Screen name="Friends" component={FriendsScreen} />
        <Stack.Screen name="ChatMessage" component={ChatMessageScreen} />
        <Stack.Screen name="AiChatScreen" component={AiChatScreen} />
        <Stack.Screen name="GroupChatScreen" component={GroupChatScreen} />
        <Stack.Screen name="CommentScreen" component={CommentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}