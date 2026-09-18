import { describe, expect, it } from 'vitest';
import { analyzeTextPacing } from '../../src/engine/index';
import { renderPacingChart } from '../../src/ui/chart';
import presets from '../../src/data/presets.json';

describe('DOM & UI Chart Rendering', () => {
  it('renders SVG chart with proper bar count and moving average line', () => {
    const provostPreset = presets[0].text;
    const result = analyzeTextPacing(provostPreset, 3);

    const svg = renderPacingChart(result.sentences, result.stats, {
      showMovingAverage: true,
      activeSentenceIndex: 2,
    });

    expect(svg).toContain('<svg');
    expect(svg).toContain('aria-label="Sentence length bar chart"');
    expect(svg).toContain('class="chart-bar-group"');
    expect(svg).toContain('class="pacing-bar"');
    expect(svg).toContain('stroke="#f59e0b"');
    expect(svg).toContain(`data-sentence-index="2"`);
  });

  it('renders correctly when moving average is toggled off', () => {
    const result = analyzeTextPacing('One. Two. Three.', 3);
    const svg = renderPacingChart(result.sentences, result.stats, {
      showMovingAverage: false,
    });

    expect(svg).toContain('<svg');
    expect(svg).not.toContain('stroke="#f59e0b"');
  });

  it('handles empty text gracefully', () => {
    const result = analyzeTextPacing('', 3);
    const svg = renderPacingChart(result.sentences, result.stats, {
      showMovingAverage: true,
    });

    expect(svg).toContain('Type or paste text above to see the rhythm pulse.');
  });

  it('generates proper CSV formatting for export', () => {
    const text = 'First short sentence. A much longer second sentence here with more details.';
    const result = analyzeTextPacing(text, 3);

    const headers = ['Sentence #', 'Word Count', 'Character Count', 'Rhythm Category', 'Paragraph', 'Text'];
    const rows = result.sentences.map((s) => [
      s.index + 1,
      s.wordCount,
      s.charCount,
      s.category,
      s.paragraph,
      `"${s.text.replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    expect(csvContent).toContain('Sentence #,Word Count,Character Count,Rhythm Category,Paragraph,Text');
    expect(csvContent).toContain('1,3,21,short,1,"First short sentence."');
  });
});
