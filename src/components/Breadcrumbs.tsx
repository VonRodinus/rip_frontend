// src/components/Breadcrumbs.tsx
import { Link, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArtifactService } from '../services/ArtifactService';
import './Breadcrumbs.css';

const nameCache: Record<string, string> = {};

export const Breadcrumbs = () => {
  const location = useLocation();
  const { id } = useParams<{ id?: string }>();
  const pathnames = location.pathname.split('/').filter(x => x);

  const [currentName, setCurrentName] = useState<string>('');

  useEffect(() => {
    if (id && pathnames.includes('artifact')) {
      if (nameCache[id]) {
        setCurrentName(nameCache[id]);
        return;
      }
      ArtifactService.getById(id)
        .then(art => {
          const name = art.Name;
          nameCache[id] = name;
          setCurrentName(name);
        })
        .catch(() => setCurrentName(`Артефакт ${id}`));
    } else {
      setCurrentName('');
    }
  }, [id, pathnames]);

  const breadcrumbs = pathnames.map((name, index) => {
    const isLast = index === pathnames.length - 1;
    let displayName = '';
    let to = `/${pathnames.slice(0, index + 1).join('/')}`;

    if (name === 'catalog') {
      displayName = 'Артефакты';
      to = '/catalog';
    } else if (name === 'artifact' && !isLast) {
      displayName = 'Артефакты';
      to = '/catalog';
    } else if (name === 'artifact' && isLast && id) {
      displayName = currentName || id;
    } else {
      displayName = name;
    }

    return { to, displayName, isLast };
  });

  return (
    <nav className="breadcrumbs">
      <Link to="/" className="breadcrumb-item">Главная</Link>
      {breadcrumbs.map(({ to, displayName, isLast }) => (
        <span key={to}>
          <span className="breadcrumb-separator"> / </span>
          {isLast ? (
            <span className="breadcrumb-item active">{displayName}</span>
          ) : (
            <Link to={to} className="breadcrumb-item">{displayName}</Link>
          )}
        </span>
      ))}
    </nav>
  );
};