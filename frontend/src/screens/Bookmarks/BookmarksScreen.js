import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTopics } from '../../context/TopicContext';
import TopicCard from '../../components/TopicCard';
import { theme } from '../../styles/theme';

const BookmarksScreen = ({ navigation }) => {
  const { getBookmarkedTopics, topicStatus, toggleBookmark, bookmarks } = useTopics();

  const bookmarkedTopics = getBookmarkedTopics();

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
      <Text style={styles.emptyIcon}>⭐</Text>
      <Text style={styles.emptyTitle}>No Bookmarks Yet</Text>
      <Text style={styles.emptyDescription}>
        Bookmark topics you want to revisit later by tapping the star icon on any topic card.
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Your Bookmarked Topics</Text>
      <Text style={styles.headerSubtitle}>
        {bookmarkedTopics.length} topic{bookmarkedTopics.length !== 1 ? 's' : ''} saved
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarkedTopics}
        renderItem={renderTopic}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={bookmarkedTopics.length > 0 ? renderHeader : null}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          bookmarkedTopics.length === 0 && styles.emptyListContent
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

export default BookmarksScreen;