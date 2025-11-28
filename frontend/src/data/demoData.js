// Demo data for topics and quizzes
export const demoTopics = [
  {
    id: '1',
    title: 'JavaScript Basics',
    description: 'Learn the fundamentals of JavaScript programming',
    category: 'Programming',
    difficulty: 'Easy',
    estimatedTime: 5,
    content: `JavaScript is a versatile programming language used for web development. 

Key concepts:
• Variables (let, const, var)
• Data types (string, number, boolean)
• Functions and scope
• Objects and arrays

JavaScript runs in browsers and servers (Node.js), making it essential for modern web development.`,
    quiz: [
      {
        id: 'q1',
        question: 'Which keyword is used to declare a constant in JavaScript?',
        options: ['var', 'let', 'const', 'final'],
        correctAnswer: 2,
        explanation: 'const is used to declare constants that cannot be reassigned.'
      },
      {
        id: 'q2',
        question: 'What is the result of typeof null in JavaScript?',
        options: ['null', 'undefined', 'object', 'boolean'],
        correctAnswer: 2,
        explanation: 'typeof null returns "object" due to a historical bug in JavaScript.'
      }
    ]
  },
  {
    id: '2',
    title: 'React Components',
    description: 'Understanding React functional components and hooks',
    category: 'Programming',
    difficulty: 'Medium',
    estimatedTime: 8,
    content: `React components are the building blocks of React applications.

Functional Components:
• Use function syntax
• Return JSX
• Can use hooks for state and effects

Common Hooks:
• useState - for state management
• useEffect - for side effects
• useContext - for context consumption

Components promote reusability and maintainable code structure.`,
    quiz: [
      {
        id: 'q1',
        question: 'Which hook is used for state management in functional components?',
        options: ['useEffect', 'useState', 'useContext', 'useReducer'],
        correctAnswer: 1,
        explanation: 'useState hook allows functional components to have state.'
      },
      {
        id: 'q2',
        question: 'What does JSX stand for?',
        options: ['JavaScript XML', 'Java Syntax Extension', 'JavaScript Extension', 'JSON XML'],
        correctAnswer: 0,
        explanation: 'JSX stands for JavaScript XML, allowing HTML-like syntax in JavaScript.'
      }
    ]
  },
  {
    id: '3',
    title: 'Time Complexity',
    description: 'Understanding Big O notation and algorithm efficiency',
    category: 'Aptitude',
    difficulty: 'Medium',
    estimatedTime: 6,
    content: `Time complexity measures how algorithm performance scales with input size.

Common Complexities:
• O(1) - Constant time
• O(log n) - Logarithmic time
• O(n) - Linear time
• O(n²) - Quadratic time

Big O notation describes worst-case scenario, helping choose efficient algorithms for large datasets.`,
    quiz: [
      {
        id: 'q1',
        question: 'What is the time complexity of binary search?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 1,
        explanation: 'Binary search divides the search space in half each iteration, resulting in O(log n).'
      },
      {
        id: 'q2',
        question: 'Which complexity is most efficient for large datasets?',
        options: ['O(n²)', 'O(n)', 'O(log n)', 'O(1)'],
        correctAnswer: 3,
        explanation: 'O(1) constant time is most efficient as it doesn\'t depend on input size.'
      }
    ]
  },
  {
    id: '4',
    title: 'Database Normalization',
    description: 'Learn about database design and normalization forms',
    category: 'Programming',
    difficulty: 'Hard',
    estimatedTime: 10,
    content: `Database normalization organizes data to reduce redundancy and improve integrity.

Normal Forms:
• 1NF - Atomic values, no repeating groups
• 2NF - 1NF + no partial dependencies
• 3NF - 2NF + no transitive dependencies

Benefits:
• Reduces data redundancy
• Prevents update anomalies
• Improves data consistency
• Optimizes storage space`,
    quiz: [
      {
        id: 'q1',
        question: 'What does 1NF (First Normal Form) require?',
        options: ['No partial dependencies', 'Atomic values only', 'No transitive dependencies', 'Primary key exists'],
        correctAnswer: 1,
        explanation: '1NF requires that all values in columns are atomic (indivisible).'
      },
      {
        id: 'q2',
        question: 'Which normal form eliminates transitive dependencies?',
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correctAnswer: 2,
        explanation: '3NF eliminates transitive dependencies where non-key attributes depend on other non-key attributes.'
      }
    ]
  },
  {
    id: '5',
    title: 'Logical Reasoning',
    description: 'Practice logical thinking and problem-solving patterns',
    category: 'Aptitude',
    difficulty: 'Easy',
    estimatedTime: 4,
    content: `Logical reasoning involves analyzing patterns and relationships to solve problems.

Key Skills:
• Pattern recognition
• Deductive reasoning
• Inductive reasoning
• Critical thinking

Common Types:
• Syllogisms
• Analogies
• Series completion
• Coding-decoding

Regular practice improves logical thinking and problem-solving abilities.`,
    quiz: [
      {
        id: 'q1',
        question: 'If all roses are flowers and some flowers are red, what can we conclude?',
        options: ['All roses are red', 'Some roses are red', 'No roses are red', 'Cannot determine'],
        correctAnswer: 3,
        explanation: 'We cannot determine the color of roses from the given information.'
      },
      {
        id: 'q2',
        question: 'Complete the series: 2, 6, 12, 20, ?',
        options: ['28', '30', '32', '36'],
        correctAnswer: 1,
        explanation: 'Pattern: n(n+1) where n = 1,2,3,4,5. Next is 5×6 = 30.'
      }
    ]
  }
];

export const categories = ['All', 'Programming', 'Aptitude'];
export const difficulties = ['All', 'Easy', 'Medium', 'Hard'];