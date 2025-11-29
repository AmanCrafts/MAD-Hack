import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTopics } from '../../context/TopicContext';
import CategoryTag from '../../components/CategoryTag';
import { theme } from '../../styles/theme';

const TopicDetailScreen = ({ route, navigation }) => {
  const { topicId } = route.params;
  const { getTopicById, topicStatus, updateTopicStatus, toggleBookmark, bookmarks } = useTopics();

  const topic = getTopicById(topicId);
  const status = topicStatus[topicId] || 'not_started';
  const isBookmarked = bookmarks.includes(topicId);

  useEffect(() => {
    // Mark as in progress when user opens the topic
    if (status === 'not_started') {
      updateTopicStatus(topicId, 'in_progress');
    }
  }, [topicId, status, updateTopicStatus]);

  if (!topic) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Topic not found</Text>
      </View>
    );
  }

  const handleStartQuiz = () => {
    navigation.navigate('Quiz', { topicId });
  };

  const handleBookmarkPress = () => {
    toggleBookmark(topicId);
  };

  const getDifficultyColor = () => {
    switch (topic.difficulty) {
      case 'Easy':
        return theme.colors.success;
      case 'Medium':
        return theme.colors.warning;
      case 'Hard':
        return theme.colors.error;
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return theme.colors.success;
      case 'in_progress':
        return theme.colors.warning;
      default:
        return theme.colors.textSecondary;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{topic.title}</Text>
          <TouchableOpacity onPress={handleBookmarkPress} style={styles.bookmarkButton}>
            <Ionicons
              name={isBookmarked ? "bookmark" : "bookmark-outline"}
              size={28}
              color={isBookmarked ? theme.colors.primary : theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>{topic.description}</Text>

        {/* Meta Information */}
        <View style={styles.metaRow}>
          <CategoryTag category={topic.category} variant="small" />
          <View style={[styles.difficultyTag, { backgroundColor: getDifficultyColor() }]}>
            <Text style={styles.difficultyText}>{topic.difficulty}</Text>
          </View>
          <View style={styles.timeTag}>
            <Ionicons name="time-outline" size={16} color={theme.colors.textSecondary} style={{ marginRight: 4 }} />
            <Text style={styles.timeText}>{topic.estimatedTime} min</Text>
          </View>
        </View>

        {/* Status */}
        <View style={styles.statusRow}>
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            Status: {status === 'not_started' ? 'Not Started' : status === 'in_progress' ? 'In Progress' : 'Completed'}
          </Text>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentSection}>
        <Text style={styles.contentTitle}>Content</Text>
        <Text style={styles.content}>{topic.content}</Text>
      </View>

      {/* Quiz Info Section */}
      <View style={styles.quizSection}>
        <Text style={styles.quizTitle}>Quiz Information</Text>
        <View style={styles.quizInfo}>
          <View style={styles.quizInfoItem}>
            <Text style={styles.quizInfoLabel}>Questions:</Text>
            <Text style={styles.quizInfoValue}>{topic.quiz.length}</Text>
          </View>
          <View style={styles.quizInfoItem}>
            <Text style={styles.quizInfoLabel}>Type:</Text>
            <Text style={styles.quizInfoValue}>Multiple Choice</Text>
          </View>
          <View style={styles.quizInfoItem}>
            <Text style={styles.quizInfoLabel}>Time:</Text>
            <Text style={styles.quizInfoValue}>~2-3 minutes</Text>
          </View>
        </View>
      </View>

      {/* Action Button */}
      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.startButton} onPress={handleStartQuiz}>
          <Text style={styles.startButtonText}>
            {status === 'completed' ? 'Retake Quiz' : 'Start Quiz'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  errorText: {
    fontSize: theme.fonts.sizes.large,
    color: theme.colors.error,
  },
  header: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: theme.fonts.sizes.xlarge,
    fontWeight: 'bold',
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  bookmarkButton: {
    padding: theme.spacing.xs,
  },
  bookmark: {
    fontSize: 24,
  },
  description: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.textSecondary,
    lineHeight: 22,
    marginBottom: theme.spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  difficultyTag: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.xs / 2,
    borderRadius: theme.borderRadius.small,
    marginRight: theme.spacing.xs,
  },
  difficultyText: {
    fontSize: theme.fonts.sizes.small - 1,
    fontWeight: '500',
    color: theme.colors.surface,
  },
  timeTag: {
    backgroundColor: theme.colors.border,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.xs / 2,
    borderRadius: theme.borderRadius.small,
  },
  timeText: {
    fontSize: theme.fonts.sizes.small - 1,
    color: theme.colors.textSecondary,
  },
  statusRow: {
    marginTop: theme.spacing.sm,
  },
  statusText: {
    fontSize: theme.fonts.sizes.medium,
    fontWeight: '500',
  },
  contentSection: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  contentTitle: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  content: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.text,
    lineHeight: 24,
  },
  quizSection: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  quizTitle: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  quizInfo: {
    gap: theme.spacing.sm,
  },
  quizInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quizInfoLabel: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.textSecondary,
  },
  quizInfoValue: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.text,
    fontWeight: '500',
  },
  actionSection: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  startButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  startButtonText: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
    color: theme.colors.surface,
  },
});

export default TopicDetailScreen;