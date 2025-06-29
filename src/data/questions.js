// src/data/questions.js

export const QUESTIONS = [
  {
    id: 1,
    correct: ['q', 'e', 'e', 'qr', 'q'],
    choices: [
      ['q', 'e', 'e', 'qr', 'q'],
      ['q', 'qr', 'q', 'e', 'e'],
      ['q', 'qr', 'qr', 'q'],
      ['q', 'e', 'e', 'q', 'qr'],
    ]
  },
  {
    id: 2,
    correct: ['qr', 'q', 'e', 'e', 'q'],
    choices: [
      ['qr', 'q', 'e', 'e', 'q'],
      ['q', 'e', 'qr', 'q', 'e'],
      ['q', 'q', 'qr', 'e', 'e'],
      ['e', 'e', 'q', 'q', 'qr'],
    ]
  },
  {
    id: 3,
    correct: ['h', 'q', 'qr'],
    choices: [
      ['h', 'q', 'qr'],
      ['q', 'h', 'qr'],
      ['qr', 'q', 'h'],
      ['q', 'qr', 'h'],
    ]
  },
  {
    id: 4,
    correct: ['q', 'qr', 'q', 'qr'],
    choices: [
      ['q', 'qr', 'q', 'qr'],
      ['qr', 'q', 'qr', 'q'],
      ['q', 'q', 'qr', 'qr'],
      ['qr', 'qr', 'q', 'q'],
    ]
  },
  {
    id: 5,
    correct: ['e', 'e', 'e', 'e', 'q', 'q'],
    choices: [
      ['e', 'e', 'e', 'e', 'q', 'q'],
      ['q', 'e', 'e', 'e', 'q', 'e'],
      ['e', 'q', 'e', 'e', 'e', 'q'],
      ['q', 'q', 'e', 'e', 'e', 'e'],
    ]
  }
];


export default QUESTIONS; // ✅ これが必要！
