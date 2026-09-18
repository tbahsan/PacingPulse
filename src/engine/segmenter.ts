import { Sentence, SentenceCategory } from './types';

const COMMON_ABBREVIATIONS = new Set([
  'mr', 'mrs', 'ms', 'dr', 'prof', 'sr', 'jr', 'vs', 'etc',
  'eg', 'ie', 'us', 'st', 'approx', 'apt', 'dept', 'est',
  'jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug', 'sep',
  'sept', 'oct', 'nov', 'dec', 'no', 'vol', 'rev', 'hon',
]);

export function countSentenceWords(text: string): number {
  const matches = text.match(/\b[A-Za-z0-9]+(?:['’\-][A-Za-z0-9]+)*\b/gu);
  return matches ? matches.length : 0;
}

export function classifySentenceLength(words: number): SentenceCategory {
  if (words <= 7) return 'short';
  if (words <= 20) return 'medium';
  if (words <= 35) return 'long';
  return 'very_long';
}

/**
 * Splits text into sentences, tracking paragraphs and exact character offsets.
 */
export function segmentSentences(text: string): Sentence[] {
  if (!text || !text.trim()) return [];

  const sentences: Sentence[] = [];
  const len = text.length;

  let currentStart = -1;
  let currentSentenceIndex = 0;
  let currentParagraph = 1;
  let consecutiveNewlines = 0;

  for (let i = 0; i < len; i++) {
    const char = text[i];

    // Track paragraph breaks (2 or more newlines)
    if (char === '\n') {
      consecutiveNewlines++;
      if (consecutiveNewlines === 2) {
        currentParagraph++;
      }
    } else if (char !== '\r' && char !== ' ') {
      consecutiveNewlines = 0;
    }

    // Skip leading whitespace of a new sentence
    if (currentStart === -1) {
      if (/\s/.test(char)) continue;
      currentStart = i;
    }

    // Check for candidate sentence terminator
    if (char === '.' || char === '!' || char === '?') {
      // 1. If part of ellipsis dots, wait until the final dot
      if (char === '.' && i + 1 < len && text[i + 1] === '.') {
        continue;
      }

      // 2. Numbers with decimals: e.g. "3.14" or "12.50"
      if (
        char === '.' &&
        i > 0 &&
        /\d/.test(text[i - 1]) &&
        i + 1 < len &&
        /\d/.test(text[i + 1])
      ) {
        continue;
      }

      // 3. Known abbreviations: extract preceding word
      if (char === '.') {
        let wordStart = i - 1;
        while (wordStart >= 0 && /[A-Za-z]/.test(text[wordStart])) {
          wordStart--;
        }
        const precedingWord = text.slice(wordStart + 1, i).toLowerCase();
        // If known title/honorific abbreviation (e.g. Mr., Dr., Prof.), do not break
        if (COMMON_ABBREVIATIONS.has(precedingWord)) {
          continue;
        }
        // Single capital initial: e.g. "J." in "J. K. Rowling" (if followed by another initial or lowercase)
        if (precedingWord.length === 1 && /[A-Z]/.test(text[wordStart + 1])) {
          // Check following word
          let nextP = i + 1;
          while (nextP < len && /\s/.test(text[nextP])) nextP++;
          // If next is another single letter initial (e.g. "K.") or lowercase, continue
          if (nextP < len && (nextP + 1 >= len || !/[A-Za-z]{2,}/.test(text.slice(nextP, nextP + 2)))) {
            continue;
          }
        }
      }

      // 4. Look ahead for trailing closing quotes, brackets, or ellipsis dots
      let endPos = i + 1;
      while (endPos < len && /['"”’\)\]\.\!\?]/.test(text[endPos])) {
        endPos++;
      }

      // 5. Look ahead to find the first non-whitespace character of the next sentence
      let nextCharPos = endPos;
      while (nextCharPos < len && /\s/.test(text[nextCharPos])) {
        nextCharPos++;
      }

      if (nextCharPos < len) {
        // If the next word is enclosed in quotes, check the first letter inside quotes
        let checkCharPos = nextCharPos;
        while (checkCharPos < len && /['"“‘\(]/.test(text[checkCharPos])) {
          checkCharPos++;
        }

        // If followed by a lowercase letter, this is NOT a sentence break
        // (handles dialog attribution e.g. `"Run!" he shouted` or continuing clauses)
        if (checkCharPos < len && /[a-z]/.test(text[checkCharPos])) {
          continue;
        }
      }

      // 6. Valid sentence boundary reached
      if (endPos >= len || /\s/.test(text[endPos])) {
        const rawSentence = text.slice(currentStart, endPos);
        const trimmed = rawSentence.trim();

        if (trimmed.length > 0) {
          const wordCount = countSentenceWords(trimmed);
          if (wordCount > 0) {
            sentences.push({
              index: currentSentenceIndex++,
              text: trimmed,
              wordCount,
              charCount: trimmed.length,
              start: currentStart,
              end: endPos,
              paragraph: currentParagraph,
              category: classifySentenceLength(wordCount),
            });
          }
        }

        currentStart = -1;
        i = endPos - 1; // Advance loop to end of sentence
      }
    }
  }

  // Handle any trailing text that didn't end with a punctuation mark
  if (currentStart !== -1 && currentStart < len) {
    const rawSentence = text.slice(currentStart);
    const trimmed = rawSentence.trim();
    if (trimmed.length > 0) {
      const wordCount = countSentenceWords(trimmed);
      if (wordCount > 0) {
        sentences.push({
          index: currentSentenceIndex++,
          text: trimmed,
          wordCount,
          charCount: trimmed.length,
          start: currentStart,
          end: len,
          paragraph: currentParagraph,
          category: classifySentenceLength(wordCount),
        });
      }
    }
  }

  return sentences;
}
