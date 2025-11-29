import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';

const QuizOption = ({ option, index, isSelected, isCorrect, isIncorrect, onPress, disabled }) => {
  const getOptionStyle = () => {
    if (disabled) {
      if (isCorrect) {
        return [styles.option, styles.correctOption];
      }
      if (isIncorrect) {
        return [styles.option, styles.incorrectOption];
      }
      if (isSelected) {
        return [styles.option, styles.selectedOption];
      }
    } else if (isSelected) {
      return [styles.option, styles.selectedOption];
    }
    return styles.option;
  };

  const getTextStyle = () => {
    if (disabled && (isCorrect || isIncorrect)) {
      return [styles.optionText, styles.whiteText];
    }
    if (isSelected) {
      return [styles.optionText, styles.selectedText];
    }
    return styles.optionText;
  };

  const getOptionLabel = (index) => {
    return String.fromCharCode(65 + index); // A, B, C, D
  };

  return (
    <TouchableOpacity
      style={getOptionStyle()}
      onPress={() => onPress(index)}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.optionLabel}>
        {getOptionLabel(index)}.
      </Text>
      <Text style={getTextStyle()}>
        {option}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    minHeight: 60,
  },
  selectedOption: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '10',
  },
  correctOption: {
    borderColor: theme.colors.success,
    backgroundColor: theme.colors.success,
  },
  incorrectOption: {
    borderColor: theme.colors.error,
    backgroundColor: theme.colors.error,
  },
  optionLabel: {
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginRight: theme.spacing.sm,
    minWidth: 24,
  },
  optionText: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.text,
    flex: 1,
    lineHeight: 22,
  },
  selectedText: {
    color: theme.colors.primary,
    fontWeight: '500',
  },
  whiteText: {
    color: theme.colors.surface,
  },
});

export default QuizOption;