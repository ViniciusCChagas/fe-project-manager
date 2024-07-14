import { RouterProvider } from 'react-router-dom';
import Router from './core/router';
import { AuthProvider } from './core/hooks/useAuth.tsx';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  );
}

export default App;
