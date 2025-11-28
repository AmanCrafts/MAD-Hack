import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { demoTopics } from '../data/demoData';
import { 
  getTopicStatus, 
  getBookmarks, 
  getStreak, 
  saveTopicStatus, 
  saveBookmark, 
  removeBookmark, 
  updateStreak 
} from '../utils/storage';

const TopicContext = createContext();

// Action types
const ACTIONS = {
  SET_TOPICS: 'SET_TOPICS',
  SET_TOPIC_STATUS: 'SET_TOPIC_STATUS',
  SET_BOOKMARKS: 'SET_BOOKMARKS',
  SET_STREAK: 'SET_STREAK',
  UPDATE_TOPIC_STATUS: 'UPDATE_TOPIC_STATUS',
  TOGGLE_BOOKMARK: 'TOGGLE_BOOKMARK',
  SET_LOADING: 'SET_LOADING',
};

// Initial state
const initialState = {
  topics: demoTopics,
  topicStatus: {}, // { topicId: 'not_started' | 'in_progress' | 'completed' }
  bookmarks: [],
  streak: 0,
  loading: true,
};

// Reducer
const topicReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_TOPICS:
      return { ...state, topics: action.payload };
    case ACTIONS.SET_TOPIC_STATUS:
      return { ...state, topicStatus: action.payload };
    case ACTIONS.SET_BOOKMARKS:
      return { ...state, bookmarks: action.payload };
    case ACTIONS.SET_STREAK:
      return { ...state, streak: action.payload };
    case ACTIONS.UPDATE_TOPIC_STATUS:
      return {
        ...state,
        topicStatus: { ...state.topicStatus, [action.payload.topicId]: action.payload.status }
      };
    case ACTIONS.TOGGLE_BOOKMARK:
      const isBookmarked = state.bookmarks.includes(action.payload);
      return {
        ...state,
        bookmarks: isBookmarked
          ? state.bookmarks.filter(id => id !== action.payload)
          : [...state.bookmarks, action.payload]
      };
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

// Provider component
export const TopicProvider = ({ children }) => {
  const [state, dispatch] = useReducer(topicReducer, initialState);

  // Load data on mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [topicStatus, bookmarks, streak] = await Promise.all([
        getTopicStatus(),
        getBookmarks(),
        getStreak(),
      ]);

      dispatch({ type: ACTIONS.SET_TOPIC_STATUS, payload: topicStatus });
      dispatch({ type: ACTIONS.SET_BOOKMARKS, payload: bookmarks });
      dispatch({ type: ACTIONS.SET_STREAK, payload: streak });
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Update topic status
  const updateTopicStatus = async (topicId, status) => {
    try {
      await saveTopicStatus(topicId, status);
      dispatch({ type: ACTIONS.UPDATE_TOPIC_STATUS, payload: { topicId, status } });
      
      // Update streak if topic is completed
      if (status === 'completed') {
        const newStreak = await updateStreak();
        dispatch({ type: ACTIONS.SET_STREAK, payload: newStreak });
      }
    } catch (error) {
      console.error('Error updating topic status:', error);
    }
  };

  // Toggle bookmark
  const toggleBookmark = async (topicId) => {
    try {
      const isBookmarked = state.bookmarks.includes(topicId);
      if (isBookmarked) {
        await removeBookmark(topicId);
      } else {
        await saveBookmark(topicId);
      }
      dispatch({ type: ACTIONS.TOGGLE_BOOKMARK, payload: topicId });
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  // Get topic by ID
  const getTopicById = (topicId) => {
    return state.topics.find(topic => topic.id === topicId);
  };

  // Get topics by category
  const getTopicsByCategory = (category) => {
    if (category === 'All') return state.topics;
    return state.topics.filter(topic => topic.category === category);
  };

  // Get topics by difficulty
  const getTopicsByDifficulty = (difficulty) => {
    if (difficulty === 'All') return state.topics;
    return state.topics.filter(topic => topic.difficulty === difficulty);
  };

  // Get completed topics count
  const getCompletedTopicsCount = () => {
    return Object.values(state.topicStatus).filter(status => status === 'completed').length;
  };

  // Get bookmarked topics
  const getBookmarkedTopics = () => {
    return state.topics.filter(topic => state.bookmarks.includes(topic.id));
  };

  // Search topics
  const searchTopics = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return state.topics.filter(topic =>
      topic.title.toLowerCase().includes(lowercaseQuery) ||
      topic.description.toLowerCase().includes(lowercaseQuery)
    );
  };

  const value = {
    ...state,
    updateTopicStatus,
    toggleBookmark,
    getTopicById,
    getTopicsByCategory,
    getTopicsByDifficulty,
    getCompletedTopicsCount,
    getBookmarkedTopics,
    searchTopics,
  };

  return (
    <TopicContext.Provider value={value}>
      {children}
    </TopicContext.Provider>
  );
};

// Custom hook
export const useTopics = () => {
  const context = useContext(TopicContext);
  if (!context) {
    throw new Error('useTopics must be used within a TopicProvider');
  }
  return context;
};