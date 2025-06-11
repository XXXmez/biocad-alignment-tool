import { useRef, useEffect, useState } from 'react';

import type { AlignmentFormData } from '../../types/alignment-form-data.ts';
import type { CharInfo, LinePair } from '../../types/alignment-line.ts';
import { AMINO_ACID_COLORS } from '../../utils/amino-acid-colors.ts';
import { measureTextWidth } from '../../utils/measure-text-width.ts';

/**
 * Представляет пропсы компонента отображения выравнивания аминокислотных последовательностей.
 */
type AlignmentViewProps = AlignmentFormData;

/**
 * Представляет компонент отображения выравнивания аминокислотных последовательностей.
 */
export function AlignmentView(props: AlignmentViewProps) {
  const { sequence1, sequence2 } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<LinePair[]>([]);

  useEffect(() => {
    const buildLines = (width: number) => {
      const seq1 = sequence1.toUpperCase();
      const seq2 = sequence2.toUpperCase();

      const newLines: LinePair[] = [];

      let currTop: CharInfo[] = [];
      let currBottom: CharInfo[] = [];
      let currWidth = 0;

      for (let i = 0; i < seq1.length; i++) {
        const c1 = seq1[i],
          c2 = seq2[i];
        const w1 = measureTextWidth(c1);
        const w2 = measureTextWidth(c2);
        const w = Math.max(w1, w2);
        if (currWidth + w > width && currTop.length > 0) {
          newLines.push({ top: currTop, bottom: currBottom });
          currTop = [];
          currBottom = [];
          currWidth = 0;
        }
        currTop.push({ char: c1, width: w });
        currBottom.push({ char: c2, width: w });
        currWidth += w;
      }

      if (currTop.length) {
        newLines.push({ top: currTop, bottom: currBottom });
      }

      setLines(newLines);
    };

    const obs = new ResizeObserver((entries) => {
      if (entries[0] && containerRef.current) {
        buildLines(entries[0].contentRect.width);
      }
    });

    if (containerRef.current) {
      obs.observe(containerRef.current);
      buildLines(containerRef.current.clientWidth);
    }

    return () => obs.disconnect();
  }, [sequence1, sequence2]);

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      {lines.map((line, idx) => (
        <div key={idx} style={{ lineHeight: '1em' }}>
          <div>
            {line.top.map((info, j) => (
              <span
                key={j}
                style={{
                  display: 'inline-block',
                  width: info.width + 'px',
                  backgroundColor: AMINO_ACID_COLORS[info.char],
                  fontFamily: 'monospace',
                }}
              >
                {info.char}
              </span>
            ))}
          </div>
          <div>
            {line.bottom.map((info, j) => {
              const backgroundColor =
                info.char === line.top[j].char ? 'transparent' : AMINO_ACID_COLORS[info.char];
              return (
                <span
                  key={j}
                  style={{
                    display: 'inline-block',
                    width: info.width + 'px',
                    backgroundColor,
                    fontFamily: 'monospace',
                  }}
                >
                  {info.char}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
