/**
 * Регулярное выражение для проверки валидности аминокислотной последовательности.
 * Допустимы только символы: A, R, N, D, C, E, Q, G, H, I, L, K, M, F, P, S, T, W, Y, V и тире `-`.
 */
export const AMINO_ACIDS_REGEX = /^[ARNDCEQGHILKMFPSTWYV-]+$/i;
