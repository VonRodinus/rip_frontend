// src/services/ArtifactService.ts
import { apiGet } from './api';
import { Artifact } from '../types/Artifact';
import { mockArtifacts } from './mockArtifacts';


const normalizeArtifact = (data: any): Artifact => {
  console.log('Raw data for normalization:', data);
  
  
  const getField = (fieldVariants: string[], defaultValue: any = '') => {
    for (const field of fieldVariants) {
      if (data[field] !== undefined && data[field] !== null) {
        return data[field];
      }
    }
    return defaultValue;
  };

  const artifact: Artifact = {
    ID: getField(['ID', 'id', '_id'], ''),
    Name: getField(['Name', 'name', 'title'], 'Без названия'),
    Description: getField(['Description', 'description', 'desc'], ''),
    ImageURL: getField([
      'ImageURL', 'imageURL', 'imageUrl', 'image_url',
      'Image', 'image', 'ImagePath', 'image_path',
      'Images', 'images' 
    ], ''),
    TPQ: Number(getField(['TPQ', 'tpq', 'Tpq'], 0)),
    StartDate: Number(getField(['StartDate', 'startDate', 'start_date', 'StartYear', 'start_year'], 0)),
    EndDate: Number(getField(['EndDate', 'endDate', 'end_date', 'EndYear', 'end_year'], 0)),
    Epoch: getField(['Epoch', 'epoch', 'period', 'Period'], ''),
  };

  
  if (Array.isArray(artifact.ImageURL)) {
    artifact.ImageURL = artifact.ImageURL[0] || '';
  }

  
  if (!artifact.StartDate && !artifact.EndDate && data.dating) {
    const dating = String(data.dating);
    const match = dating.match(/(\d+)\s*[-–]\s*(\d+)/);
    if (match) {
      artifact.StartDate = Number(match[1]);
      artifact.EndDate = Number(match[2]);
    }
  }

  console.log('Normalized artifact:', artifact);
  return artifact;
};

export const ArtifactService = {
  async getAll(filter?: string): Promise<Artifact[]> {
    try {
      console.log('[ArtifactService] Fetching artifacts with filter:', filter);
      
      const params = filter ? { filter } : undefined;
      const data = await apiGet<any[]>('/api/artifacts', params);
      
      console.log('[ArtifactService] Raw data from backend:', data);
      
      const normalizedData = Array.isArray(data) 
        ? data.map(normalizeArtifact)
        : [];
      
      console.log('[ArtifactService] Normalized artifacts:', normalizedData);
      return normalizedData;
    } catch (error) {
      console.error('[ArtifactService] Error fetching artifacts:', error);
      console.log('[ArtifactService] Using mock data');
      return mockArtifacts;
    }
  },

  async getById(id: string): Promise<Artifact> {
    try {
      console.log('[ArtifactService] Fetching artifact by id:', id);
      const data = await apiGet<any>(`/api/artifacts/${id}`);
      
      const normalizedArtifact = normalizeArtifact(data);
      console.log('[ArtifactService] Normalized artifact:', normalizedArtifact);
      
      return normalizedArtifact;
    } catch (error) {
      console.error('[ArtifactService] Error fetching artifact:', error);
      
      const mockArtifact = mockArtifacts.find(a => a.ID === id);
      if (mockArtifact) {
        console.log('[ArtifactService] Using mock artifact');
        return mockArtifact;
      }
      throw error;
    }
  },
};