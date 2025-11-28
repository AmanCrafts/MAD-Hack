import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTopics } from '../../context/TopicContext';
import { useRecommendations } from '../../hooks/useRecommendations';
import TopicCard from '../../components/TopicCard';
import { theme } from '../../styles/theme';

const HomeScreen = ({ navigation }) => {
  const { topics, topicStatus, toggleBookmark, bookmarks, streak, getCompletedTopicsCount } = useTopics();
  const { nextTopic, recommendations } = useRecommendations();

  const completedCount = getCompletedTopicsCount();
  const totalTopics = topics.length;

  const handleTopicPress = (topic) => {
    navigation.navigate('TopicDetail', { topicId: topic.id });
  };

  const handleBookmarkPress = (topicId) => {
    toggleBookmark(topicId);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome to SkillBites! 🎯</Text>
        <Text style={styles.welcomeSubtitle}>
          Learn something new in just a few minutes
        </Text>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{completedCount}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{streak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalTopics}</Text>
          <Text style={styles.statLabel}>Total Topics</Text>
        </View>
      </View>

      {/* Next Topic Section */}
      {nextTopic && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Continue Learning</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Recommendations')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <TopicCard
            topic={nextTopic}
            status={topicStatus[nextTopic.id] || 'not_started'}
            isBookmarked={bookmarks.includes(nextTopic.id)}
            onPress={() => handleTopicPress(nextTopic)}
            onBookmark={() => handleBookmarkPress(nextTopic.id)}
          />
        </View>
      )}

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Topics')}
          >
            <Text style={styles.actionIcon}>📚</Text>
            <Text style={styles.actionTitle}>Browse Topics</Text>
            <Text style={styles.actionSubtitle}>Explore all available topics</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.actionIcon}>🔍</Text>
            <Text style={styles.actionTitle}>Search</Text>
            <Text style={styles.actionSubtitle}>Find specific topics</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Dashboard')}
          >
            <Text style={styles.actionIcon}>📊</Text>
            <Text style={styles.actionTitle}>Progress</Text>
            <Text style={styles.actionSubtitle}>View your learning stats</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('Bookmarks')}
          >
            <Text style={styles.actionIcon}>⭐</Text>
            <Text style={styles.actionTitle}>Bookmarks</Text>
            <Text style={styles.actionSubtitle}>Your saved topics</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Topics */}
      {recommendations.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          {recommendations.slice(0, 2).map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              status={topicStatus[topic.id] || 'not_started'}
              isBookmarked={bookmarks.includes(topic.id)}
              onPress={() => handleTopicPress(topic)}
              onBookmark={() => handleBookmarkPress(topic.id)}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  welcomeSection: {
    padding: theme.spacing.md,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  welcomeTitle: {
    fontSize: theme.fonts.sizes.xxlarge,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  welcomeSubtitle: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  statCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    alignItems: 'center',
    minWidth: 80,
    ...theme.shadows.small,
  },
  statNumber: {
    fontSize: theme.fonts.sizes.xlarge,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  seeAllText: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.md,
    justifyContent: 'space-between',
  },
  actionCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    alignItems: 'center',
    width: '48%',
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: theme.spacing.sm,
  },
  actionTitle: {
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  actionSubtitle: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});

export default HomeScreen;