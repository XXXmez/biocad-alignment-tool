import { Container, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

/**
 * Представляет пропсы компонента макета страницы.
 */
interface LayoutProps {
  /**
   * Возвращает дочерние компоненты.
   */
  readonly children: ReactNode;
}

/**
 * Представляет компонент макета страницы.
 */
export const Layout = ({ children }: LayoutProps) => (
  <Container maxWidth="sm" sx={{ py: 4 }}>
    <Typography variant="h5" gutterBottom>
      Выравнивание последовательностей
    </Typography>
    <Stack spacing={4}>{children}</Stack>
  </Container>
);
