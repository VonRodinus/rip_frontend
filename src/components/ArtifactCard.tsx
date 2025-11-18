//src/components/ArtifactCard.tsx
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Artifact } from '../types/Artifact';

interface Props {
  artifact: Artifact;
  onAddToCart: (id: string) => void;
}

export const ArtifactCard = ({ artifact, onAddToCart }: Props) => {
  return (
    <Card className="h-100 shadow-sm hover-shadow">
      <Card.Img
        variant="top"
        src={artifact.ImageURL}
        alt={artifact.Name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title as={Link} to={`/artifact/${artifact.ID}`} className="text-dark text-decoration-none">
          {artifact.Name}
        </Card.Title>
        <Card.Text className="text-muted small">
          Период: {artifact.StartDate}–{artifact.EndDate} {artifact.Epoch}
        </Card.Text>
        <Card.Text className="text-success fw-bold">
          TPQ: {artifact.TPQ}
        </Card.Text>
        <Button
          variant="outline-success"
          className="mt-auto"
          onClick={() => onAddToCart(artifact.ID)}
        >
          Добавить в расчёт
        </Button>
      </Card.Body>
    </Card>
  );
};