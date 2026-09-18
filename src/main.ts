import presetsData from './data/presets.json';
import { AnalysisResult, analyzeTextPacing } from './engine/index';
import { DraftStore } from './storage/draft-store';
import { renderPacingChart } from './ui/chart';

interface PresetItem {
  id: string;
  name: string;
  description: string;
  text: string;
}

const presets: PresetItem[] = presetsData as PresetItem[];

// State
let currentAnalysis: AnalysisResult | null = null;
let activeSentenceIndex: number | null = null;
let hoveredSentenceIndex: number | null = null;
let showMovingAverage = true;

// DOM Elements
const editorInput = document.getElementById('editor-input') as HTMLTextAreaElement;
const editorHighlights = document.getElementById('editor-highlights') as HTMLElement;
const chartContainer = document.getElementById('chart-container') as HTMLElement;
const metricSentences = document.getElementById('metric-sentences') as HTMLElement;
const metricWords = document.getElementById('metric-words') as HTMLElement;
const metricAvg = document.getElementById('metric-avg') as HTMLElement;
const metricStdDev = document.getElementById('metric-stddev') as HTMLElement;
const monotonyCard = document.getElementById('monotony-card') as HTMLElement;
const monotonyContent = document.getElementById('monotony-content') as HTMLElement;
const toggleTrendline = document.getElementById('toggle-trendline') as HTMLInputElement;
const copyBtn = document.getElementById('copy-btn') as HTMLButtonElement;
const downloadCsvBtn = document.getElementById('download-csv-btn') as HTMLButtonElement;
const downloadTxtBtn = document.getElementById('download-txt-btn') as HTMLButtonElement;
const clearBtn = document.getElementById('clear-btn') as HTMLButtonElement;
const themeToggle = document.getElementById('theme-toggle') as HTMLButtonElement;
const themeIcon = document.getElementById('theme-icon') as HTMLElement;
const themeText = document.getElementById('theme-text') as HTMLElement;
const optInStorage = document.getElementById('opt-in-storage') as HTMLInputElement;
const clearDraftBtn = document.getElementById('clear-draft-btn') as HTMLButtonElement;
const presetPills = document.querySelectorAll('.preset-pill');

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Builds synchronized backdrop highlights for sentences.
 */
