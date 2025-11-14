const API_BASE_URL = 'https://api.pappers.fr/v2';
const API_TOKEN = '97a405f1664a83329a7d89ebf51dc227b90633c4ba4a2575';

export interface PappersSearchParams {
  q?: string;
  page?: number;
  par_page?: number;
  precision?: 'standard' | 'large';
  bases?: string;
  case_sensitive?: boolean;
  entreprise_cessee?: boolean;
  departement?: string;
  categorie_juridique?: string;
  code_naf?: string;
  code_naf_elargi?: string;
  latitude?: number;
  longitude?: number;
  distance?: number;
  statut_rcs?: string;
  registre?: string;
  entreprise_employeuse?: boolean;
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

    if (params.entreprise_cessee !== undefined) {
      searchParams.set('entreprise_cessee', String(params.entreprise_cessee));
    }

    if (params.departement) {
      searchParams.set('departement', params.departement);
    }

    if (params.categorie_juridique) {
      searchParams.set('categorie_juridique', params.categorie_juridique);
    }

    if (params.code_naf) {
      searchParams.set('code_naf', params.code_naf);
    }

    if (params.code_naf_elargi) {
      searchParams.set('code_naf_elargi', params.code_naf_elargi);
    }

    if (params.latitude && params.longitude) {
      searchParams.set('latitude', String(params.latitude));
      searchParams.set('longitude', String(params.longitude));
      if (params.distance) {
        searchParams.set('distance', String(params.distance));
      }
    }

    if (params.statut_rcs) {
      searchParams.set('statut_rcs', params.statut_rcs);
    }

    if (params.registre) {
      searchParams.set('registre', params.registre);
    }

    if (params.entreprise_employeuse !== undefined) {
      searchParams.set('entreprise_employeuse', String(params.entreprise_employeuse));
    }

    const response = await fetch(`${API_BASE_URL}/recherche?${searchParams}`);
    
    if (!response.ok) {
      throw new Error(`Erreur API Pappers: ${response.status}`);
    }

    return response.json();
  },
};
