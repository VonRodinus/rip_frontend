// src/App.tsx
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AppNavbar } from './components/Navbar'; // ← ИСПРАВЛЕНО
import { Catalog } from './pages/Catalog';
import { Detail } from './pages/Detail';
import { Home } from './pages/Home';
import { Breadcrumbs } from './components/Breadcrumbs';

export default function App() {
  return (
    <Router basename="">
      <AppNavbar />
      <Breadcrumbs />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/artifact/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
}