import { AnalysisResult } from './types';
import { segmentSentences } from './segmenter';
import { analyzePacing } from './analytics';

export * from './types';
export * from './segmenter';
export * from './analytics';

/**
 * High-level analysis API: segments text and computes full pacing analytics.
 */
export function analyzeTextPacing(text: string, movingAvgWindow = 3): AnalysisResult {
  const sentences = segmentSentences(text);
  const stats = analyzePacing(sentences, movingAvgWindow);
  return { sentences, stats };
}
