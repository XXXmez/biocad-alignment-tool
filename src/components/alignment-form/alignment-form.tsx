import { useForm } from 'react-hook-form';
import { TextField, Button, Stack } from '@mui/material';
import type {AlignmentFormData} from "../../types/alignment-form-data.ts";
import {AMINO_ACIDS_REGEX} from "../../utils/amino-acids-regex.ts";

interface AlignmentFormProps {
    readonly onSubmit: (data: AlignmentFormData) => void;
}

export const AlignmentForm = ({ onSubmit }: AlignmentFormProps) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm<AlignmentFormData>();

    const seq1 = watch('seq1');
    const seq2 = watch('seq2');

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <TextField
                    label="Последовательность 1"
                    {...register('seq1', {
                        required: 'Обязательное поле',
                        pattern: {
                            value: AMINO_ACIDS_REGEX,
                            message: 'Допустимы только латинские буквы аминокислот и "-"',
                        },
                    })}
                    error={!!errors.seq1}
                    helperText={errors.seq1?.message}
                    fullWidth
                />
                <TextField
                    label="Последовательность 2"
                    {...register('seq2', {
                        required: 'Обязательное поле',
                        pattern: {
                            value: AMINO_ACIDS_REGEX,
                            message: 'Допустимы только латинские буквы аминокислот и "-"',
                        },
                        validate: (value) =>
                            value.length === seq1?.length ||
                            'Последовательности должны быть одинаковой длины',
                    })}
                    error={!!errors.seq2}
                    helperText={errors.seq2?.message}
                    fullWidth
                />
                <Button type="submit" variant="contained" disabled={!isValid}>
                    Выравнять
                </Button>
            </Stack>
        </form>
    );
};