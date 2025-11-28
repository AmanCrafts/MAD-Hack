import AsyncStorage from '@react-native-async-storage/async-storage';

// Storage keys
const KEYS = {
  TOPIC_STATUS: 'topic_status',
  BOOKMARKS: 'bookmarks',
  STREAK: 'streak',
  LAST_COMPLETED_DATE: 'last_completed_date',
  QUIZ_SCORES: 'quiz_scores',
};

// Topic status operations
export const saveTopicStatus = async (topicId, status) => {
  try {
    const existingStatus = await getTopicStatus();
    const updatedStatus = { ...existingStatus, [topicId]: status };
    await AsyncStorage.setItem(KEYS.TOPIC_STATUS, JSON.stringify(updatedStatus));
    return updatedStatus;
  } catch (error) {
    console.error('Error saving topic status:', error);
    return {};
  }
};

export const getTopicStatus = async () => {
  try {
    const status = await AsyncStorage.getItem(KEYS.TOPIC_STATUS);
    return status ? JSON.parse(status) : {};
  } catch (error) {
    console.error('Error getting topic status:', error);
    return {};
  }
};

// Bookmark operations
export const saveBookmark = async (topicId) => {
  try {
    const bookmarks = await getBookmarks();
    const updatedBookmarks = [...bookmarks, topicId];
    await AsyncStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(updatedBookmarks));
    return updatedBookmarks;
  } catch (error) {
    console.error('Error saving bookmark:', error);
    return [];
  }
};

export const removeBookmark = async (topicId) => {
  try {
    const bookmarks = await getBookmarks();
    const updatedBookmarks = bookmarks.filter(id => id !== topicId);
    await AsyncStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(updatedBookmarks));
    return updatedBookmarks;
  } catch (error) {
    console.error('Error removing bookmark:', error);
    return [];
  }
};

export const getBookmarks = async () => {
  try {
    const bookmarks = await AsyncStorage.getItem(KEYS.BOOKMARKS);
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (error) {
    console.error('Error getting bookmarks:', error);
    return [];
  }
};

// Streak operations
export const updateStreak = async () => {
  try {
    const today = new Date().toDateString();
    const lastDate = await AsyncStorage.getItem(KEYS.LAST_COMPLETED_DATE);
    const currentStreak = await getStreak();

    if (lastDate === today) {
      return currentStreak; // Already completed today
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    let newStreak;
    if (lastDate === yesterday.toDateString()) {
      newStreak = currentStreak + 1; // Continue streak
    } else {
      newStreak = 1; // Start new streak
    }

    await AsyncStorage.setItem(KEYS.STREAK, newStreak.toString());
    await AsyncStorage.setItem(KEYS.LAST_COMPLETED_DATE, today);
    return newStreak;
  } catch (error) {
    console.error('Error updating streak:', error);
    return 0;
  }
};

export const getStreak = async () => {
  try {
    const streak = await AsyncStorage.getItem(KEYS.STREAK);
    return streak ? parseInt(streak) : 0;
  } catch (error) {
    console.error('Error getting streak:', error);
    return 0;
  }
};

// Quiz score operations
export const saveQuizScore = async (topicId, score, totalQuestions) => {
  try {
    const scores = await getQuizScores();
    const updatedScores = { 
      ...scores, 
      [topicId]: { score, totalQuestions, date: new Date().toISOString() }
    };
    await AsyncStorage.setItem(KEYS.QUIZ_SCORES, JSON.stringify(updatedScores));
    return updatedScores;
  } catch (error) {
    console.error('Error saving quiz score:', error);
    return {};
  }
};

export const getQuizScores = async () => {
  try {
    const scores = await AsyncStorage.getItem(KEYS.QUIZ_SCORES);
    return scores ? JSON.parse(scores) : {};
  } catch (error) {
    console.error('Error getting quiz scores:', error);
    return {};
  }
};

// Clear all data (for development/testing)
export const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove(Object.values(KEYS));
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};