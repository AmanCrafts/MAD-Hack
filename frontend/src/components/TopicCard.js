import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

const TopicCard = ({ topic, status, isBookmarked, onPress, onBookmark }) => {
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

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      default:
        return 'Not Started';
    }
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

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {topic.title}
          </Text>
          <TouchableOpacity onPress={onBookmark} style={styles.bookmarkButton}>
            <Text style={[styles.bookmark, { color: isBookmarked ? theme.colors.accent : theme.colors.textSecondary }]}>
              {isBookmarked ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {topic.description}
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.tags}>
          <View style={[styles.tag, styles.categoryTag]}>
            <Text style={styles.tagText}>{topic.category}</Text>
          </View>
          
          <View style={[styles.tag, { backgroundColor: getDifficultyColor() }]}>
            <Text style={[styles.tagText, styles.whiteText]}>{topic.difficulty}</Text>
          </View>
        </View>

        <View style={styles.meta}>
          <Text style={styles.time}>{topic.estimatedTime} min</Text>
          <Text style={[styles.status, { color: getStatusColor() }]}>
            {getStatusText()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    marginHorizontal: theme.spacing.md,
    ...theme.shadows.small,
  },
  header: {
    marginBottom: theme.spacing.sm,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  title: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  bookmarkButton: {
    padding: theme.spacing.xs,
  },
  bookmark: {
    fontSize: 20,
  },
  description: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  tags: {
    flexDirection: 'row',
    flex: 1,
  },
  tag: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.small,
    marginRight: theme.spacing.xs,
  },
  categoryTag: {
    backgroundColor: theme.colors.primary,
  },
  tagText: {
    fontSize: theme.fonts.sizes.small,
    fontWeight: '500',
  },
  whiteText: {
    color: theme.colors.surface,
  },
  meta: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  status: {
    fontSize: theme.fonts.sizes.small,
    fontWeight: '500',
  },
});

export default TopicCard;