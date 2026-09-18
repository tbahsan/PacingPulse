# PacingPulse Scope & Architectural Boundaries

## 1. Premise & Vision

Writing has music. When all sentences are identical in length, prose becomes a dull, monotonous drone. When varied with short punches, rhythmic compound phrases, and sweeping lyrical periods, sentences sing.

**PacingPulse** is a lightweight, client-side, zero-telemetry prose cadence and sentence length visualizer designed for novelists, essayists, copywriters, and editors.

## 2. In-Scope Capabilities

- **Deterministic Sentence Segmentation Engine**:
  - Handles closing quotes and dialogue attribution tags without breaking dialogue mid-speech.
  - Guards decimal numbers (`3.14`, `$12.50`) and ellipsis dots (`...`).
  - Filters over 30 common English honorifics and abbreviations (`Mr.`, `Dr.`, `etc.`, `p.m.`).
  - Preserves exact document character indices for real-time bidirectional UI highlighting.

- **Statistical Rhythm & Cadence Metrics**:
  - Sentence count, word count, character count.
  - Average words per sentence.
  - Rhythm Variety Index (Standard Deviation of sentence word lengths).
  - Rolling moving average (smoothing window = 3) to illustrate pacing trends across narrative arcs.

- **Cadence Category Classification**:
  - Short (1–7 words): Punchy, staccato, tension, impact.
  - Medium (8–20 words): Standard expository flow and balanced narrative.
  - Long (21–35 words): Elaboration, complex thought, descriptive scenes.
  - Marathon (36+ words): Sweeping, stream-of-consciousness, grand period prose.

- **Monotony & Drone Detection**:
  - Detects runs of 3 or more consecutive sentences with nearly identical word counts ($\Delta \le 1$).
  - Detects excessive staccato clusters (4+ consecutive short sentences) and runaway marathon runs.

- **Interactive SVG Visualization**:
  - Responsive, scalable SVG bar chart with color-coded categories.
  - Optional rolling moving-average polyline.
  - Bidirectional hover and click linking: clicking or hovering a chart bar highlights and scrolls to that sentence in the text editor.

- **Data Export & Privacy Controls**:
  - CSV export detailing sentence index, word count, character count, rhythm category, paragraph number, and text snippet.
  - TXT download and one-click clean copy.
  - 100% client-side operation with strict opt-in local storage (`LocalStorage`).

## 3. Out-of-Scope Boundaries

- **No Remote AI / Cloud Inference**: No OpenAI, Anthropic, or external language model APIs. All parsing is deterministic, instant, and runs locally.
- **No Telemetry or Tracking**: No Google Analytics, Mixpanel, or third-party beacons.
- **No Account or Authentication Walls**: Completely free and usable immediately in any modern browser.
- **No Cloud Database Sync**: Zero server backend. Drafts remain on the user's machine.
