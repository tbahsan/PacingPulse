# PacingPulse Linguistic Rules & Heuristics

## 1. Sentence Boundary Disambiguation Rules

Sentence boundaries are identified by terminal punctuation marks (`.`, `!`, `?`) subject to strict contextual exclusions:

1. **Abbreviation Guard**:
   - The engine maintains a dictionary of common abbreviations: `mr`, `mrs`, `ms`, `dr`, `prof`, `sr`, `jr`, `vs`, `etc`, `eg`, `ie`, `us`, `st`, `dept`, `est`, `approx`, etc.
   - Punctuation following these tokens does not terminate a sentence.
   - Single capital initials (e.g. `J.` in `J. K. Rowling`) are preserved when followed by another initial or continuation token.

2. **Decimal Number Guard**:
   - Periods between digits (e.g. `3.14`, `10.5`, `$12.50`) are treated as numerical decimals, not sentence delimiters.

3. **Ellipsis Guard**:
   - Multi-dot sequences (`...`) are treated as single pauses. A boundary is only registered at the conclusion of the ellipsis sequence if followed by an uppercase word.

4. **Dialogue Attribution & Speech Tags**:
   - In quoted dialogue, punctuation immediately preceding a closing quotation mark (e.g. `!"` in `"Run now!" he shouted.`) does not end the sentence if the subsequent token begins with a lowercase letter (indicating dialogue attribution / speech tag).

5. **Paragraph Tracking**:
   - Consecutive newline characters (`\n\n`) increment the paragraph counter to allow structural segmentation.

## 2. Word Counting Rules

- Word boundaries are evaluated using Unicode alphanumeric boundaries (`\b[A-Za-z0-9]+(?:['’\-][A-Za-z0-9]+)*\b`).
- Contractions (e.g. `don't`, `they'll`, `we've`) are counted as single words to reflect natural vocalized syllables and rhythm.
- Hyphenated compound words (e.g. `five-word`, `state-of-the-art`) are treated as single lexical units.

## 3. Rhythm Category Thresholds

| Category | Word Count Range | Narrative Effect |
| :--- | :--- | :--- |
| **Short** | 1 to 7 words | High urgency, staccato rhythm, dramatic punch, climax |
| **Medium** | 8 to 20 words | Conversational flow, balanced exposition, narrative baseline |
| **Long** | 21 to 35 words | Detailed imagery, rhythmic compounds, reflective contemplation |
| **Marathon** | 36+ words | Lyrical sweep, stream of consciousness, sensory accumulation |

## 4. Monotony & Drone Detection Algorithm

- **Consecutive Drone Runs**:
  - A window of 3 or more consecutive sentences where the maximum word count minus minimum word count is $\le 1$ triggers a Monotony Warning (e.g. Gary Provost's iconic "five words" demonstration).
- **Excessive Staccato Clusters**:
  - 4 or more consecutive short sentences ($\le 7$ words) trigger an Urgency / Staccato alert to remind writers to vary tempo.
- **Runaway Marathon Clusters**:
  - 3 or more consecutive marathon sentences ($\ge 36$ words) flag potential cognitive fatigue for readers.
