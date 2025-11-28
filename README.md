# SkillBites – Micro-Learning & Short Lessons

SkillBites is a micro-learning mobile app designed to deliver short lessons with quick quizzes, personalized recommendations, and progress tracking. It focuses on helping learners consume small, structured knowledge efficiently.

---

## 📘 Features

### 1. Content
- Topics include:
  - Title
  - Short description
  - Category (Programming, Aptitude, etc.)
  - Estimated reading time
  - Content body
  - Difficulty level (Easy, Medium, Hard)

---

### 2. Quizzes
- Each topic contains **2–5 MCQs**
- One correct answer per question
- After finishing:
  - Show quiz score
  - Show correct answers
  - Provide brief feedback/explanation

---

### 3. Learner Experience

#### 🔍 Browse & Search
- Browse topics by **category** and **difficulty**
- Search topics using keywords from title/description

#### 📊 Progress & Tracking
- Track topic status:
  - Not Started  
  - In Progress  
  - Completed
- Dashboard shows:
  - Total completed topics  
  - Last accessed topic  
- Topic streak:
  - Count days the user completes at least one topic
- Bookmark topics for later

---

### 4. Recommendation System
- Suggest a **Next Topic** based on:
  - Category of recently completed topics
  - Difficulty progression
- Avoids already completed topics

---

## 🏗️ Suggested Tech Stack
- React Native (Expo or CLI)
- JavaScript
- AsyncStorage / SQLite / MMKV for local data
- Optional backend (Firebase / Supabase)

---

## 📂 Suggested Folder Structure
