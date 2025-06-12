import { TextField, Button, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import type { AlignmentFormData } from '../../types/alignment-form-data.ts';
import { AMINO_ACIDS_REGEX } from '../../utils/amino-acids-regex.ts';
import { hasValue, hasValueNotEmpty } from '../../utils/has-value.ts';

/**
 * Представляет пропсы компонента формы ввода выравнивания аминокислотных последовательностей.
 */
interface AlignmentFormProps {
  /**
   * Возвращает делегат принимающий данные аминокислотных последовательностей.
   */
  readonly onSubmit: (data: AlignmentFormData) => void;
}

/**
 * Представляет компонент формы ввода выравнивания аминокислотных последовательностей.
 */
export function AlignmentForm({ onSubmit }: AlignmentFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { touchedFields },
  } = useForm<AlignmentFormData>({ mode: 'onChange' });

  const sequence1 = watch('sequence1');
  const sequence2 = watch('sequence2');

  const errorMessage = useMemo(() => {
    const touched = touchedFields.sequence1 || touchedFields.sequence2;

    if (!touched) {
      return '';
    }

    if (!hasValueNotEmpty(sequence1) || !hasValueNotEmpty(sequence2)) {
      return 'Оба поля обязательны для заполнения';
    }

    if (!AMINO_ACIDS_REGEX.test(sequence1) || !AMINO_ACIDS_REGEX.test(sequence2)) {
      return 'Последовательности могут содержать только обозначения аминокислот (A, R, N, D, C, E, Q, G, H, I, L, K, M, F, P, S, T, W, Y, V) и символ "-"';
    }

    if (sequence1.length !== sequence2.length) {
      return 'Последовательности должны быть одинаковой длины';
    }

    return '';
  }, [touchedFields, sequence1, sequence2]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!errorMessage && sequence1 && sequence2) {
          handleSubmit(onSubmit)();
        }
      }}
    >
      <Stack spacing={2}>
        <Controller
          control={control}
          name={'sequence1'}
          render={({ field }) => (
            <TextField
              label="Последовательность 1"
              fullWidth
              autoComplete="off"
              {...field}
              onChange={handleUppercaseInputChange(field.onChange)}
              onBeforeInput={(e) => {
                const char = e.data?.toUpperCase();
                if (hasValue(char) && !AMINO_ACIDS_REGEX.test(char)) {
                  e.preventDefault();
                }
              }}
            />
          )}
        />
        <Controller
          control={control}
          name={'sequence2'}
          render={({ field }) => (
            <TextField
              label="Последовательность 2"
              fullWidth
              autoComplete="off"
              {...field}
              onChange={handleUppercaseInputChange(field.onChange)}
              onBeforeInput={(e) => {
                const char = e.data?.toUpperCase();
                if (hasValue(char) && !AMINO_ACIDS_REGEX.test(char)) {
                  e.preventDefault();
                }
              }}
            />
          )}
        />
        <Typography color="error" style={{ minHeight: '1.5em' }}>
          {errorMessage}
        </Typography>
        <Button type="submit" variant="contained">
          Выравнять
        </Button>
      </Stack>
    </form>
  );
}

function handleUppercaseInputChange(
  onChange: (value: string) => void,
): React.ChangeEventHandler<HTMLInputElement> {
  return (e) => {
    const input = e.target;
    const start = input.selectionStart ?? input.value.length;
    const upper = input.value.toUpperCase();
    onChange(upper);
    requestAnimationFrame(() => {
      input.setSelectionRange(start, start);
    });
  };
}
