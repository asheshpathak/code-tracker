export interface Problem {
  id: string;
  title: string;
  platform: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  subtopic?: string;
  timeSpent: number; // in minutes
  outcome: 'solved' | 'hints' | 'failed';
  date: string;
  link?: string;
  tags: string;
  approachNotes?: string;
  codeLink?: string;
  isRevision: boolean;
}

export interface AnalyticsData {
  totalProblems: number;
  weeklySolved: number;
  currentStreak: number;
  successRate: number;
  monthlyChange: number;
  weeklyChange: number;
  streakChange: number;
  rateChange: number;
}

export interface NewProblemForm {
  title: string;
  platform: string;
  difficulty: 'easy' | 'medium' | 'hard' | '';
  topic: string;
  subtopic: string;
  outcome: 'solved' | 'hints' | 'failed' | '';
  timeSpent: number;
  link: string;
  tags: [];
  approachNotes: string;
  isRevision: boolean;
  codeLink: string;
}