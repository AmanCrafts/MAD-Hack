import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTopics } from '../../context/TopicContext';
import { useRecommendations } from '../../hooks/useRecommendations';
import TopicCard from '../../components/TopicCard';
import { theme } from '../../styles/theme';

const RecommendationsScreen = ({ navigation }) => {
  const { topicStatus, toggleBookmark, bookmarks, getCompletedTopicsCount } = useTopics();
  const { recommendations } = useRecommendations();

  const completedCount = getCompletedTopicsCount();

  const handleTopicPress = (topic) => {
    navigation.navigate('TopicDetail', { topicId: topic.id });
  };

  const handleBookmarkPress = (topicId) => {
    toggleBookmark(topicId);
  };

  const renderTopic = ({ item }) => (
    <TopicCard
      topic={item}
      status={topicStatus[item.id] || 'not_started'}
      isBookmarked={bookmarks.includes(item.id)}
      onPress={() => handleTopicPress(item)}
      onBookmark={() => handleBookmarkPress(item.id)}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🎯</Text>
      <Text style={styles.emptyTitle}>
        {completedCount === 0 ? 'Start Learning!' : 'All Caught Up!'}
      </Text>
      <Text style={styles.emptyDescription}>
        {completedCount === 0
          ? 'Complete your first topic to get personalized recommendations based on your learning progress.'
          : 'You\'ve completed all available topics in your preferred categories. Great job!'
        }
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Recommended for You</Text>
      <Text style={styles.headerSubtitle}>
        Based on your learning progress and preferences
      </Text>
      
      {completedCount > 0 && (
        <View style={styles.recommendationInfo}>
          <Text style={styles.infoTitle}>How we recommend:</Text>
          <Text style={styles.infoText}>
            • Topics from categories you've recently completed
          </Text>
          <Text style={styles.infoText}>
            • Progressive difficulty based on your achievements
          </Text>
          <Text style={styles.infoText}>
            • Avoiding topics you've already finished
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={recommendations}
        renderItem={renderTopic}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          recommendations.length === 0 && styles.emptyListContent
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContent: {
    paddingBottom: theme.spacing.lg,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  recommendationInfo: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  infoTitle: {
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  infoText: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    paddingLeft: theme.spacing.sm,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.xxl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: theme.spacing.lg,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: theme.fonts.sizes.xlarge,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  emptyDescription: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default RecommendationsScreen;