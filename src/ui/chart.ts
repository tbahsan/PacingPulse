import { PacingStats, Sentence } from '../engine/types';

export interface ChartOptions {
  activeSentenceIndex?: number | null;
  hoveredSentenceIndex?: number | null;
  showMovingAverage?: boolean;
}

export function renderPacingChart(
  sentences: Sentence[],
  stats: PacingStats,
  options: ChartOptions = {},
): string {
  if (sentences.length === 0) {
    return `
      <div style="height: 14rem; display: flex; align-items: center; justify-content: center; color: var(--text-muted); font-size: 0.9rem;">
        Type or paste text above to see the rhythm pulse.
      </div>
    `;
  }

  const height = 240;
  const paddingLeft = 40;
  const paddingRight = 30;
  const paddingTop = 25;
  const paddingBottom = 40;

  const barWidth = 20;
  const barGap = 8;
  const chartWidth = Math.max(
    650,
    paddingLeft + paddingRight + sentences.length * (barWidth + barGap),
  );

  const innerHeight = height - paddingTop - paddingBottom;
  const maxWords = Math.max(25, stats.maxSentenceLength + 5);

  function getY(words: number): number {
    return paddingTop + innerHeight - (words / maxWords) * innerHeight;
  }

  // Grid lines
  const gridInterval = maxWords > 40 ? 10 : 5;
  let gridLinesHtml = '';
  for (let val = 0; val <= maxWords; val += gridInterval) {
    const y = getY(val);
    gridLinesHtml += `
      <line x1="${paddingLeft}" y1="${y}" x2="${chartWidth - paddingRight}" y2="${y}" stroke="var(--line)" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>
      <text x="${paddingLeft - 8}" y="${y + 4}" fill="var(--text-muted)" font-size="10" text-anchor="end" font-family="var(--font-mono)">${val}</text>
    `;
  }

  // Bars
  let barsHtml = '';
  const pointsForTrend: Array<{ x: number; y: number }> = [];

  for (let i = 0; i < sentences.length; i++) {
    const s = sentences[i];
    const x = paddingLeft + i * (barWidth + barGap);
    const y = getY(s.wordCount);
    const barHeight = height - paddingBottom - y;

    let fill = 'var(--accent)';
    switch (s.category) {
      case 'short':
        fill = '#38bdf8'; // Sky blue
        break;
      case 'medium':
        fill = '#22c55e'; // Emerald green
        break;
      case 'long':
        fill = '#a855f7'; // Purple
        break;
      case 'very_long':
        fill = '#f43f5e'; // Rose
        break;
    }

    const isActive = options.activeSentenceIndex === i || options.hoveredSentenceIndex === i;
    const opacity = isActive ? '1' : '0.85';
    const stroke = isActive ? '#fff' : 'none';
    const strokeWidth = isActive ? 2 : 0;

    barsHtml += `
      <g class="chart-bar-group" data-sentence-index="${i}" style="cursor: pointer;">
        <rect
          x="${x}"
          y="${y}"
          width="${barWidth}"
          height="${barHeight}"
          rx="4"
          fill="${fill}"
          opacity="${opacity}"
          stroke="${stroke}"
          stroke-width="${strokeWidth}"
          class="pacing-bar"
        >
          <title>Sentence #${i + 1}: ${s.wordCount} words (${s.category})&#10;"${s.text.slice(0, 80)}..."</title>
        </rect>
        <text
          x="${x + barWidth / 2}"
          y="${y - 6}"
          fill="${isActive ? 'var(--text-main)' : 'var(--text-muted)'}"
          font-size="10"
          font-weight="${isActive ? 'bold' : 'normal'}"
          text-anchor="middle"
          font-family="var(--font-mono)"
        >
          ${s.wordCount}
        </text>
        <text
          x="${x + barWidth / 2}"
          y="${height - paddingBottom + 16}"
          fill="var(--text-muted)"
          font-size="9"
          text-anchor="middle"
          font-family="var(--font-mono)"
        >
          #${i + 1}
        </text>
      </g>
    `;

    // Calculate point for moving average line
    if (stats.movingAverage[i] !== undefined) {
      pointsForTrend.push({
        x: x + barWidth / 2,
        y: getY(stats.movingAverage[i]),
      });
    }
  }

  // Moving Average Path
  let trendLineHtml = '';
  if ((options.showMovingAverage ?? true) && pointsForTrend.length > 1) {
    const d = pointsForTrend
      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
      .join(' ');

    trendLineHtml = `
      <path
        d="${d}"
        fill="none"
        stroke="#f59e0b"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        opacity="0.9"
      />
    `;
  }

  return `
    <div style="overflow-x: auto; width: 100%;">
      <svg
        viewBox="0 0 ${chartWidth} ${height}"
        width="100%"
        height="${height}"
        style="min-width: ${Math.min(chartWidth, 650)}px; display: block;"
        role="img"
        aria-label="Sentence length bar chart"
      >
        <!-- Gridlines -->
        ${gridLinesHtml}

        <!-- Axis Baseline -->
        <line
          x1="${paddingLeft}"
          y1="${height - paddingBottom}"
          x2="${chartWidth - paddingRight}"
          y2="${height - paddingBottom}"
          stroke="var(--line)"
          stroke-width="1.5"
        />

        <!-- Bars -->
        ${barsHtml}

        <!-- Moving Average Curve -->
        ${trendLineHtml}
      </svg>
    </div>
  `;
}
