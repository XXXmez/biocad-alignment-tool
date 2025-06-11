import { AlignmentForm } from './components/alignment-form/alignment-form.tsx';
import { Layout } from './components/layout/layout.tsx';
import type { AlignmentFormData } from './types/alignment-form-data.ts';

function App() {
  const handleSubmit = (data: AlignmentFormData) => {
    console.log('Результат формы:', data);
  };

  return (
    <Layout>
      <AlignmentForm onSubmit={handleSubmit} />
    </Layout>
  );
}

export default App;
