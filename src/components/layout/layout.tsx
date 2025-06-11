import { Container, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface LayoutProps {
  readonly children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <Container maxWidth="sm" sx={{ py: 4 }}>
    <Typography variant="h5" gutterBottom>
      Выравнивание последовательностей
    </Typography>
    <Stack spacing={4}>{children}</Stack>
  </Container>
);
