export const NOTE_OPTIONS = [
  { value: 'q', beats: 1 },
  { value: 'qr', beats: 1 },
  { value: 'e', beats: 0.5 },
  { value: 'er', beats: 0.5 },
  { value: 'h', beats: 2 },
  { value: 'hr', beats: 2 }
];

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRhythm() {
  const rhythm = [];
  let beats = 0;
  while (beats < 4) {
    const options = NOTE_OPTIONS.filter(o => o.beats <= 4 - beats);
    const pick = randomElement(options);
    rhythm.push(pick.value);
    beats += pick.beats;
  }
  return rhythm;
}

export function generateQuestion(id) {
  const correct = generateRhythm();
  const choices = [correct];
  while (choices.length < 4) {
    const cand = generateRhythm();
    if (!choices.some(c => c.join() === cand.join())) choices.push(cand);
  }
  // shuffle choices
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }
  return { id, correct, choices };
}
