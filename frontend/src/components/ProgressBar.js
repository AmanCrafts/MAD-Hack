import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

const ProgressBar = ({ current, total, showText = true, height = 8, color = theme.colors.primary }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <View style={styles.container}>
      {showText && (
        <View style={styles.textContainer}>
          <Text style={styles.progressText}>
            {current} of {total}
          </Text>
          <Text style={styles.percentageText}>
            {Math.round(percentage)}%
          </Text>
        </View>
      )}
      
      <View style={[styles.progressBarContainer, { height }]}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${percentage}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  progressText: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.textSecondary,
  },
  percentageText: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.text,
    fontWeight: '500',
  },
  progressBarContainer: {
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.small,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: theme.borderRadius.small,
  },
});

export default ProgressBar;