function renderHighlights(): void {
  if (!currentAnalysis || currentAnalysis.sentences.length === 0) {
    editorHighlights.innerHTML = '';
    return;
  }

  const text = editorInput.value;
  const sentences = currentAnalysis.sentences;
  let html = '';
  let lastIndex = 0;

  for (let i = 0; i < sentences.length; i++) {
    const s = sentences[i];
    if (s.start < lastIndex) continue;

    // Plain text before sentence
    html += escapeHtml(text.slice(lastIndex, s.start));

    const isActive = activeSentenceIndex === i || hoveredSentenceIndex === i;
    const isMonotony = currentAnalysis.stats.monotonyRuns.some(
      (run) => i >= run.startIndex && i < run.startIndex + run.length,
    );

    const classes = [
      'sentence-mark',
      isActive ? 'active' : '',
      isMonotony ? 'monotony' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const sentenceText = text.slice(s.start, s.end);
    html += `<mark class="${classes}" data-sentence-index="${i}">${escapeHtml(sentenceText)}</mark>`;

    lastIndex = s.end;
  }

  html += escapeHtml(text.slice(lastIndex));
  editorHighlights.innerHTML = html + '\n';
}

/**
 * Updates the chart and metrics.
 */
function updateViews(): void {
  if (!currentAnalysis) return;

  const { sentences, stats } = currentAnalysis;

  // Render SVG Chart
  chartContainer.innerHTML = renderPacingChart(sentences, stats, {
    activeSentenceIndex,
    hoveredSentenceIndex,
    showMovingAverage,
  });

  // Re-render editor backdrop
  renderHighlights();

  // Metrics
  metricSentences.textContent = String(stats.totalSentences);
  metricWords.textContent = String(stats.totalWords);
  metricAvg.textContent = `${stats.avgSentenceLength} words`;
  metricStdDev.textContent = String(stats.standardDeviation);

  // Monotony feedback
  if (stats.monotonyRuns.length > 0) {
    monotonyCard.className = 'card alert-card';
    const issues = stats.monotonyRuns
      .map(
        (run) => `
        <div style="margin-top: 0.25rem;">
          ⚠️ <strong>Sentence #${run.startIndex + 1}–#${run.startIndex + run.length}:</strong> ${escapeHtml(run.message)}
        </div>
      `,
      )
      .join('');
    monotonyContent.innerHTML = `<strong>Rhythm Alert:</strong> ${issues}`;
  } else if (sentences.length > 3) {
    monotonyCard.className = 'card alert-card clean';
    monotonyContent.innerHTML = `
      <strong>Prose Harmony:</strong> Varied sentence structure detected. The narrative flows with natural musical cadence.
    `;
  } else {
    monotonyCard.className = 'card alert-card clean';
    monotonyContent.innerHTML = `
      <strong>Getting Started:</strong> Enter text to see rhythm and pacing diagnostics.
    `;
  }
}

/**
 * Main analysis loop.
 */
function runAnalysis(): void {
  const text = editorInput.value;
  currentAnalysis = analyzeTextPacing(text, 3);
  updateViews();

  if (DraftStore.getSettings().optInStorage) {
    DraftStore.saveDraft(text);
  }
}

/**
 * Event Handlers & User Interactions.
 */
function setupEvents(): void {
  editorInput.addEventListener('input', runAnalysis);

  // Synchronize scrolling between editor and backdrop
  editorInput.addEventListener('scroll', () => {
    const backdrop = document.querySelector('.editor-backdrop') as HTMLElement;
    if (backdrop) {
      backdrop.scrollTop = editorInput.scrollTop;
      backdrop.scrollLeft = editorInput.scrollLeft;
    }
  });

  // Cursor click detection inside editor textarea to highlight chart bar
  editorInput.addEventListener('click', () => {
    if (!currentAnalysis || currentAnalysis.sentences.length === 0) return;
    const cursor = editorInput.selectionStart;
    const found = currentAnalysis.sentences.find(
      (s) => cursor >= s.start && cursor <= s.end,
    );
    if (found) {
      activeSentenceIndex = found.index;
      updateViews();
    }
  });

  // Chart interactivity (hover and click)
  chartContainer.addEventListener('mouseover', (e) => {
    const target = (e.target as HTMLElement).closest('[data-sentence-index]') as HTMLElement | null;
    if (target) {
      const idx = parseInt(target.getAttribute('data-sentence-index') || '-1', 10);
      if (idx >= 0 && idx !== hoveredSentenceIndex) {
        hoveredSentenceIndex = idx;
        renderHighlights();
      }
    }
  });

  chartContainer.addEventListener('mouseout', (e) => {
    const target = (e.target as HTMLElement).closest('[data-sentence-index]') as HTMLElement | null;
    if (target) {
      hoveredSentenceIndex = null;
      renderHighlights();
    }
  });

  chartContainer.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('[data-sentence-index]') as HTMLElement | null;
    if (target && currentAnalysis) {
      const idx = parseInt(target.getAttribute('data-sentence-index') || '-1', 10);
      if (idx >= 0) {
        activeSentenceIndex = idx;
        updateViews();
        // Scroll editor to sentence
        const sentence = currentAnalysis.sentences[idx];
        if (sentence) {
          editorInput.focus();
          editorInput.setSelectionRange(sentence.start, sentence.end);
        }
      }
    }
  });

  // Toggle Trendline
  toggleTrendline.addEventListener('change', () => {
    showMovingAverage = toggleTrendline.checked;
    updateViews();
  });

  // Preset Selection
  presetPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      presetPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const presetKey = pill.getAttribute('data-preset');
      if (presetKey === 'blank') {
        editorInput.value = '';
      } else {
        const found = presets.find((p) => p.id === presetKey);
        if (found) {
          editorInput.value = found.text;
        }
      }
      activeSentenceIndex = null;
      hoveredSentenceIndex = null;
      runAnalysis();
    });
  });

  // Copy Clean Text
  copyBtn.addEventListener('click', async () => {
    const text = editorInput.value;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      const orig = copyBtn.textContent;
      copyBtn.textContent = '✓ Copied!';
      setTimeout(() => {
        copyBtn.textContent = orig;
      }, 1500);
    } catch {
      editorInput.select();
      document.execCommand('copy');
    }
  });

  // Download CSV
  downloadCsvBtn.addEventListener('click', () => {
    if (!currentAnalysis || currentAnalysis.sentences.length === 0) return;

    const headers = ['Sentence #', 'Word Count', 'Character Count', 'Rhythm Category', 'Paragraph', 'Text'];
    const rows = currentAnalysis.sentences.map((s) => [
      s.index + 1,
      s.wordCount,
      s.charCount,
      s.category,
      s.paragraph,
      `"${s.text.replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pacingpulse-data.csv`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Download TXT
  downloadTxtBtn.addEventListener('click', () => {
    const text = editorInput.value;
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pacingpulse-draft.txt`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Clear
  clearBtn.addEventListener('click', () => {
    if (editorInput.value && confirm('Are you sure you want to clear the editor?')) {
      editorInput.value = '';
      activeSentenceIndex = null;
      hoveredSentenceIndex = null;
      runAnalysis();
    }
  });

  // Theme Toggle
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    themeText.textContent = newTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
  });

  // LocalStorage Opt-in
  const settings = DraftStore.getSettings();
  optInStorage.checked = settings.optInStorage;

  optInStorage.addEventListener('change', () => {
    DraftStore.setOptIn(optInStorage.checked);
    if (optInStorage.checked) {
      runAnalysis();
    }
  });

  clearDraftBtn.addEventListener('click', () => {
    DraftStore.clearDraft();
    alert('Saved draft cleared from this browser.');
  });

  // Restore saved draft or default to Gary Provost
  const saved = DraftStore.loadDraft();
  if (saved) {
    editorInput.value = saved;
  } else {
    editorInput.value = presets[0].text;
  }
}

// Boot
setupEvents();
runAnalysis();
