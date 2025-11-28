import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

const CategoryTag = ({ 
  category, 
  isSelected = false, 
  onPress, 
  variant = 'default' // 'default', 'filter', 'small'
}) => {
  const getTagStyle = () => {
    const baseStyle = [styles.tag];
    
    if (variant === 'small') {
      baseStyle.push(styles.smallTag);
    }
    
    if (isSelected) {
      baseStyle.push(styles.selectedTag);
    } else if (variant === 'filter') {
      baseStyle.push(styles.filterTag);
    } else {
      baseStyle.push(styles.defaultTag);
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.tagText];
    
    if (variant === 'small') {
      baseStyle.push(styles.smallText);
    }
    
    if (isSelected) {
      baseStyle.push(styles.selectedText);
    } else if (variant === 'filter') {
      baseStyle.push(styles.filterText);
    }
    
    return baseStyle;
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Programming':
        return theme.colors.primary;
      case 'Aptitude':
        return theme.colors.secondary;
      default:
        return theme.colors.textSecondary;
    }
  };

  if (onPress) {
    return (
      <TouchableOpacity
        style={getTagStyle()}
        onPress={() => onPress(category)}
        activeOpacity={0.7}
      >
        <Text style={getTextStyle()}>
          {category}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.tag,
        variant === 'small' ? styles.smallTag : styles.defaultTag,
        { backgroundColor: getCategoryColor(category) }
      ]}
      disabled
    >
      <Text style={[
        styles.tagText,
        variant === 'small' ? styles.smallText : null,
        styles.whiteText
      ]}>
        {category}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.small,
    marginRight: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  smallTag: {
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: theme.spacing.xs / 2,
  },
  defaultTag: {
    backgroundColor: theme.colors.primary,
  },
  filterTag: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectedTag: {
    backgroundColor: theme.colors.primary,
  },
  tagText: {
    fontSize: theme.fonts.sizes.small,
    fontWeight: '500',
    color: theme.colors.surface,
  },
  smallText: {
    fontSize: theme.fonts.sizes.small - 1,
  },
  filterText: {
    color: theme.colors.text,
  },
  selectedText: {
    color: theme.colors.surface,
  },
  whiteText: {
    color: theme.colors.surface,
  },
});

export default CategoryTag;