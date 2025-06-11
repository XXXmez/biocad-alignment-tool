import { Container, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface LayoutProps {
  readonly children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <Container maxWidth="sm" sx={{ py: 4 }}>
    <Typography variant="h4" gutterBottom>
      Выравнивание последовательностей
    </Typography>
    {children}
  </Container>
);
