import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>SkillBites</Text>
      <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 20 }} />
      <Text style={styles.subText}>Loading your learning journey...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: theme.colors.primary,
    letterSpacing: 1,
  },
  subText: {
    marginTop: 16,
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
});

export default SplashScreen;
