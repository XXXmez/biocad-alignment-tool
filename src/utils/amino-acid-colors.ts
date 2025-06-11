/**
 * Представляет цветовую схему выравнивания аминокислот.
 */
const AMINO_ALIGNMENT_COLOR_SCHEME = {
  /**
   * Гидрофобные.
   */
  hydrophobic: '#67E4A6',
  /**
   * Положительно заряженные.
   */
  positivelyCharged: '#BB99FF',
  /**
   * Отрицательно заряженные.
   */
  negativelyCharged: '#FC9CAC',
  /**
   * Полярные незаряженные.
   */
  polarUncharged: '#80BFFF',
  /**
   * Цистеин.
   */
  cysteine: '#FFEA00',
  /**
   * Глицин.
   */
  glycine: '#C4C4C4',
};

/**
 * Возвращает цвета для аминокислотных символов.
 */
export const AMINO_ACID_COLORS: Record<string, string> = {
  A: AMINO_ALIGNMENT_COLOR_SCHEME.hydrophobic,
  R: AMINO_ALIGNMENT_COLOR_SCHEME.positivelyCharged,
  N: AMINO_ALIGNMENT_COLOR_SCHEME.polarUncharged,
  D: AMINO_ALIGNMENT_COLOR_SCHEME.negativelyCharged,
  C: AMINO_ALIGNMENT_COLOR_SCHEME.cysteine,
  E: AMINO_ALIGNMENT_COLOR_SCHEME.negativelyCharged,
  Q: AMINO_ALIGNMENT_COLOR_SCHEME.polarUncharged,
  G: AMINO_ALIGNMENT_COLOR_SCHEME.glycine,
  H: AMINO_ALIGNMENT_COLOR_SCHEME.polarUncharged,
  I: AMINO_ALIGNMENT_COLOR_SCHEME.hydrophobic,
  L: AMINO_ALIGNMENT_COLOR_SCHEME.hydrophobic,
  K: AMINO_ALIGNMENT_COLOR_SCHEME.positivelyCharged,
  M: AMINO_ALIGNMENT_COLOR_SCHEME.hydrophobic,
  F: AMINO_ALIGNMENT_COLOR_SCHEME.hydrophobic,
  P: AMINO_ALIGNMENT_COLOR_SCHEME.hydrophobic,
  S: AMINO_ALIGNMENT_COLOR_SCHEME.polarUncharged,
  T: AMINO_ALIGNMENT_COLOR_SCHEME.polarUncharged,
  W: AMINO_ALIGNMENT_COLOR_SCHEME.hydrophobic,
  Y: AMINO_ALIGNMENT_COLOR_SCHEME.hydrophobic,
  V: AMINO_ALIGNMENT_COLOR_SCHEME.hydrophobic,
  '-': '',
};
