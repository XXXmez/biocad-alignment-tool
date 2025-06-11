import React, { useEffect, useRef, useState } from 'react';

import type { AlignmentFormData } from '../../types/alignment-form-data.ts';
import { AMINO_ACID_COLORS } from '../../utils/amino-acid-colors';

import './alignment-view.css';

/**
 * Представляет пропсы компонента визуализации выравнивания двух аминокислотных последовательностей.
 */
type AlignmentViewProps = AlignmentFormData;

/**
 * Представляет компонент визуализации выравнивания двух аминокислотных последовательностей.
 */
export const AlignmentView: React.FC<AlignmentViewProps> = ({ sequence1, sequence2 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blockSize, setBlockSize] = useState(50);

  useEffect(() => {
    const updateBlockSize = () => {
      if (containerRef.current) {
        // создаём временный span
        const span = document.createElement('span');
        span.textContent = 'A';
        span.style.visibility = 'hidden';
        span.style.fontFamily = 'monospace';
        span.style.fontSize = 'inherit';
        span.style.padding = '0 2px';
        span.style.display = 'inline-block';
        containerRef.current.appendChild(span);

        const charWidth = span.getBoundingClientRect().width;
        containerRef.current.removeChild(span);

        const containerWidth = containerRef.current.getBoundingClientRect().width;
        const calculatedBlockSize = Math.floor(containerWidth / charWidth);
        setBlockSize(calculatedBlockSize || 1);
      }
    };

    updateBlockSize();

    const resizeObserver = new ResizeObserver(updateBlockSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const blocksCount = Math.ceil(sequence1.length / blockSize);

  const blocks = Array.from({ length: blocksCount }, (_, i) => {
    const start = i * blockSize;
    const end = start + blockSize;
    return {
      top: sequence1.slice(start, end),
      bottom: sequence2.slice(start, end),
    };
  });

  return (
    <div
      ref={containerRef}
      className={'alignment-view'}
      style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
    >
      {blocks.map(({ top, bottom }, index) => (
        <div key={index} style={{ marginBottom: '0.5rem' }}>
          <div>
            {top.split('').map((char, i) => (
              <span
                key={i}
                style={{
                  backgroundColor: AMINO_ACID_COLORS[char.toUpperCase()] || 'transparent',
                  padding: '0 2px',
                  display: 'inline-block',
                  minWidth: '12px',
                  textAlign: 'center',
                  userSelect: 'text',
                }}
              >
                {char}
              </span>
            ))}
          </div>
          <div>
            {bottom.split('').map((char, i) => {
              const topChar = top[i];
              const isDifferent = char.toUpperCase() !== topChar.toUpperCase();
              return (
                <span
                  key={i}
                  style={{
                    backgroundColor: isDifferent
                      ? AMINO_ACID_COLORS[char.toUpperCase()] || 'transparent'
                      : 'transparent',
                    padding: '0 2px',
                    display: 'inline-block',
                    minWidth: '12px',
                    textAlign: 'center',
                    userSelect: 'text',
                  }}
                >
                  {char}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
