import { MonotonyRun, PacingStats, Sentence } from './types';

/**
 * Calculates rolling moving average of sentence word counts.
 */
export function calculateMovingAverage(sentences: Sentence[], windowSize = 3): number[] {
  if (sentences.length === 0) return [];
  const ma: number[] = [];

  for (let i = 0; i < sentences.length; i++) {
    const start = Math.max(0, i - Math.floor(windowSize / 2));
    const end = Math.min(sentences.length, start + windowSize);
    const slice = sentences.slice(start, end);
    const sum = slice.reduce((acc, s) => acc + s.wordCount, 0);
    ma.push(Math.round((sum / slice.length) * 10) / 10);
  }

  return ma;
}

/**
 * Detects monotony runs (monotonous strings of identical sentence lengths,
 * repetitive staccato clusters, or dense marathon clusters).
 */
export function detectMonotony(sentences: Sentence[]): MonotonyRun[] {
  if (sentences.length < 3) return [];
  const runs: MonotonyRun[] = [];

  // 1. Detect Drone (3+ consecutive sentences with length difference <= 2)
  let runStart = 0;
  let runLen = 1;

  for (let i = 1; i < sentences.length; i++) {
    const diff = Math.abs(sentences[i].wordCount - sentences[i - 1].wordCount);
    if (diff <= 2) {
      runLen++;
    } else {
      if (runLen >= 3) {
        const slice = sentences.slice(runStart, runStart + runLen);
        const avg = Math.round(slice.reduce((acc, s) => acc + s.wordCount, 0) / runLen);
        runs.push({
          startIndex: runStart,
          length: runLen,
          avgWords: avg,
          reason: 'drone',
          message: `${runLen} sentences in a row have nearly identical length (~${avg} words). Rhythm may sound repetitive or monotonous.`,
        });
      }
      runStart = i;
      runLen = 1;
    }
  }

  if (runLen >= 3) {
    const slice = sentences.slice(runStart, runStart + runLen);
    const avg = Math.round(slice.reduce((acc, s) => acc + s.wordCount, 0) / runLen);
    runs.push({
      startIndex: runStart,
      length: runLen,
      avgWords: avg,
      reason: 'drone',
      message: `${runLen} sentences in a row have nearly identical length (~${avg} words). Consider varying sentence structure.`,
    });
  }

  return runs;
}

/**
 * Compiles comprehensive pacing statistics from segmented sentences.
 */
export function analyzePacing(sentences: Sentence[], windowSize = 3): PacingStats {
  const totalSentences = sentences.length;
  if (totalSentences === 0) {
    return {
      totalSentences: 0,
      totalWords: 0,
      totalParagraphs: 0,
      avgSentenceLength: 0,
      minSentenceLength: 0,
      maxSentenceLength: 0,
      standardDeviation: 0,
      distribution: { short: 0, medium: 0, long: 0, very_long: 0 },
      movingAverage: [],
      monotonyRuns: [],
    };
  }

  let totalWords = 0;
  let minLen = sentences[0].wordCount;
  let maxLen = sentences[0].wordCount;
  let maxParagraph = 1;

  const distribution = { short: 0, medium: 0, long: 0, very_long: 0 };

  for (const s of sentences) {
    totalWords += s.wordCount;
    if (s.wordCount < minLen) minLen = s.wordCount;
    if (s.wordCount > maxLen) maxLen = s.wordCount;
    if (s.paragraph > maxParagraph) maxParagraph = s.paragraph;
    distribution[s.category]++;
  }

  const avgSentenceLength = Math.round((totalWords / totalSentences) * 10) / 10;

  // Standard Deviation (Rhythm variety index)
  let sumSqDiff = 0;
  for (const s of sentences) {
    sumSqDiff += Math.pow(s.wordCount - avgSentenceLength, 2);
  }
  const standardDeviation = Math.round(Math.sqrt(sumSqDiff / totalSentences) * 10) / 10;

  const movingAverage = calculateMovingAverage(sentences, windowSize);
  const monotonyRuns = detectMonotony(sentences);

  return {
    totalSentences,
    totalWords,
    totalParagraphs: maxParagraph,
    avgSentenceLength,
    minSentenceLength: minLen,
    maxSentenceLength: maxLen,
    standardDeviation,
    distribution,
    movingAverage,
    monotonyRuns,
  };
}
