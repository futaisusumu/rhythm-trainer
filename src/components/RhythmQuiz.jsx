import { useEffect, useState } from 'react';
import RhythmScore from './RhythmScore.jsx';
import { playCountIn, playRhythm } from '../../utils/playRhythm.js';
import QUESTIONS from '../data/questions.js';

const QUESTION_COUNT = QUESTIONS.length;

const RhythmQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const shuffleArray = (arr) => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    const shuffled = QUESTIONS.map((q) => ({
      ...q,
      choices: shuffleArray(q.choices),
    }));

    setQuestions(shuffled);
  }, []);

  const question = questions[current];

  if (!question) {
    return <p>Loading...</p>;
  }


  const handleStart = async () => {
    setIsPlaying(true);
    await playCountIn();
    await playRhythm(question.correct);
    setIsPlaying(false);
    setIsAnswered(false);
    setSelectedIndex(null);
  };

  const handleSelect = (index) => {
    if (isAnswered) return;
    setSelectedIndex(index);
    setIsAnswered(true);
    const isCorrect = question.choices[index].join() === question.correct.join();
    if (isCorrect) setScore((s) => s + 1);
    alert(isCorrect ? '正解！' : 'ちがうよ！');
  };

  const handleNext = () => {
    setSelectedIndex(null);
    setIsAnswered(false);
    if (current < QUESTION_COUNT - 1) {
      setCurrent((c) => c + 1);
    }
  };

  return (
    <div>
      <h2>リズムクイズ</h2>
      <button onClick={handleStart} disabled={isPlaying}>再生</button>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '20px' }}>
        {question.choices.map((choice, index) => (
          <div
            key={index}
            onClick={() => handleSelect(index)}
            style={{
              border: selectedIndex === index ? '2px solid blue' : '1px solid gray',
              padding: '5px',
              cursor: isAnswered ? 'default' : 'pointer'
            }}
          >
            <RhythmScore notes={choice} />
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>{current + 1} / {QUESTION_COUNT} 問 - 正解 {score} 問</p>
        {isAnswered && current < QUESTION_COUNT - 1 && (
          <button onClick={handleNext}>次の問題</button>
        )}
      </div>
    </div>
  );
};

export default RhythmQuiz;
