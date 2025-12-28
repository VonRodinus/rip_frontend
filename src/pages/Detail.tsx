// src/pages/Detail.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArtifactService } from '../services/ArtifactService';
import { Artifact } from '../types/Artifact';
import { mockArtifacts } from '../services/mockArtifacts'; // <-- импортируем моки
import './Detail.css';

const DEFAULT_IMAGE = `${import.meta.env.BASE_URL}assets/default-image.webp`;

export const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [artifact, setArtifact] = useState<Artifact | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBackendAvailable, setIsBackendAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    setLoading(true);

    
    ArtifactService.getById(id!)
      .then((data) => {
        setArtifact(data);
        setIsBackendAvailable(true);
      })
      .catch((err) => {
        console.warn('Backend unavailable or artifact not found. Trying mock...', err);

        
        const mockArtifact = mockArtifacts.find(a => a.ID === id);

        if (mockArtifact) {
          
          setArtifact({
            ...mockArtifact,
            ImageURL: mockArtifact.ImageURL || DEFAULT_IMAGE,
          });
          setIsBackendAvailable(false);
        } else {
          
          setArtifact(null);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  
  if (!loading && !artifact) {
    return (
      <div className="text-center my-5">
        <h2>Артефакт не найден</h2>
        <button className="btn btn-link" onClick={() => navigate('/catalog')}>
          ← Вернуться в каталог
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      
      {isBackendAvailable === false && (
        <div className="alert alert-warning text-center mx-4" role="alert">
          Демонстрационный режим: данные загружены из локальной коллекции.
        </div>
      )}

      <section className="artifact-detail-section">
        <div className="artifact-detail-container">
          <div className="artifact-image-block">
            <img
              src={artifact!.ImageURL || DEFAULT_IMAGE}
              alt={artifact!.Name}
              className="detail-image"
              onError={(e) => {
                e.currentTarget.src = DEFAULT_IMAGE;
              }}
            />
          </div>

          <div className="artifact-info-block">
            <h1 className="artifact-detail-title">{artifact!.Name}</h1>

            <div className="artifact-detail-period">
              <p className="period-text">
                Время бытования: {artifact!.StartDate}-{artifact!.EndDate} {artifact!.Epoch}
              </p>
              <p className="tpq-text">TPQ: {artifact!.TPQ}</p>
            </div>

            <div className="artifact-description">
              <h3>Подробное описание</h3>
              <p>
                {artifact!.Description || (
                  <span style={{ color: '#666', fontStyle: 'italic' }}>
                    Описание отсутствует в демонстрационной версии.
                  </span>
                )}
              </p>
            </div>

            <button
              className={`add-to-request-btn disabled`}
            >
              Добавить в расчёт
            </button>
          </div>
        </div>
      </section>
    </>
  );
};