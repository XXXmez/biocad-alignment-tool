import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import './styles/global.css';
import { hasValue } from './utils/has-value.ts';

const rootElement = document.getElementById('root');

if (hasValue(rootElement)) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  throw new Error('Root element not found');
}
