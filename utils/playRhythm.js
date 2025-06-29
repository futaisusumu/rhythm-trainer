import * as Tone from 'tone';

// ✅ テンポ（BPM）は1か所で管理
export const BPM = 80;

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
  const synth = new Tone.Synth().toDestination();

  const interval = 60 / BPM; // 1拍の長さ（秒）
  const now = Tone.now();

  notes.forEach((note, index) => {
    synth.triggerAttackRelease("C5", "8n", now + index * interval);
  });

  // 全部の音が終わるまで待つ
  await new Promise(resolve =>
    setTimeout(resolve, interval * notes.length * 1000)
  );
};
