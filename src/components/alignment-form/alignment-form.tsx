import { TextField, Button, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import type { AlignmentFormData } from '../../types/alignment-form-data.ts';

interface AlignmentFormProps {
  readonly onSubmit: (data: AlignmentFormData) => void;
}

export const AlignmentForm = ({ onSubmit }: AlignmentFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<AlignmentFormData>({ mode: 'all' });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Controller
          control={control}
          name={'sequence1'}
          render={() => <TextField label="Последовательность 1" fullWidth />}
        />
        <Controller
          control={control}
          name={'sequence1'}
          render={() => <TextField label="Последовательность 2" fullWidth />}
        />
        <Button type="submit" variant="contained" disabled={!isValid}>
          Выравнять
        </Button>
      </Stack>
    </form>
  );
};
