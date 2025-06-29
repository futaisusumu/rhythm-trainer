import { useState } from 'react';
import RhythmScore from './RhythmScore.jsx';
import { playCountIn, playRhythm } from '../../utils/playRhythm.js';
import { QUESTIONS } from '../data/questions.js';

const RhythmQuiz = () => {
  const [question] = useState(QUESTIONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

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
    alert(isCorrect ? '正解！' : 'ちがうよ！');
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
    </div>
  );
};

export default RhythmQuiz;
