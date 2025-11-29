import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TopicProvider } from './src/context/TopicContext';
import { QuizProvider } from './src/context/QuizContext';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/styles/theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <TopicProvider>
          <QuizProvider>
            <AppNavigator />
            <StatusBar style="dark" backgroundColor={theme.colors.surface} />
          </QuizProvider>
        </TopicProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
