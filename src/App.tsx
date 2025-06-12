import { Snackbar } from '@mui/material';
import { useState } from 'react';

import { AlignmentForm } from './components/alignment-form/alignment-form.tsx';
import { AlignmentView } from './components/alignment-view/alignment-view.tsx';
import { Layout } from './components/layout/layout.tsx';
import type { AlignmentFormData } from './types/alignment-form-data.ts';

/**
 * Представляет рутовый компонент приложения.
 */
function App() {
  const [state, setState] = useState<AlignmentFormData | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (data: AlignmentFormData) => {
    setState(data);
  };

  const handleMouseUp = () => {
    const selectedText = window.getSelection()?.toString();
    if (selectedText) {
      navigator.clipboard.writeText(selectedText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      });
    }
  };

  return (
    <Layout>
      <AlignmentForm onSubmit={handleSubmit} />
      {state && (
        <div onMouseUp={handleMouseUp}>
          <AlignmentView {...state} />
        </div>
      )}
      <Snackbar
        open={copied}
        message="Скопировано"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Layout>
  );
}

export default App;
