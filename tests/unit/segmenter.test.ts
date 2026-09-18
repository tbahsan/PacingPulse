import { describe, expect, it } from 'vitest';
import { segmentSentences } from '../../src/engine/segmenter';

describe('segmentSentences', () => {
  it('segments simple sentences cleanly with word and character counts', () => {
    const text = 'First sentence here. Second one follows! Is this the third?';
    const sentences = segmentSentences(text);

    expect(sentences.length).toBe(3);
    expect(sentences[0].wordCount).toBe(3);
    expect(sentences[0].text).toBe('First sentence here.');
    expect(sentences[1].wordCount).toBe(3);
    expect(sentences[1].text).toBe('Second one follows!');
    expect(sentences[2].wordCount).toBe(4);
    expect(sentences[2].text).toBe('Is this the third?');
  });

  it('preserves abbreviations without false sentence splits', () => {
    const text = 'Dr. Smith met Mr. Brown at 5 p.m. in Washington, D.C. They discussed etc. matters.';
    const sentences = segmentSentences(text);

    expect(sentences.length).toBe(2);
    expect(sentences[0].text).toContain('Dr. Smith met Mr. Brown');
    expect(sentences[1].text).toContain('They discussed etc. matters.');
  });

  it('handles numbers with decimal points correctly', () => {
    const text = 'The temperature dropped by 3.14 degrees. It cost $12.50 total.';
    const sentences = segmentSentences(text);

    expect(sentences.length).toBe(2);
    expect(sentences[0].text).toContain('3.14 degrees');
    expect(sentences[1].text).toContain('$12.50 total');
  });

  it('handles dialog with closing quotation marks properly', () => {
    const text = '"Run now!" he shouted. "We don\'t have time!"';
    const sentences = segmentSentences(text);

    expect(sentences.length).toBe(2);
    expect(sentences[0].text).toBe('"Run now!" he shouted.');
    expect(sentences[1].text).toBe('"We don\'t have time!"');
  });

  it('handles ellipses without splitting mid-ellipsis', () => {
    const text = 'She waited in the darkness... and listened. A sound echoed.';
    const sentences = segmentSentences(text);

    expect(sentences.length).toBe(2);
    expect(sentences[0].text).toContain('darkness...');
  });

  it('tracks character offsets accurately for DOM highlighting', () => {
    const text = 'Short one. Another longer sentence here.';
    const sentences = segmentSentences(text);

    expect(text.slice(sentences[0].start, sentences[0].end)).toBe('Short one.');
    expect(text.slice(sentences[1].start, sentences[1].end)).toBe('Another longer sentence here.');
  });
});
