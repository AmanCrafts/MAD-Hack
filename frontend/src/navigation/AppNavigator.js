import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from '../styles/theme';

// Import screens
import HomeScreen from '../screens/Home/HomeScreen';
import TopicListScreen from '../screens/Topics/TopicListScreen';
import TopicDetailScreen from '../screens/TopicDetail/TopicDetailScreen';
import QuizScreen from '../screens/Quiz/QuizScreen';
import ResultScreen from '../screens/Quiz/ResultScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import BookmarksScreen from '../screens/Bookmarks/BookmarksScreen';
import RecommendationsScreen from '../screens/Recommendations/RecommendationsScreen';
import SearchScreen from '../screens/Search/SearchScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: theme.fonts.sizes.small,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: theme.colors.surface,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        },
        headerTitleStyle: {
          fontSize: theme.fonts.sizes.large,
          fontWeight: 'bold',
          color: theme.colors.text,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <TabIcon name="🏠" color={color} />,
        }}
      />
      <Tab.Screen
        name="Topics"
        component={TopicListScreen}
        options={{
          tabBarLabel: 'Topics',
          tabBarIcon: ({ color }) => <TabIcon name="📚" color={color} />,
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Progress',
          tabBarIcon: ({ color }) => <TabIcon name="📊" color={color} />,
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{
          tabBarLabel: 'Saved',
          tabBarIcon: ({ color }) => <TabIcon name="⭐" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

// Simple tab icon component (using emoji for simplicity)
const TabIcon = ({ name, color }) => (
  <Text style={{ fontSize: 24, opacity: color === theme.colors.primary ? 1 : 0.6 }}>
    {name}
  </Text>
);

// Main Stack Navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.surface,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
          },
          headerTitleStyle: {
            fontSize: theme.fonts.sizes.large,
            fontWeight: 'bold',
            color: theme.colors.text,
          },
          headerTintColor: theme.colors.primary,
          cardStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TopicDetail"
          component={TopicDetailScreen}
          options={{ title: 'Topic Details' }}
        />
        <Stack.Screen
          name="Quiz"
          component={QuizScreen}
          options={{ title: 'Quiz' }}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ title: 'Quiz Results' }}
        />
        <Stack.Screen
          name="Recommendations"
          component={RecommendationsScreen}
          options={{ title: 'Recommended for You' }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ title: 'Search Topics' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;