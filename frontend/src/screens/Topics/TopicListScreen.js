import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTopics } from '../../context/TopicContext';
import TopicCard from '../../components/TopicCard';
import CategoryTag from '../../components/CategoryTag';
import { categories, difficulties } from '../../data/demoData';
import { theme } from '../../styles/theme';

const TopicListScreen = ({ navigation }) => {
  const { topics, topicStatus, toggleBookmark, bookmarks } = useTopics();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  // Filter topics based on selected category and difficulty
  const filteredTopics = topics.filter(topic => {
    const categoryMatch = selectedCategory === 'All' || topic.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'All' || topic.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

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

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Search Button */}
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => navigation.navigate('Search')}
      >
        <Ionicons name="search-outline" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
        <Text style={styles.searchText}>Search topics...</Text>
      </TouchableOpacity>

      {/* Category Filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Category</Text>
        <View style={styles.filterRow}>
          {categories.map((category) => (
            <CategoryTag
              key={category}
              category={category}
              isSelected={selectedCategory === category}
              onPress={setSelectedCategory}
              variant="filter"
            />
          ))}
        </View>
      </View>

      {/* Difficulty Filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Difficulty</Text>
        <View style={styles.filterRow}>
          {difficulties.map((difficulty) => (
            <CategoryTag
              key={difficulty}
              category={difficulty}
              isSelected={selectedDifficulty === difficulty}
              onPress={setSelectedDifficulty}
              variant="filter"
            />
          ))}
        </View>
      </View>

      {/* Results Count */}
      <View style={styles.resultsSection}>
        <Text style={styles.resultsText}>
          {filteredTopics.length} topic{filteredTopics.length !== 1 ? 's' : ''} found
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredTopics}
        renderItem={renderTopic}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
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
  header: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.small,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: theme.spacing.sm,
  },
  searchText: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.textSecondary,
    flex: 1,
  },
  filterSection: {
    marginBottom: theme.spacing.md,
  },
  filterTitle: {
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resultsSection: {
    paddingVertical: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  resultsText: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
});

export default TopicListScreen;