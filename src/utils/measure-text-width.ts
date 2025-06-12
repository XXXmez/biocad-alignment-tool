/**
 * Измеряет ширину заданного символа в пикселях.
 * @param char Символ.
 * @default 10px.
 */
export function measureTextWidth(char: string): number {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    return 10;
  }

  context.font = '16px sans-serif';

  return context.measureText(char).width;
}
