import * as Tone from 'tone';

// ✅ テンポ（BPM）は1か所で管理
export const BPM = 100;

/**
 * カウントイン（4拍）を安定したテンポで再生
 */
export const playCountIn = async () => {
  await Tone.start(); // 音再生許可（ユーザー操作後）

  const synth = new Tone.Synth().toDestination();

  // Transport設定の初期化とテンポ設定
  Tone.Transport.stop();
  Tone.Transport.cancel(); // 予約を全部消す
  Tone.Transport.bpm.value = BPM;

  // 4拍のクリックを予約（C6の音）
  for (let i = 0; i < 4; i++) {
    Tone.Transport.scheduleOnce(time => {
      synth.triggerAttackRelease("C6", "8n", time);
    }, `${i}`);
  }

  // カウント終了後に resolve する
  return new Promise(resolve => {
    Tone.Transport.scheduleOnce(() => resolve(), '4');
    Tone.Transport.start();
  });
};

/**
 * 与えられたリズムパターンを再生する
 * @param {string[]} notes - 例: ['e', 'e', 'q', 'q']
 */
export const playRhythm = async (notes) => {
  if (!Array.isArray(notes)) {
    console.error('無効なリズムデータ:', notes);
    return;
  }

  await Tone.start();
  const synth = new Tone.Synth({
    oscillator: {
      type: 'square'
    },
    envelope: {
      attack: 0.01,
      decay: 0.1,
      sustain: 0.3,
      release: 0.2
    }
  }).toDestination();

  // Transportの設定をカウントと合わせる
  Tone.Transport.stop();
  Tone.Transport.cancel();
  Tone.Transport.bpm.value = BPM;

  // ノートの長さを拍数と実際の音の長さで定義
  const lengths = {
    e: { beats: 0.5, duration: '8n' },
    q: { beats: 1, duration: '4n' },
    h: { beats: 2, duration: '2n' },
    er: { beats: 0.5, duration: '8n' },
    qr: { beats: 1, duration: '4n' },
    hr: { beats: 2, duration: '2n' },
  };

  let beat = 0;
  notes.forEach((note) => {
    const info = lengths[note] ?? { beats: 1, duration: '4n' };
    if (!String(note).endsWith('r')) {
      Tone.Transport.scheduleOnce((time) => {
        synth.triggerAttackRelease('C5', info.duration, time);
      }, beat);
    }
    beat += info.beats;
  });

  // 演奏終了まで待つ
  await new Promise((resolve) => {
    Tone.Transport.scheduleOnce(() => resolve(), beat);
    Tone.Transport.start();
  });
};
