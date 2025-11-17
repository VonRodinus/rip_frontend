// src/services/ArtifactService.ts
import { Artifact } from '../types/Artifact';

export const ArtifactService = {

  async getAll(filter?: string): Promise<Artifact[]> {
    const url = filter 
      ? `/api/artifacts?filter=${encodeURIComponent(filter)}` 
      : '/api/artifacts';
    
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch artifacts');
    
    const data = await res.json();
    console.log('getAll response:', data);

    return data.map((a: any) => ({
      ID: a.ID,
      Name: a.name || 'Без названия',
      Description: a.description || '',
      ImageURL: a.ImageURL || '/assets/default-image.webp',
      TPQ: a.tpq || 0,
      StartDate: a.start_date || 0,
      EndDate: a.end_date || 0,
      Epoch: a.epoch || 'Неизвестно'
    }));
  },

  async getById(id: string): Promise<Artifact> {
    const res = await fetch(`/api/artifacts/${id}`);
    if (!res.ok) throw new Error('Artifact not found');
    
    const a = await res.json();
    console.log('getById response:', a);

    return {
      ID: a.ID,
      Name: a.name || 'Без названия',
      Description: a.description || '',
      ImageURL: a.ImageURL || '/assets/default-image.webp',
      TPQ: a.tpq || 0,
      StartDate: a.start_date || 0,
      EndDate: a.end_date || 0,
      Epoch: a.epoch || 'Неизвестно'
    };
  }
};