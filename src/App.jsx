import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import TestContainer from './components/Test/TestContainer';
import HomePage from './components/HomePage';
import RecursosPage from './components/RecursosPage';
import ProfileMap from './components/Profile/ProfileMap';
import AdaptationStoriesPage from './components/Stories/AdaptationStoriesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/test/:testId" element={<TestContainer />} />
          <Route path="/recursos" element={<RecursosPage />} />
          <Route path="/perfil" element={<ProfileMap />} />
          <Route path="/historias" element={<AdaptationStoriesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
