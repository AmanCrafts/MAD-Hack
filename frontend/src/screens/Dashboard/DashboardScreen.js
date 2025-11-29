import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTopics } from '../../context/TopicContext';
import ProgressBar from '../../components/ProgressBar';
import CategoryTag from '../../components/CategoryTag';
import { theme } from '../../styles/theme';

const DashboardScreen = () => {
  const { topics, topicStatus, streak, getCompletedTopicsCount } = useTopics();

  const completedCount = getCompletedTopicsCount();
  const totalTopics = topics.length;
  const inProgressCount = Object.values(topicStatus).filter(status => status === 'in_progress').length;
  const notStartedCount = totalTopics - completedCount - inProgressCount;

  // Calculate category progress
  const categoryProgress = topics.reduce((acc, topic) => {
    const category = topic.category;
    if (!acc[category]) {
      acc[category] = { total: 0, completed: 0 };
    }
    acc[category].total++;
    if (topicStatus[topic.id] === 'completed') {
      acc[category].completed++;
    }
    return acc;
  }, {});

  // Calculate difficulty progress
  const difficultyProgress = topics.reduce((acc, topic) => {
    const difficulty = topic.difficulty;
    if (!acc[difficulty]) {
      acc[difficulty] = { total: 0, completed: 0 };
    }
    acc[difficulty].total++;
    if (topicStatus[topic.id] === 'completed') {
      acc[difficulty].completed++;
    }
    return acc;
  }, {});

  // Get last completed topic
  const completedTopics = topics.filter(topic => topicStatus[topic.id] === 'completed');
  const lastCompletedTopic = completedTopics[completedTopics.length - 1];

  const getProgressPercentage = (completed, total) => {
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  // Placeholder for stats object, as it's introduced in the instruction's replacement
  // In a real app, these would come from context or calculated data.
  const stats = {
    completed: completedCount,
    streak: streak,
    totalScore: 1250, // Example value
    averageScore: 85, // Example value
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Overview Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Ionicons name="target" size={24} color="#FF6B6B" />
            <Text style={styles.statValue}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="flame" size={24} color="#FFD93D" />
            <Text style={styles.statValue}>{stats.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="star" size={24} color="#4D96FF" />
            <Text style={styles.statValue}>{stats.totalScore}</Text>
            <Text style={styles.statLabel}>Total Score</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="diamond" size={24} color="#6C63FF" />
            <Text style={styles.statValue}>{stats.averageScore}%</Text>
            <Text style={styles.statLabel}>Avg Score</Text>
          </View>
        </View>
      </View>

      {/* Overall Progress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overall Progress</Text>
        <View style={styles.progressCard}>
          <ProgressBar
            current={completedCount}
            total={totalTopics}
            color={theme.colors.primary}
            height={12}
          />
          <Text style={styles.progressText}>
            {getProgressPercentage(completedCount, totalTopics)}% of all topics completed
          </Text>
        </View>
      </View>

      {/* Category Progress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Progress by Category</Text>
        {Object.entries(categoryProgress).map(([category, progress]) => (
          <View key={category} style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <CategoryTag category={category} variant="small" />
              <Text style={styles.progressStats}>
                {progress.completed}/{progress.total}
              </Text>
            </View>
            <ProgressBar
              current={progress.completed}
              total={progress.total}
              showText={false}
              height={8}
              color={category === 'Programming' ? theme.colors.primary : theme.colors.secondary}
            />
          </View>
        ))}
      </View>

      {/* Difficulty Progress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Progress by Difficulty</Text>
        {Object.entries(difficultyProgress).map(([difficulty, progress]) => {
          const getDifficultyColor = () => {
            switch (difficulty) {
              case 'Easy': return theme.colors.success;
              case 'Medium': return theme.colors.warning;
              case 'Hard': return theme.colors.error;
              default: return theme.colors.textSecondary;
            }
          };

          return (
            <View key={difficulty} style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <View style={[styles.difficultyTag, { backgroundColor: getDifficultyColor() }]}>
                  <Text style={styles.difficultyText}>{difficulty}</Text>
                </View>
                <Text style={styles.progressStats}>
                  {progress.completed}/{progress.total}
                </Text>
              </View>
              <ProgressBar
                current={progress.completed}
                total={progress.total}
                showText={false}
                height={8}
                color={getDifficultyColor()}
              />
            </View>
          );
        })}
      </View>

      {/* Last Activity */}
      {lastCompletedTopic && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last Completed</Text>
          <View style={styles.activityCard}>
            <Text style={styles.activityTitle}>{lastCompletedTopic.title}</Text>
            <Text style={styles.activityCategory}>
              {lastCompletedTopic.category} • {lastCompletedTopic.difficulty}
            </Text>
            <Text style={styles.activityDescription}>
              {lastCompletedTopic.description}
            </Text>
          </View>
        </View>
      )}

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsGrid}>
          <View style={[styles.achievementCard, completedCount >= 1 && styles.achievementUnlocked]}>
            <Text style={styles.achievementIcon}>🎯</Text>
            <Text style={styles.achievementTitle}>First Steps</Text>
            <Text style={styles.achievementDesc}>Complete your first topic</Text>
          </View>

          <View style={[styles.achievementCard, streak >= 3 && styles.achievementUnlocked]}>
            <Text style={styles.achievementIcon}>🔥</Text>
            <Text style={styles.achievementTitle}>On Fire</Text>
            <Text style={styles.achievementDesc}>3-day learning streak</Text>
          </View>

          <View style={[styles.achievementCard, completedCount >= 5 && styles.achievementUnlocked]}>
            <Text style={styles.achievementIcon}>⭐</Text>
            <Text style={styles.achievementTitle}>Knowledge Seeker</Text>
            <Text style={styles.achievementDesc}>Complete 5 topics</Text>
          </View>

          <View style={[styles.achievementCard, streak >= 7 && styles.achievementUnlocked]}>
            <Text style={styles.achievementIcon}>💎</Text>
            <Text style={styles.achievementTitle}>Dedicated</Text>
            <Text style={styles.achievementDesc}>7-day learning streak</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.md,
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    alignItems: 'center',
    width: '48%',
    marginBottom: theme.spacing.sm,
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
  progressCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    ...theme.shadows.small,
  },
  progressText: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
  progressItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  progressStats: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.text,
    fontWeight: '500',
  },
  difficultyTag: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.small,
  },
  difficultyText: {
    fontSize: theme.fonts.sizes.small,
    fontWeight: '500',
    color: theme.colors.surface,
  },
  activityCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    ...theme.shadows.small,
  },
  activityTitle: {
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  activityCategory: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  activityDescription: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.md,
    justifyContent: 'space-between',
  },
  achievementCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    alignItems: 'center',
    width: '48%',
    marginBottom: theme.spacing.sm,
    opacity: 0.5,
    ...theme.shadows.small,
  },
  achievementUnlocked: {
    opacity: 1,
    borderWidth: 2,
    borderColor: theme.colors.accent,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: theme.spacing.sm,
  },
  achievementTitle: {
    fontSize: theme.fonts.sizes.small,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  achievementDesc: {
    fontSize: theme.fonts.sizes.small - 1,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});

export default DashboardScreen;