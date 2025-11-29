# SkillBites Frontend - React Native App

A micro-learning mobile app built with React Native and Expo, featuring short lessons, quizzes, progress tracking, and personalized recommendations.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI: `npm install -g @expo/cli`
- Expo Go app on your mobile device

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Run on device:**
   - Scan the QR code with Expo Go app (Android) or Camera app (iOS)
   - Or press `a` for Android emulator, `i` for iOS simulator

## 📱 Features

### ✅ Implemented
- **Navigation**: Stack + Bottom Tab navigation
- **Topics**: Browse by category and difficulty
- **Content**: Read topic content with estimated time
- **Quizzes**: Multiple choice questions with explanations
- **Progress Tracking**: Topic status (Not Started, In Progress, Completed)
- **Bookmarks**: Save topics for later
- **Search**: Find topics by keywords
- **Dashboard**: Progress stats and achievements
- **Recommendations**: Personalized topic suggestions
- **Streak Tracking**: Daily learning streaks
- **Local Storage**: AsyncStorage for data persistence

### 🎯 Demo Data
- 5 sample topics (Programming & Aptitude categories)
- Each topic has 2-3 quiz questions
- Categories: Programming, Aptitude
- Difficulties: Easy, Medium, Hard

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── TopicCard.js    # Topic display card
│   ├── QuizOption.js   # Quiz answer option
│   ├── ProgressBar.js  # Progress indicator
│   └── CategoryTag.js  # Category/difficulty tags
├── context/            # React Context providers
│   ├── TopicContext.js # Topics, bookmarks, progress
│   └── QuizContext.js  # Quiz state management
├── data/               # Demo data and constants
│   └── demoData.js     # Sample topics and quizzes
├── hooks/              # Custom React hooks
│   └── useRecommendations.js # Recommendation logic
├── navigation/         # Navigation configuration
│   └── AppNavigator.js # Stack + Tab navigation
├── screens/            # Screen components
│   ├── Home/           # Home dashboard
│   ├── Topics/         # Topic browsing
│   ├── TopicDetail/    # Topic content view
│   ├── Quiz/           # Quiz and results
│   ├── Dashboard/      # Progress tracking
│   ├── Bookmarks/      # Saved topics
│   ├── Recommendations/# Suggested topics
│   └── Search/         # Topic search
├── styles/             # Theme and styling
│   └── theme.js        # Global theme config
└── utils/              # Utility functions
    └── storage.js      # AsyncStorage helpers
```

## 🎨 Design System

### Colors
- **Primary**: #4A90E2 (Blue)
- **Secondary**: #7ED321 (Green)
- **Accent**: #F5A623 (Orange)
- **Background**: #F8F9FA (Light Gray)
- **Surface**: #FFFFFF (White)

### Typography
- **Sizes**: 12px (small) to 32px (xxlarge)
- **Weights**: Regular, Medium, Bold

### Spacing
- **Scale**: 4px, 8px, 16px, 24px, 32px, 48px

## 📊 State Management

### TopicContext
- Topics list and metadata
- Topic status tracking
- Bookmark management
- Streak counting
- Search functionality

### QuizContext
- Current quiz state
- Answer tracking
- Score calculation
- Results management

## 💾 Data Persistence

Uses AsyncStorage for:
- Topic completion status
- Bookmarked topics
- Learning streaks
- Quiz scores
- Last activity dates

## 🔧 Key Components

### TopicCard
- Displays topic information
- Shows progress status
- Bookmark toggle
- Category and difficulty tags

### QuizOption
- Multiple choice answer display
- Selection states
- Correct/incorrect indicators
- Disabled state for results

### ProgressBar
- Visual progress indicator
- Customizable colors
- Text display options

## 🎯 Recommendation System

Smart topic suggestions based on:
- Recently completed categories
- Difficulty progression (Easy → Medium → Hard)
- Avoiding completed topics
- User learning patterns

## 📱 Screens Overview

1. **Home**: Welcome, stats, quick actions, recommendations
2. **Topics**: Browse all topics with filters
3. **Topic Detail**: Content reading, quiz info
4. **Quiz**: Question display, answer selection
5. **Results**: Score, review answers, explanations
6. **Dashboard**: Progress stats, achievements
7. **Bookmarks**: Saved topics list
8. **Recommendations**: Personalized suggestions
9. **Search**: Find topics with filters

## 🚀 Next Steps

To extend the app:
1. Add user authentication
2. Implement backend API integration
3. Add more content categories
4. Include video/audio content
5. Social features (sharing, leaderboards)
6. Push notifications for streaks
7. Offline content download
8. Advanced analytics

## 🛠️ Development

### Adding New Topics
Edit `src/data/demoData.js` to add more topics with quiz questions.

### Customizing Theme
Modify `src/styles/theme.js` for colors, fonts, and spacing.

### Adding Screens
1. Create screen component in `src/screens/`
2. Add to navigation in `src/navigation/AppNavigator.js`
3. Update context if needed

##  License

This project is part of the MAD-Hack hackathon submission.