import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';
import { theme } from '../../styles/theme';

const ProfileScreen = () => {
  const { user, signOut } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: signOut },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Ionicons name="person-circle-outline" size={100} color={theme.colors.primary} />
        <Text style={styles.name}>{user?.name || 'User'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{user?.currentStreak || 0}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{user?.totalTopicsCompleted || 0}</Text>
          <Text style={styles.statLabel}>Completed Topics</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: 30,
  },
  name: {
    fontSize: theme.fonts.sizes.xlarge,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 10,
  },
  email: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 20,
  },
  statBox: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    width: '45%',
    padding: 15,
    alignItems: 'center',
    ...theme.shadows.small,
  },
  statValue: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.textSecondary,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: theme.colors.error || '#E53935',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    width: '80%',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});

export default ProfileScreen;
