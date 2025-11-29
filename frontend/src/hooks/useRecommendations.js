import { useMemo } from 'react';
import { useTopics } from '../context/TopicContext';

// Custom hook for topic recommendations
export const useRecommendations = () => {
  const { topics, topicStatus } = useTopics();

  const getRecommendations = useMemo(() => {
    // Get completed topics
    const completedTopics = topics.filter(topic => 
      topicStatus[topic.id] === 'completed'
    );

    // Get not started topics
    const availableTopics = topics.filter(topic => 
      !topicStatus[topic.id] || topicStatus[topic.id] === 'not_started'
    );

    if (availableTopics.length === 0) {
      return [];
    }

    // If no completed topics, recommend easy topics
    if (completedTopics.length === 0) {
      return availableTopics
        .filter(topic => topic.difficulty === 'Easy')
        .slice(0, 3);
    }

    // Get categories of recently completed topics
    const recentCategories = completedTopics
      .slice(-3) // Last 3 completed topics
      .map(topic => topic.category);

    // Get most common category
    const categoryCount = recentCategories.reduce((acc, category) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    const preferredCategory = Object.keys(categoryCount).reduce((a, b) => 
      categoryCount[a] > categoryCount[b] ? a : b
    );

    // Get difficulty progression
    const completedDifficulties = completedTopics.map(topic => topic.difficulty);
    const hasEasy = completedDifficulties.includes('Easy');
    const hasMedium = completedDifficulties.includes('Medium');
    
    let targetDifficulty = 'Easy';
    if (hasEasy && !hasMedium) {
      targetDifficulty = 'Medium';
    } else if (hasMedium) {
      targetDifficulty = 'Hard';
    }

    // Filter recommendations
    let recommendations = availableTopics.filter(topic => 
      topic.category === preferredCategory && topic.difficulty === targetDifficulty
    );

    // If no matches in preferred category, try other categories with same difficulty
    if (recommendations.length === 0) {
      recommendations = availableTopics.filter(topic => 
        topic.difficulty === targetDifficulty
      );
    }

    // If still no matches, get any available topics
    if (recommendations.length === 0) {
      recommendations = availableTopics;
    }

    // Sort by difficulty (Easy -> Medium -> Hard) and return top 3
    const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
    return recommendations
      .sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty])
      .slice(0, 3);
  }, [topics, topicStatus]);

  const getNextTopic = useMemo(() => {
    const recommendations = getRecommendations;
    return recommendations.length > 0 ? recommendations[0] : null;
  }, [getRecommendations]);

  return {
    recommendations: getRecommendations,
    nextTopic: getNextTopic,
  };
};