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
            let keys = ['f/5'];
            if (d === 'e') duration = '8';
            if (d === 'h') duration = '2';
            if (d === 'er') { duration = '8r'; keys = ['b/4']; }
            if (d === 'qr') { duration = '4r'; keys = ['b/4']; }
            if (d === 'hr') { duration = '2r'; keys = ['b/4']; }
            const note = new StaveNote({
                keys,
                duration,
                stem_direction: 1
            });
            if (note.isRest()) {
                note.setKeyLine(0, 0); // 休符をライン上に配置
            }
            return note;
        });

        const beams = [];
        let beamGroup = [];

        for (const note of vfNotes) {
            if (note.getDuration() === '8' && !note.isRest()) {
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
