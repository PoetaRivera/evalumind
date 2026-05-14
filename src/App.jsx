import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './components/HomePage';
import ErrorBoundary from './components/Common/ErrorBoundary';

const TestContainer = lazy(() => import('./components/Test/TestContainer'));
const RecursosPage = lazy(() => import('./components/RecursosPage'));
const ProfileMap = lazy(() => import('./components/Profile/ProfileMap'));
const AdaptationStoriesPage = lazy(() => import('./components/Stories/AdaptationStoriesPage'));
const NotFound = lazy(() => import('./components/Common/NotFound'));

function Loading() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>
      Cargando...
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/test/:testId" element={<TestContainer />} />
              <Route path="/recursos" element={<RecursosPage />} />
              <Route path="/perfil" element={<ProfileMap />} />
              <Route path="/historias" element={<AdaptationStoriesPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
