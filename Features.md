# PROJECT OVERVIEW: **SkillBites – Micro-Learning Platform**

**Goal:**
A mini edtech app that delivers short lessons (topics), lets users take quick quizzes, track their learning progress, maintain streaks, and get personalized topic recommendations.

---

# 1. HIGH-LEVEL APP STRUCTURE

Let’s first visualize the structure for a React Native frontend:

```
skillbites/
│
├── prisma/                   ← Backend: Prisma schema and migrations
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   ├── api/                  ← Backend: API routes (e.g., Next.js API routes or Express)
│   │   ├── topics/
│   │   ├── quizzes/
│   │   ├── users/
│   │   ├── progress/
│   │   ├── bookmarks/
│   │   ├── streaks/
│   │   └── recommendations/
│   │
│   ├── app/                  ← React Native: Main app entry point and navigation
│   │   ├── navigation/       ← Stack/Tab navigators
│   │   ├── screens/          ← Individual screen components
│   │   │   ├── Auth/
│   │   │   ├── Dashboard/
│   │   │   ├── Topics/
│   │   │   ├── Quizzes/
│   │   │   └── Settings/
│   │   └── App.tsx           ← Root component
│   │
│   ├── components/           ← React Native: Reusable UI components
│   ├── hooks/                ← React Native: Custom React hooks (e.g., for data fetching)
│   ├── lib/                  ← Shared utilities (e.g., API client, helper functions)
│   │   ├── api.ts            ← API client for interacting with backend
│   │   ├── utils.ts          ← Helper functions
│   │   └── auth.ts           ← Authentication helpers (e.g., token storage)
│   │
│   ├── types/                ← TypeScript interfaces (shared with backend if possible)
│   │
│   ├── services/             ← Backend: Business logic layer (e.g., topicService.ts)
│   │   ├── topicService.ts
│   │   ├── quizService.ts
│   │   ├── progressService.ts
│   │   └── userService.ts
│   │
│   ├── middleware/           ← Backend: Auth, logging, etc.
│   │
│   └── recommendation.ts     ← Backend: Recommendation logic
│   └── streak.ts             ← Backend: Streak calculation helpers
│
├── .env                      ← Database credentials (for backend)
├── package.json
└── README.md
```

---

# 2. HOW TO INTERACT WITH THE BACKEND API

The React Native app will communicate with the backend API endpoints (e.g., `/api/users`, `/api/topics`) using an HTTP client.

### Step 1: Install dependencies

```bash
npm install axios # or any other HTTP client
```

### Step 2: Create API client

Create a reusable API client in `src/lib/api.ts`:

```ts
import axios from 'axios';

const API_BASE_URL = 'YOUR_BACKEND_API_URL'; // e.g., 'http://localhost:3000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken'); // Assuming AsyncStorage for token storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
```

You can now use this anywhere in your React Native app to make API calls.

---

# 3. HOW EACH MODEL IS USED IN THE APP (via API)

Let’s now break down how every part of your **backend schema** maps to **real app functionality** through API interactions.

---

## USER MODEL

### Purpose:

Stores user information, tracks progress, streaks, and bookmarks.

### Common Operations (via API):

```ts
// Signup
await apiClient.post('/users/signup', { email, password, name });

// Login
const response = await apiClient.post('/users/login', { email, password });
const { token, user } = response.data;
// Store token (e.g., in AsyncStorage) and user data

// Fetch user profile
const userProfile = await apiClient.get('/users/me');
```

### In the App:

- Login/Signup screens
- Dashboard showing total completed topics, last accessed topic
- Streak visualization

---

## CATEGORY MODEL

### Purpose:

Groups topics (like Programming, Aptitude, etc.)

### Common Operations (via API):

```ts
// Fetch all categories with their topics
const response = await apiClient.get('/categories');
const categories = response.data;
```

### In the App:

- Category filter in the sidebar/navigation
- Used for recommendations display

---

## TOPIC MODEL

### Purpose:

Main learning unit — the short lesson.

### Common Operations (via API):

```ts
// Browse all topics
const response = await apiClient.get('/topics', {
  params: { difficulty: 'EASY', categoryId: 'someId' },
});
const topics = response.data;

// Get a single topic with quiz
const response = await apiClient.get(`/topics/${id}`);
const topic = response.data; // Includes quiz data
```

### In the App:

- Topic List screen
- Topic Reading screen
- "Next Topic" suggestions display

---

## QUIZ & QUIZOPTION MODELS

### Purpose:

MCQs tied to each topic.

### Common Operations (via API):

```ts
// Fetch quiz for a topic (often included with topic details)
// If separate:
const response = await apiClient.get(`/topics/${topicId}/quizzes`);
const quizzes = response.data;

// Submit quiz answers
await apiClient.post(`/quizzes/${quizId}/submit`, { answers: [{ questionId, selectedOptionId }] });
```

### In the App:

- Appears after reading a topic
- Displays score, feedback, correct answers

---

## TOPIC PROGRESS MODEL

### Purpose:

Tracks a user’s status and time on each topic.

### Common Operations (via API):

```ts
// Mark topic as in progress
await apiClient.put(`/progress/${topicId}`, { status: 'IN_PROGRESS' });

// Mark topic as completed
await apiClient.put(`/progress/${topicId}`, { status: 'COMPLETED' });

// Fetch user's progress for a topic
const response = await apiClient.get(`/progress/${topicId}`);
const progress = response.data;
```

### In the App:

- “Continue Learning” section on dashboard
- Progress bars for each topic

---

## BOOKMARK MODEL

### Purpose:

Lets users save topics for later.

### Common Operations (via API):

