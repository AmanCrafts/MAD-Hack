import React, { useContext } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from '../styles/theme';

// Auth context (make sure you have AuthContext.js)
import { AuthContext } from '../context/AuthContext';

// Auth screens
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';

// Main screens
import HomeScreen from '../screens/Home/HomeScreen';
import TopicListScreen from '../screens/Topics/TopicListScreen';
import TopicDetailScreen from '../screens/TopicDetail/TopicDetailScreen';
import QuizScreen from '../screens/Quiz/QuizScreen';
import ResultScreen from '../screens/Quiz/ResultScreen';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import BookmarksScreen from '../screens/Bookmarks/BookmarksScreen';
import RecommendationsScreen from '../screens/Recommendations/RecommendationsScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import SplashScreen from '../screens/Auth/SplashScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/* ---------------------- TAB NAVIGATOR ---------------------- */
// Simple tab icon component (using Ionicons)
const TabIcon = ({ name, color, size = 24 }) => (
  <Ionicons name={name} size={size} color={color} />
);

// Tab Navigator
const TabNavigator = () => {
  const { signOut, user } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => signOut()
        }
      ]
    );
  };

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
          tabBarIcon: ({ color }) => <TabIcon name="home-outline" color={color} />,
        }}
      />
      <Tab.Screen
        name="Topics"
        component={TopicListScreen}
        options={{
          tabBarLabel: 'Topics',
          tabBarIcon: ({ color }) => <TabIcon name="book-outline" color={color} />,
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{
          tabBarLabel: 'Saved',
          tabBarIcon: ({ color }) => <TabIcon name="bookmark-outline" color={color} />,
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Progress',
          tabBarIcon: ({ color }) => <TabIcon name="stats-chart-outline" color={color} />,
          headerRight: () => (
            <TouchableOpacity 
              onPress={handleLogout}
              style={{ marginRight: 15 }}
            >
              <Ionicons name="log-out-outline" size={24} color={theme.colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

/* ---------------------- MAIN APP STACK ---------------------- */
const MainStack = () => (
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
);

/* ---------------------- AUTH STACK ---------------------- */
const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: theme.colors.surface,
      },
      headerTitleStyle: {
        fontSize: theme.fonts.sizes.large,
        fontWeight: 'bold',
        color: theme.colors.text,
      },
      cardStyle: {
        backgroundColor: theme.colors.background,
      },
    }}
  >
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ title: 'Login', headerShown: false }}
    />
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={{ title: 'Create Account', headerShown: false }}
    />
  </Stack.Navigator>
);

/* ---------------------- ROOT APP NAVIGATOR ---------------------- */
// Main Stack Navigator
const AppNavigator = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
