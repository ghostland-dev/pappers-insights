const API_BASE_URL = 'https://api.pappers.fr/v2';
const API_TOKEN = '97a405f1664a83329a7d89ebf51dc227b90633c4ba4a2575';

export interface PappersSearchParams {
  q?: string;
  page?: number;
  par_page?: number;
  precision?: 'standard' | 'large';
  bases?: string;
  case_sensitive?: boolean;
}

export interface PappersResponse {
  resultats: any[];
  page: number;
  total: number;
}

export const pappersApi = {
  async search(params: PappersSearchParams = {}): Promise<PappersResponse> {
    const searchParams = new URLSearchParams({
      api_token: API_TOKEN,
      precision: params.precision || 'standard',
      bases: params.bases || 'entreprises,dirigeants,publications',
      page: String(params.page || 1),
      par_page: String(params.par_page || 20),
      case_sensitive: String(params.case_sensitive || false),
    });

    if (params.q) {
      searchParams.set('q', params.q);
    }

    const response = await fetch(`${API_BASE_URL}/recherche?${searchParams}`);
    
    if (!response.ok) {
      throw new Error(`Erreur API Pappers: ${response.status}`);
    }

    return response.json();
  },
};
