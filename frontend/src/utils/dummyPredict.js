// Dummy NLP prediction logic (frontend only, no backend yet).
// Produces a deterministic pseudo-prediction so the UI feels real.

export function dummyPredict({ headline = '', content = '', source = '' }) {
  const text = `${headline} ${content} ${source}`.toLowerCase();

  const fakeKeywords = [
    'shocking',
    'miracle',
    'secret',
    'aliens',
    'ufo',
    'cure',
    'free money',
    'click',
    'viral',
    'conspiracy',
    'hoax',
    'exposed',
    'you won',
    'urgent',
    'breaking!!!'
  ];

  const realKeywords = [
    'report',
    'study',
    'research',
    'official',
    'government',
    'university',
    'data',
    'survey',
    'published',
    'according'
  ];

  let fakeHits = 0;
  let realHits = 0;
  fakeKeywords.forEach((k) => {
    if (text.includes(k)) fakeHits += 1;
  });
  realKeywords.forEach((k) => {
    if (text.includes(k)) realHits += 1;
  });

  // Base hash from text length for stable dummy variance
  const len = text.trim().length;
  const base = 72 + (len % 24); // 72 - 95 range

  let prediction = 'REAL';
  let confidence = base;

  if (fakeHits > realHits) {
    prediction = 'FAKE';
    confidence = Math.min(96, 78 + fakeHits * 4 + (len % 7));
  } else if (realHits > fakeHits) {
    prediction = 'REAL';
    confidence = Math.min(96, 76 + realHits * 3 + (len % 9));
  } else {
    // No strong signal: decide by length parity, keep example near 87%
    prediction = len % 2 === 0 ? 'FAKE' : 'REAL';
    confidence = 82 + (len % 10);
    if (confidence > 96) confidence = 87;
  }

  // Clamp
  if (confidence < 62) confidence = 62;
  if (confidence > 97) confidence = 97;

  return { prediction, confidence };
}
