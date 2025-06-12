import { useRef, useEffect, useState } from 'react';

import type { AlignmentFormData } from '../../types/alignment-form-data.ts';
import type { CharInfo, LinePair } from '../../types/alignment-line.ts';
import { AMINO_ACID_COLORS } from '../../utils/amino-acid-colors.ts';
import { measureTextWidth } from '../../utils/measure-text-width.ts';

import './alignment-view.css';

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
      const sequence1ToUpperCase = sequence1.toUpperCase();
      const sequence2ToUpperCase = sequence2.toUpperCase();

      const newLines: LinePair[] = [];

      let topSymbols: CharInfo[] = [];
      let bottomSymbols: CharInfo[] = [];
      let currentWidth = 0;

      for (let i = 0; i < sequence1ToUpperCase.length; i++) {
        const symbolTop = sequence1ToUpperCase[i];
        const symbolBottom = sequence2ToUpperCase[i];

        const widthSymbolTop = measureTextWidth(symbolTop);
        const widthSymbolBottom = measureTextWidth(symbolBottom);

        const widthSymbolMax = Math.max(widthSymbolTop, widthSymbolBottom);

        if (currentWidth + widthSymbolMax > width && topSymbols.length > 0) {
          newLines.push({ top: topSymbols, bottom: bottomSymbols });
          topSymbols = [];
          bottomSymbols = [];
          currentWidth = 0;
        }

        topSymbols.push({ char: symbolTop, width: widthSymbolTop });
        bottomSymbols.push({ char: symbolBottom, width: widthSymbolBottom });

        currentWidth += widthSymbolMax;
      }

      if (topSymbols.length) {
        newLines.push({ top: topSymbols, bottom: bottomSymbols });
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
    <div ref={containerRef} className={'alignment-view'}>
      {lines.map((line, index) => {
        const { top, bottom } = line;

        const topString = top.map((char) => char.char).join('');
        const bottomString = bottom.map((char) => char.char).join('');

        let topLineWidth = 0;
        let bottomLineWidth = 0;

        const stopsTop: string[] = [];
        const stopsBottom: string[] = [];

        top.forEach((charInfo) => {
          const { char, width } = charInfo;

          const colorSymbol = AMINO_ACID_COLORS[char] || 'transparent';

          stopsTop.push(
            `${colorSymbol} ${topLineWidth}px`,
            `${colorSymbol} ${topLineWidth + width}px`,
          );

          topLineWidth += width;
        });

        bottom.forEach((charInfo, indexSymbol) => {
          const { char, width } = charInfo;

          const colorSymbol =
            top[indexSymbol].char === char
              ? 'transparent'
              : AMINO_ACID_COLORS[char] || 'transparent';

          stopsBottom.push(
            `${colorSymbol} ${bottomLineWidth}px`,
            `${colorSymbol} ${bottomLineWidth + width}px`,
          );

          bottomLineWidth += width;
        });

        const gradientTop = `linear-gradient(to right, ${stopsTop.join(', ')})`;
        const gradientBottom = `linear-gradient(to right, ${stopsBottom.join(', ')})`;

        return (
          <div key={index} style={{ lineHeight: '1em' }}>
            <div style={{ background: gradientTop, width: topLineWidth }}>{topString}</div>
            <div style={{ background: gradientBottom, width: bottomLineWidth }}>{bottomString}</div>
          </div>
        );
      })}
    </div>
  );
}
