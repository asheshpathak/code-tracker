import type { Problem, AnalyticsData } from '../types';

export const mockProblems: Problem[] = [
  {
    id: '1',
    title: 'Two Sum',
    platform: 'LeetCode',
    difficulty: 'easy',
    topic: 'Arrays',
    timeSpent: 15,
    outcome: 'solved',
    date: 'Today',
    link: 'https://leetcode.com/problems/two-sum/',
    tags: ['Array', 'Hash Table', 'Two Pointers'],
    isRevision: false,
  },
  {
    id: '2',
    title: 'Longest Substring Without Repeating Characters',
    platform: 'LeetCode',
    difficulty: 'medium',
    topic: 'Strings',
    timeSpent: 45,
    outcome: 'hints',
    date: 'Yesterday',
    link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    tags: ['String', 'Sliding Window', 'Hash Map'],
    isRevision: false,
  },
  {
    id: '3',
    title: 'Regular Expression Matching',
    platform: 'LeetCode',
    difficulty: 'hard',
    topic: 'Dynamic Programming',
    timeSpent: 90,
    outcome: 'failed',
    date: '2 days ago',
    link: 'https://leetcode.com/problems/regular-expression-matching/',
    tags: ['DP', 'Recursion', 'String'],
    isRevision: false,
  },
  {
    id: '4',
    title: 'Maximum Subarray',
    platform: 'LeetCode',
    difficulty: 'medium',
    topic: 'Arrays',
    timeSpent: 25,
    outcome: 'solved',
    date: '3 days ago',
    tags: ['Array', "Kadane's Algorithm", 'DP'],
    isRevision: false,
  },
  {
    id: '5',
    title: 'Valid Parentheses',
    platform: 'LeetCode',
    difficulty: 'easy',
    topic: 'Stack',
    timeSpent: 12,
    outcome: 'solved',
    date: '4 days ago',
    tags: ['Stack', 'String'],
    isRevision: false,
  },
  {
    id: '6',
    title: 'Merge Two Sorted Lists',
    platform: 'LeetCode',
    difficulty: 'easy',
    topic: 'Linked List',
    timeSpent: 18,
    outcome: 'solved',
    date: '5 days ago',
    tags: ['Linked List', 'Recursion'],
    isRevision: false,
  },
];

export const mockAnalytics: AnalyticsData = {
  totalProblems: 142,
  weeklySolved: 7,
  currentStreak: 23,
  successRate: 68,
  monthlyChange: 12,
  weeklyChange: 2,
  streakChange: 1,
  rateChange: 5,
};