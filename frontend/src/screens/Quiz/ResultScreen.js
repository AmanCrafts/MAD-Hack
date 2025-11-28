import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuiz } from '../../context/QuizContext';
import { useTopics } from '../../context/TopicContext';
import QuizOption from '../../components/QuizOption';
import { theme } from '../../styles/theme';

const ResultScreen = ({ route, navigation }) => {
  const { topicId } = route.params;
  const { getTopicById, updateTopicStatus } = useTopics();
  const { getResults, resetQuiz } = useQuiz();

  const topic = getTopicById(topicId);
  const results = getResults();

  useEffect(() => {
    // Mark topic as completed
    updateTopicStatus(topicId, 'completed');
  }, [topicId, updateTopicStatus]);

  const handleRetakeQuiz = () => {
    resetQuiz();
    navigation.replace('Quiz', { topicId });
  };

  const handleBackToTopic = () => {
    resetQuiz();
    navigation.navigate('TopicDetail', { topicId });
  };

  const handleBackToHome = () => {
    resetQuiz();
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  const getScoreColor = () => {
    if (results.percentage >= 80) return theme.colors.success;
    if (results.percentage >= 60) return theme.colors.warning;
    return theme.colors.error;
  };

  const getScoreMessage = () => {
    if (results.percentage >= 80) return 'Excellent! 🎉';
    if (results.percentage >= 60) return 'Good job! 👍';
    return 'Keep practicing! 💪';
  };

  if (!topic || !results) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading results...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Score Section */}
      <View style={styles.scoreSection}>
        <Text style={styles.completedText}>Quiz Completed!</Text>
        <View style={styles.scoreCircle}>
          <Text style={[styles.scorePercentage, { color: getScoreColor() }]}>
            {results.percentage}%
          </Text>
          <Text style={styles.scoreDetails}>
            {results.score} out of {results.total}
          </Text>
        </View>
        <Text style={[styles.scoreMessage, { color: getScoreColor() }]}>
          {getScoreMessage()}
        </Text>
      </View>

      {/* Topic Info */}
      <View style={styles.topicSection}>
        <Text style={styles.topicTitle}>{topic.title}</Text>
        <Text style={styles.topicCategory}>{topic.category} • {topic.difficulty}</Text>
      </View>

      {/* Detailed Results */}
      <View style={styles.resultsSection}>
        <Text style={styles.resultsTitle}>Review Answers</Text>
        {results.answers.map((answer, index) => (
          <View key={index} style={styles.questionReview}>
            <Text style={styles.reviewQuestionNumber}>
              Question {index + 1}
            </Text>
            <Text style={styles.reviewQuestionText}>
              {answer.question.question}
            </Text>
            
            <View style={styles.reviewOptions}>
              {answer.question.options.map((option, optionIndex) => (
                <QuizOption
                  key={optionIndex}
                  option={option}
                  index={optionIndex}
                  isSelected={answer.selectedAnswer === optionIndex}
                  isCorrect={optionIndex === answer.question.correctAnswer}
                  isIncorrect={
                    answer.selectedAnswer === optionIndex && 
                    optionIndex !== answer.question.correctAnswer
                  }
                  disabled={true}
                  onPress={() => {}}
                />
              ))}
            </View>

            {/* Explanation */}
            <View style={styles.explanationSection}>
              <Text style={styles.explanationTitle}>Explanation:</Text>
              <Text style={styles.explanationText}>
                {answer.question.explanation}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleBackToHome}>
          <Text style={styles.primaryButtonText}>Back to Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton} onPress={handleRetakeQuiz}>
          <Text style={styles.secondaryButtonText}>Retake Quiz</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tertiaryButton} onPress={handleBackToTopic}>
          <Text style={styles.tertiaryButtonText}>Back to Topic</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    fontSize: theme.fonts.sizes.large,
    color: theme.colors.textSecondary,
  },
  scoreSection: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.xl,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  completedText: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  scoreCircle: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  scorePercentage: {
    fontSize: theme.fonts.sizes.xxlarge + 8,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  scoreDetails: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.textSecondary,
  },
  scoreMessage: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: '500',
  },
  topicSection: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  topicTitle: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  topicCategory: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.textSecondary,
  },
  resultsSection: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  resultsTitle: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  questionReview: {
    marginBottom: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  reviewQuestionNumber: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.primary,
    fontWeight: '500',
    marginBottom: theme.spacing.xs,
  },
  reviewQuestionText: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.text,
    fontWeight: '500',
    marginBottom: theme.spacing.md,
    lineHeight: 22,
  },
  reviewOptions: {
    marginBottom: theme.spacing.md,
  },
  explanationSection: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.medium,
  },
  explanationTitle: {
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  explanationText: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  actionSection: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  primaryButtonText: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
    color: theme.colors.surface,
  },
  secondaryButton: {
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  tertiaryButton: {
    backgroundColor: 'transparent',
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  tertiaryButtonText: {
    fontSize: theme.fonts.sizes.medium,
    color: theme.colors.textSecondary,
  },
});

export default ResultScreen;