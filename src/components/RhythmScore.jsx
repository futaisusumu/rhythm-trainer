import { useEffect, useRef } from 'react';
import { Renderer, Stave, StaveNote, Formatter, Beam } from 'vexflow';

const RhythmScore = ({ notes }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        containerRef.current.innerHTML = '';

        const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG);
        renderer.resize(220, 140);
        const context = renderer.getContext();

        const stave = new Stave(10, 40, 220);
        stave.setNumLines(1); // ✅ ← これが正解！
        stave.setContext(context).draw();


        const vfNotes = notes.map(d => {
            let duration = '4';
            if (d === 'e') duration = '8';
            if (d === 'h') duration = '2';
            return new StaveNote({
                keys: ['f/5'],         // ← 1本線に乗る
                duration,
                stem_direction: 1      // ← 上向き
            });
        });

        const beams = [];
        let beamGroup = [];

        for (const note of vfNotes) {
            if (note.getDuration() === '8') {
                beamGroup.push(note);
                if (beamGroup.length === 2) {
                    beams.push(new Beam(beamGroup, false)); // ← 2個ずつで生成
                    beamGroup = [];
                }
            } else {
                if (beamGroup.length > 1) {
                    beams.push(new Beam(beamGroup, false));
                }
                beamGroup = [];
            }
        }

        // 最後の余り処理（念のため）
        if (beamGroup.length > 1) {
            beams.push(new Beam(beamGroup, false));
        }



        // 描画
        Formatter.FormatAndDraw(context, stave, vfNotes);

        // ビームを描画
        beams.forEach(beam => beam.setContext(context).draw());

    }, [notes]);

    return <div ref={containerRef} />;
};

export default RhythmScore;
