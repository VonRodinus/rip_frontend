// src/services/api.ts

const isTauri = typeof window !== 'undefined' && '__TAURI__' in window;

const BASE_URL = isTauri ? 'http://localhost:8080' : '';

async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  queryParams?: Record<string, string | number>
): Promise<T> {
  let url = `${BASE_URL}${path}`;

  if (queryParams) {
    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([k, v]) => params.append(k, String(v)));
    url += `?${params}`;
  }

  console.log('[API] →', options.method || 'GET', url);

  const response = await fetch(url, {
    ...options,
    credentials: 'include',
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('[API ERROR]', response.status, text);
    throw new Error('Backend unavailable');
  }

  return response.json() as T;
}

export const apiGet = <T>(path: string, params?: Record<string, any>) =>
  apiRequest<T>(path, { method: 'GET' }, params);