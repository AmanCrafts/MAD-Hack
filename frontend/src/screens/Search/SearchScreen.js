import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTopics } from '../../context/TopicContext';
import TopicCard from '../../components/TopicCard';
import CategoryTag from '../../components/CategoryTag';
import { categories, difficulties } from '../../data/demoData';
import { theme } from '../../styles/theme';

const SearchScreen = ({ navigation }) => {
  const { topics, topicStatus, toggleBookmark, bookmarks, searchTopics } = useTopics();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTopics, setFilteredTopics] = useState(topics);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  useEffect(() => {
    filterTopics();
  }, [searchQuery, selectedCategory, selectedDifficulty, topics]);

  const filterTopics = () => {
    let results = topics;

    // Apply search query
    if (searchQuery.trim()) {
      results = searchTopics(searchQuery.trim());
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      results = results.filter(topic => topic.category === selectedCategory);
    }

    // Apply difficulty filter
    if (selectedDifficulty !== 'All') {
      results = results.filter(topic => topic.difficulty === selectedDifficulty);
    }

    setFilteredTopics(results);
  };

  const handleTopicPress = (topic) => {
    navigation.navigate('TopicDetail', { topicId: topic.id });
  };

  const handleBookmarkPress = (topicId) => {
    toggleBookmark(topicId);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
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
      <Ionicons name="search-outline" size={64} color={theme.colors.textSecondary} style={styles.emptyIcon} />
      <Text style={styles.emptyText}>
        {searchQuery ? 'No topics found' : 'Search for topics'}
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search topics..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearSearchButton}>
            <Ionicons name="close-circle" size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

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
          {filteredTopics.length} result{filteredTopics.length !== 1 ? 's' : ''} found
        </Text>
        {(searchQuery || selectedCategory !== 'All' || selectedDifficulty !== 'All') && (
          <TouchableOpacity onPress={clearFilters}>
            <Text style={styles.clearFiltersText}>Clear Filters</Text>
          </TouchableOpacity>
        )}
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
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          filteredTopics.length === 0 && styles.emptyListContent
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
    marginBottom: theme.spacing.sm,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.small,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.text,
    paddingVertical: theme.spacing.xs,
  },
  clearIcon: {
    padding: theme.spacing.xs,
  },
  clearIconText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  resultsText: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  clearFiltersText: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.primary,
    fontWeight: '500',
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
    marginBottom: theme.spacing.lg,
  },
  clearButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.medium,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  clearButtonText: {
    fontSize: theme.fonts.sizes.medium,
    fontWeight: '500',
    color: theme.colors.surface,
  },
});

export default SearchScreen;