```ts
// Add a bookmark
await apiClient.post('/bookmarks', { topicId });

// Remove a bookmark
await apiClient.delete(`/bookmarks/${topicId}`);

// Fetch user's bookmarks
const response = await apiClient.get('/bookmarks');
const bookmarks = response.data;
```

### In the App:

- “Saved Topics” section

---

## STREAK MODEL

### Purpose:

Tracks daily learning activity (for “You’re on a 5-day streak!”)

### Common Operations (via API):

```ts
// Update streak (backend handles upsert logic)
await apiClient.post('/streaks/update'); // Trigger backend to check/update streak

// Fetch user's streak data
const response = await apiClient.get('/streaks');
const streakData = response.data;
```

### In the App:

- Streak counter display
- Streak calendar visualization

---

## RECENT ACTIVITY MODEL

### Purpose:

Records actions like “started topic”, “completed topic” — used for recommendations.

### Common Operations (via API):

```ts
// Activity is usually recorded by the backend when other actions occur (e.g., topic completion)
// Frontend might trigger an explicit log if needed:
await apiClient.post('/activity', { topicId, action: 'VIEWED' });

// Fetch recent activities for display
const response = await apiClient.get('/activity/recent');
const recentActivities = response.data;
```

### In the App:

- “Continue from where you left off” section
- Used by the backend to generate next topic recommendation

---

## TOPIC SEARCH INDEX MODEL

### Purpose:

Optimizes search performance.

### How to Use (via API):

- The React Native app calls a search API endpoint.
- The backend uses the `TopicSearchIndex` for efficient querying.

```ts
const response = await apiClient.get('/search/topics', {
  params: { query: 'programming basics' },
});
const results = response.data;
```

---

# 4. FEATURE-TO-API MAPPING

| Feature        | Backend API Endpoints                       |
| -------------- | ------------------------------------------- |
| Browse Topics  | `GET /api/topics`, `GET /api/categories`    |
| Take Quiz      | `GET /api/topics/{id}`, `POST /api/quizzes/{id}/submit` |
| Track Progress | `PUT /api/progress/{topicId}`, `GET /api/progress/{topicId}` |
| Dashboard      | `GET /api/dashboard` (aggregates data)      |
| Streak         | `GET /api/streaks`, `POST /api/streaks/update` |
| Bookmarks      | `GET /api/bookmarks`, `POST /api/bookmarks`, `DELETE /api/bookmarks/{topicId}` |
| Recommendation | `GET /api/recommendations/next-topic`       |
| Search         | `GET /api/search/topics`                    |

---

# 5. APP FLOW DIAGRAM (React Native Perspective)

```
User logs in (via API)
   ↓
Dashboard Screen shows → Completed Topics, Last Accessed Topic, Streaks (data from API)
   ↓
Browse Topics Screen by Category / Difficulty / Search (data from API)
   ↓
Click on Topic → Topic Detail Screen (reads content, fetches quiz from API) → Start Quiz
   ↓
Submit Quiz (via API) → See Score & Feedback
   ↓
Mark Topic as Completed (via API) → Update Progress & Streak (backend handles logic)
   ↓
“Next Topic” is recommended based on last category/difficulty (fetched from API)
```

---

# 6. RECOMMENDATION LOGIC (Backend)

`src/lib/recommendation.ts` (This logic resides on the backend and is exposed via an API endpoint like `/api/recommendations/next-topic`)

```ts
// Frontend calls:
// const response = await apiClient.get('/recommendations/next-topic');
// const recommendedTopic = response.data;

// Backend implementation (as provided in original document):
import prisma from "./prisma";

export async function suggestNextTopic(userId: string) {
  const recent = await prisma.recentActivity.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { topic: true },
  });

  if (!recent) return null;

  const { categoryId, difficulty } = recent.topic;

  return await prisma.topic.findFirst({
    where: {
      categoryId,
      difficulty,
      progresses: {
        none: { userId, status: "COMPLETED" },
      },
    },
  });
}
```

---

# 7. DEPLOYMENT & DB CONNECTION (Backend)

In your `.env` (for the backend server):

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/skillbites"
```

Then run (on the backend server):

```bash
npx prisma migrate deploy
```

And your backend API is live. The React Native app connects to this API.

---

# 8. TECH STACK SUMMARY

| Layer     | Technology                              |
| --------- | --------------------------------------- |
| Frontend  | React Native + Expo/CLI                 |
| Backend   | Node.js + Next.js API routes or Express |
| Database  | PostgreSQL                              |
| ORM       | Prisma                                  |
| Auth      | JWT (Backend issues, RN consumes)       |
| Hosting   | Vercel or Render (for backend API)      |
| Analytics | Prisma + custom streak tracking         |

---

# 9. TEAM RESPONSIBILITIES (example split)

| Role               | Responsibilities                     |
| ------------------ | ------------------------------------ |
| Backend Developer  | APIs, Prisma models, business logic  |
| Frontend Developer | React Native UI for lessons, quizzes, dashboards, API integration |
| Designer           | App layout, icons, responsive design |
| Data Engineer      | Recommendation logic, analytics      |
| PM                 | Feature mapping, progress tracking   |

---

# TL;DR SUMMARY

| Concept          | Description                                             |
| ---------------- | ------------------------------------------------------- |
| Prisma schema    | Defines backend data structure for topics, users, quizzes, etc. |
| Backend API      | Exposes data and business logic to the React Native app |
| React Native App | Consumes backend APIs, provides UI/UX                   |
| Folder structure | Separates RN app logic (screens, components, hooks) and backend logic |
| Models           | Map directly to backend data, accessed via API          |
| Recommendation   | Backend logic, consumed by RN app via API               |
| Trackable        | Progress, bookmarks, streaks, quizzes, activities (managed by backend, displayed by RN) |
