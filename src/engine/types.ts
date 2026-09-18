/**
 * PacingPulse Core Types
 */

export type SentenceCategory = 'short' | 'medium' | 'long' | 'very_long';

export interface Sentence {
  index: number; // 0-based sequential sentence index
  text: string;  // Raw trimmed sentence text
  wordCount: number;
  charCount: number;
  start: number; // Character start offset in full text
  end: number;   // Character end offset in full text
  paragraph: number; // 1-based paragraph index
  category: SentenceCategory;
}

export interface MonotonyRun {
  startIndex: number;
  length: number;
  avgWords: number;
  reason: 'drone' | 'staccato_cluster' | 'marathon_cluster';
  message: string;
}

export interface PacingStats {
  totalSentences: number;
  totalWords: number;
  totalParagraphs: number;
  avgSentenceLength: number;
  minSentenceLength: number;
  maxSentenceLength: number;
  standardDeviation: number; // Rhythm variety indicator
  distribution: {
    short: number;      // 1 - 7 words
    medium: number;     // 8 - 20 words
    long: number;       // 21 - 35 words
    very_long: number;  // 36+ words
  };
  movingAverage: number[];
  monotonyRuns: MonotonyRun[];
}

export interface AnalysisResult {
  sentences: Sentence[];
  stats: PacingStats;
}
