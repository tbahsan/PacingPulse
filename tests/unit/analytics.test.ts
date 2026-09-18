import { describe, expect, it } from 'vitest';
import { analyzePacing, calculateMovingAverage, detectMonotony } from '../../src/engine/analytics';
import { segmentSentences } from '../../src/engine/segmenter';

describe('analyzePacing & detectMonotony', () => {
  it('detects Gary Provost 5-word monotonous drone', () => {
    const text = `This sentence has five words. Here are five more words. Five-word sentences are fine. But several together become monotonous.`;
    const sentences = segmentSentences(text);
    const monotonyRuns = detectMonotony(sentences);

    expect(monotonyRuns.length).toBeGreaterThan(0);
    expect(monotonyRuns[0].reason).toBe('drone');
    expect(monotonyRuns[0].length).toBeGreaterThanOrEqual(3);
    expect(monotonyRuns[0].avgWords).toBe(5);
  });

  it('calculates average sentence length and standard deviation', () => {
    const text = 'One two. One two three four five six.';
    const sentences = segmentSentences(text);
    const stats = analyzePacing(sentences);

    expect(stats.totalSentences).toBe(2);
    expect(stats.totalWords).toBe(8);
    expect(stats.avgSentenceLength).toBe(4);
    // [2, 6] -> mean = 4, variance = ((2-4)^2 + (6-4)^2) / 2 = (4+4)/2 = 4 -> stddev = 2
    expect(stats.standardDeviation).toBe(2);
  });

  it('calculates rolling moving average correctly', () => {
    const text = 'Two words. Four more words here. Six words are written right here.';
    const sentences = segmentSentences(text);
    const ma = calculateMovingAverage(sentences, 3);

    expect(ma.length).toBe(3);
    // Middle sentence moving average of [2, 4, 6] = 4
    expect(ma[1]).toBe(4);
  });

  it('handles empty input gracefully', () => {
    const stats = analyzePacing([]);
    expect(stats.totalSentences).toBe(0);
    expect(stats.avgSentenceLength).toBe(0);
    expect(stats.standardDeviation).toBe(0);
  });
});
