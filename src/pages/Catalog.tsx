// src/pages/Catalog.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { ArtifactService } from '../services/ArtifactService';
import { Artifact } from '../types/Artifact';
import { useCart } from '../hooks/useCart';
import { CartService } from '../services/CartService';
import { mockArtifacts } from '../services/mockArtifacts'; // Импортируем мок
import './Catalog.css';

const DEFAULT_IMAGE = '/assets/default-image.webp'; // Путь из public

export const Catalog = () => {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [isBackendAvailable, setIsBackendAvailable] = useState<boolean | null>(null);
  const { refresh } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);

      // Попытка загрузить с бэкенда
      ArtifactService.getAll(filter)
        .then((data) => {
          setArtifacts(data);
          setIsBackendAvailable(true);
        })
        .catch((err) => {
          console.warn('Backend unavailable, loading mock data:', err);
          // Подставляем мок-данные с дефолтной картинкой
          const mockWithImage = mockArtifacts.map((item) => ({
            ...item,
            ImageURL: DEFAULT_IMAGE,
          }));
          setArtifacts(mockWithImage);
          setIsBackendAvailable(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 300);

    return () => clearTimeout(timer);
  }, [filter]);

  const handleAdd = async (id: string) => {
    try {
      await CartService.addArtifact(id);
      await refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="hero-section">
        <img
          className="hero-image"
          src="http://localhost:9000/artifacts/artifacts_picture.jpg"
          alt="Коллекция"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_IMAGE; // fallback на случай недоступности hero-изображения
          }}
        />
        <div className="hero-overlay">
          <h1 className="hero-title">Артефакты</h1>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Поиск артефактов..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <button className="search-icon-btn">
              <img src="http://localhost:9000/artifacts/search_icon.png" alt="Поиск" className="search-icon" />
            </button>
          </div>
        </div>
      </section>

      <section className="description-section">
        <p className="text-center description-main-text">
          В основе работы Chronus лежит постоянно обновляемая база данных артефактов с установленной датировкой. 
          Наш каталог — это живой инструмент для исследователей, создаваемый и проверяемый экспертами.
        </p>
      </section>

      {/* Опционально: уведомление о режиме */}
      {isBackendAvailable === false && (
        <div className="alert alert-warning text-center mx-4" role="alert">
          Сервер недоступен. Отображается демонстрационная коллекция.
        </div>
      )}

      <section className="artifacts-section">
        <div className="section-header">
          <div className="section-line"></div>
          <h2 className="section-title">Познакомьтесь с коллекцией</h2>
          <div className="section-line"></div>
        </div>

        <div className="artifacts-grid">
          {loading ? (
            <div className="loading-container">
              <Spinner animation="border" variant="warning" />
            </div>
          ) : artifacts.length === 0 ? (
            <p className="no-results">Ничего не найдено</p>
          ) : (
            artifacts.map((a) => (
              <article key={a.ID} className="artifact-card">
                <Link to={`/artifact/${a.ID}`} className="artifact-link">
                  <div className="image-container">
                    <img
                      className="artifact-image"
                      src={a.ImageURL || DEFAULT_IMAGE}
                      alt={a.Name}
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_IMAGE;
                      }}
                    />
                  </div>
                  <div className="card-content">
                    <h3 className="artifact-title">{a.Name}</h3>
                    <p className="artifact-period">
                      Период бытования: {a.StartDate}-{a.EndDate} {a.Epoch}
                    </p>
                    <p className="artifact-tpq">TPQ: {a.TPQ}</p>
                  </div>
                </Link>
                <button className="add-to-request-btn disabled">
                  Добавить в расчёт
                </button>
              </article>
            ))
          )}
        </div>
      </section>
    </>
  );
};