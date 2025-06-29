// src/App.jsx
import RhythmQuiz from './components/RhythmQuiz'

function App() {
  return (
    <div className="App" style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🎵 リズムトレーニングアプリ</h1>
      <p>4拍のカウントのあとにリズムが流れます。正しい譜面を選びましょう！</p>
      <RhythmQuiz />
    </div>
  )
}

export default App
