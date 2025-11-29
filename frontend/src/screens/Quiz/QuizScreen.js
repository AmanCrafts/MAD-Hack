import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useQuiz } from '../../context/QuizContext';
import { useTopics } from '../../context/TopicContext';
import QuizOption from '../../components/QuizOption';
import ProgressBar from '../../components/ProgressBar';
import { theme } from '../../styles/theme';

const QuizScreen = ({ route, navigation }) => {
  const { topicId } = route.params;
  const { getTopicById } = useTopics();
  const {
    currentTopic,
    questions,
    currentQuestionIndex,
    answers,
    isFinished,
    startQuiz,
    answerQuestion,
    nextQuestion,
    getCurrentQuestion,
    getProgress,
    isCurrentQuestionAnswered,
  } = useQuiz();

  const topic = getTopicById(topicId);

  useEffect(() => {
    if (topic && !currentTopic) {
      startQuiz(topic);
    }
  }, [topic, currentTopic, startQuiz]);

  useEffect(() => {
    if (isFinished) {
      navigation.replace('Result', { topicId });
    }
  }, [isFinished, navigation, topicId]);

  if (!topic || !currentTopic) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading quiz...</Text>
      </View>
    );
  }

  const currentQuestion = getCurrentQuestion();
  const progress = getProgress();
  const selectedAnswer = answers[currentQuestionIndex];

  const handleAnswerPress = (answerIndex) => {
    answerQuestion(answerIndex);
  };

  const handleNextPress = () => {
    if (!isCurrentQuestionAnswered()) {
      Alert.alert('Please select an answer', 'You must select an answer before proceeding.');
      return;
    }
    nextQuestion();
  };

  const handleBackPress = () => {
    Alert.alert(
      'Exit Quiz',
      'Are you sure you want to exit? Your progress will be lost.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Exit', style: 'destructive', onPress: () => navigation.goBack() },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.closeButton}>
          <Ionicons name="close-outline" size={28} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${(currentQuestionIndex / questions.length) * 100}%` }]} />
        </View>
        <Text style={styles.questionCount}>
          {currentQuestionIndex + 1}/{questions.length}
        </Text>
      </View>

      {/* Question */}
      <View style={styles.questionSection}>
        <Text style={styles.questionNumber}>
          Question {progress.current} of {progress.total}
        </Text>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsSection}>
        {currentQuestion.options.map((option, index) => (
          <QuizOption
            key={index}
            option={option}
            index={index}
            isSelected={selectedAnswer === index}
            onPress={handleAnswerPress}
            disabled={false}
          />
        ))}
      </View>

      {/* Next Button */}
      <View style={styles.actionSection}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !isCurrentQuestionAnswered() && styles.nextButtonDisabled
          ]}
          onPress={handleNextPress}
          disabled={!isCurrentQuestionAnswered()}
        >
          <Text style={[
            styles.nextButtonText,
            !isCurrentQuestionAnswered() && styles.nextButtonTextDisabled
          ]}>
            {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  backText: {
    fontSize: 20,
    color: theme.colors.textSecondary,
  },
  topicTitle: {
    fontSize: theme.fonts.sizes.medium,
    fontWeight: 'bold',
    color: theme.colors.text,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  progressSection: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  questionSection: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.md,
  },
  questionNumber: {
    fontSize: theme.fonts.sizes.small,
    color: theme.colors.primary,
    fontWeight: '500',
    marginBottom: theme.spacing.sm,
  },
  questionText: {
    fontSize: theme.fonts.sizes.large,
    color: theme.colors.text,
    fontWeight: '500',
    lineHeight: 28,
  },
  optionsSection: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
  actionSection: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  nextButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.medium,
    padding: theme.spacing.md,
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  nextButtonDisabled: {
    backgroundColor: theme.colors.border,
  },
  nextButtonText: {
    fontSize: theme.fonts.sizes.large,
    fontWeight: 'bold',
    color: theme.colors.surface,
  },
  nextButtonTextDisabled: {
    color: theme.colors.textSecondary,
  },
});

export default QuizScreen;