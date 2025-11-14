import { useState } from "react";
import { Search, Building2, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CompanyCard } from "@/components/CompanyCard";
import { CompanyDetails } from "@/components/CompanyDetails";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample data from the API
const companiesData = {
  "resultats": [
    {
      "siren": "502111503",
      "siren_formate": "502 111 503",
      "diffusable": true,
      "nom_entreprise": "VALOXY LITTORAL",
      "personne_morale": true,
      "denomination": "VALOXY LITTORAL",
      "entreprise_cessee": 0,
      "statut_rcs": "Inscrit",
      "statut_consolide": "actif",
      "categorie_juridique": "5499",
      "forme_juridique": "SARL, société à responsabilité limitée",
      "date_creation": "2008-01-01",
      "date_creation_formate": "01/01/2008",
      "code_naf": "69.20Z",
      "libelle_code_naf": "Activités comptables",
      "domaine_activite": "Activités comptables",
      "siege": {
        "siret": "50211150300046",
        "siret_formate": "502 111 503 00046",
        "numero_voie": 9,
        "type_voie": "RUE",
        "libelle_voie": "DE L'ABBAYE",
        "adresse_ligne_1": "9 RUE DE L'ABBAYE",
        "code_postal": "62500",
        "ville": "SAINT-OMER",
        "pays": "France"
      },
      "villes": ["ARQUES", "DUNKERQUE", "HAZEBROUCK", "HESDIN", "LONGUENESSE", "SAINT-OMER"],
      "date_cessation": null,
      "entreprise_employeuse": 1,
      "tranche_effectif": "11",
      "effectif": "Entre 10 et 19 salariés",
      "effectif_min": 10,
      "effectif_max": 19,
      "economie_sociale_et_solidaire": false,
      "annee_effectif": 2022,
      "capital": 50132,
      "chiffre_affaires": null,
      "resultat": 6742,
      "annee_finances": 2024
    },
    {
      "siren": "981791569",
      "siren_formate": "981 791 569",
      "diffusable": true,
      "nom_entreprise": "DECATTY",
      "personne_morale": true,
      "denomination": "DECATTY",
      "entreprise_cessee": 0,
      "statut_rcs": "Inscrit",
      "statut_consolide": "actif",
      "categorie_juridique": "6540",
      "forme_juridique": "SCI, société civile immobilière",
      "date_creation": "2023-11-17",
      "date_creation_formate": "17/11/2023",
      "code_naf": "68.20B",
      "libelle_code_naf": "Location de terrains et d'autres biens immobiliers",
      "domaine_activite": "Activités immobilières",
      "siege": {
        "siret": "98179156900016",
        "numero_voie": 35,
        "type_voie": "RUE",
        "libelle_voie": "DES RESERVOIRS",
        "adresse_ligne_1": "35 RUE DES RESERVOIRS",
        "code_postal": "91250",
        "ville": "SAINTRY-SUR-SEINE",
        "pays": "France"
      },
      "villes": ["SAINTRY-SUR-SEINE"],
      "date_cessation": null,
      "entreprise_employeuse": 0,
      "effectif": "0 salarié",
      "effectif_min": 0,
      "effectif_max": 0,
      "economie_sociale_et_solidaire": false,
      "annee_effectif": 2025,
      "capital": 1000
    },
    {
      "siren": "917924185",
      "siren_formate": "917 924 185",
      "diffusable": true,
      "nom_entreprise": "CENTRALE SOLAIRE AMDA IV",
      "personne_morale": true,
      "denomination": "CENTRALE SOLAIRE AMDA IV",
      "entreprise_cessee": 0,
      "statut_rcs": "Inscrit",
      "statut_consolide": "actif",
      "categorie_juridique": "5720",
      "forme_juridique": "SASU, société par actions simplifiée unipersonnelle",
      "date_creation": "2022-06-01",
      "date_creation_formate": "01/06/2022",
      "code_naf": "35.11Z",
      "libelle_code_naf": "Production d'électricité",
      "domaine_activite": "Production et distribution d'électricité, de gaz, de vapeur et d'air conditionné",
      "siege": {
        "siret": "91792418500023",
        "numero_voie": 273,
        "type_voie": "AVENUE",
        "libelle_voie": "JEAN RIEUX",
        "adresse_ligne_1": "273 AVENUE JEAN RIEUX",
        "code_postal": "31500",
        "ville": "TOULOUSE",
        "pays": "France"
      },
      "villes": ["TOULOUSE"],
      "date_cessation": null,
      "entreprise_employeuse": 0,
      "effectif": "0 salarié",
      "effectif_min": 0,
      "effectif_max": 0,
      "economie_sociale_et_solidaire": false,
      "annee_effectif": 2025,
      "capital": 1000
    },
    {
      "siren": "935044545",
      "siren_formate": "935 044 545",
      "diffusable": true,
      "nom_entreprise": "LA MAISON DE CHLOE",
      "personne_morale": true,
      "denomination": "LA MAISON DE CHLOE",
      "entreprise_cessee": 0,
      "statut_rcs": "Inscrit",
      "statut_consolide": "actif",
      "categorie_juridique": "6540",
      "forme_juridique": "SCI, société civile immobilière",
      "date_creation": "2024-11-29",
      "date_creation_formate": "29/11/2024",
      "code_naf": "68.20B",
      "libelle_code_naf": "Location de terrains et d'autres biens immobiliers",
      "domaine_activite": "Activités immobilières",
      "siege": {
        "siret": "93504454500017",
        "numero_voie": 18,
        "type_voie": "RUE",
        "libelle_voie": "VULCAIN",
        "adresse_ligne_1": "18 RUE VULCAIN",
        "code_postal": "29900",
        "ville": "CONCARNEAU",
        "pays": "France"
      },
      "villes": ["CONCARNEAU"],
      "date_cessation": null,
      "entreprise_employeuse": 0,
      "effectif": "0 salarié",
      "effectif_min": 0,
      "effectif_max": 0,
      "economie_sociale_et_solidaire": false,
      "annee_effectif": 2025,
      "capital": 1000
    },
    {
      "siren": "889123329",
      "siren_formate": "889 123 329",
      "diffusable": true,
      "nom_entreprise": "SCI GUO QUAN ZENG",
      "personne_morale": true,
      "denomination": "SCI GUO QUAN ZENG",
      "entreprise_cessee": 0,
      "statut_rcs": "Inscrit",
      "statut_consolide": "inactif",
      "categorie_juridique": "6540",
      "forme_juridique": "SCI, société civile immobilière",
      "date_creation": "2020-09-16",
      "date_creation_formate": "16/09/2020",
      "code_naf": "68.20B",
      "libelle_code_naf": "Location de terrains et d'autres biens immobiliers",
      "domaine_activite": "Activités immobilières",
      "siege": {
        "siret": "88912332900019",
        "numero_voie": 163,
        "type_voie": "AVENUE",
        "libelle_voie": "HENRI BARBUSSE",
        "adresse_ligne_1": "163 AVENUE HENRI BARBUSSE",
        "code_postal": "93700",
        "ville": "DRANCY",
        "pays": "France"
      },
      "villes": ["DRANCY"],
      "date_cessation": null,
      "entreprise_employeuse": 0,
      "effectif": "0 salarié",
      "effectif_min": 0,
      "effectif_max": 0,
      "economie_sociale_et_solidaire": false,
      "annee_effectif": 2025,
      "capital": 100
    },
    {
      "siren": "479870677",
      "siren_formate": "479 870 677",
      "diffusable": true,
      "nom_entreprise": "AMAIS FRANCE",
      "personne_morale": true,
      "denomination": "AMAIS FRANCE",
      "entreprise_cessee": 0,
      "statut_rcs": "Inscrit",
      "statut_consolide": "actif",
      "categorie_juridique": "5499",
      "forme_juridique": "SARL, société à responsabilité limitée",
      "date_creation": "2004-12-15",
      "date_creation_formate": "15/12/2004",
      "code_naf": "62.02A",
      "libelle_code_naf": "Conseil en systèmes et logiciels informatiques",
      "domaine_activite": "Programmation, conseil et autres activités informatiques",
      "siege": {
        "siret": "47987067700057",
        "numero_voie": 652,
        "type_voie": "CHEMIN",
        "libelle_voie": "DU MOULIN A VENT",
        "adresse_ligne_1": "652 CHEMIN DU MOULIN A VENT",
        "code_postal": "30210",
        "ville": "CABRIERES",
        "pays": "France"
      },
      "villes": ["CABRIERES", "CERGY", "LA FRETTE-SUR-SEINE", "OSNY"],
      "date_cessation": null,
      "entreprise_employeuse": 1,
      "tranche_effectif": "01",
      "effectif": "Entre 1 et 2 salariés",
      "effectif_min": 1,
      "effectif_max": 2,
      "economie_sociale_et_solidaire": false,
      "annee_effectif": 2022,
      "capital": 10000,
      "resultat": 4229,
      "annee_finances": 2019
    }
  ],
  "total": 26131348
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCompanies = companiesData.resultats.filter((company) => {
    const matchesSearch = 
      company.nom_entreprise.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.siren_formate.includes(searchQuery);
    
    const matchesStatus = 
      statusFilter === "all" || company.statut_consolide === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Annuaire des Entreprises</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {companiesData.total.toLocaleString('fr-FR')} entreprises françaises
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou SIREN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="actif">Actif</SelectItem>
                <SelectItem value="inactif">Inactif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Results */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-4 text-sm text-muted-foreground">
          {filteredCompanies.length} résultat{filteredCompanies.length > 1 ? 's' : ''}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.siren}
              company={company}
              onClick={() => setSelectedCompany(company)}
            />
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Aucune entreprise trouvée</p>
          </div>
        )}
      </main>

      {/* Company Details Modal */}
      {selectedCompany && (
        <CompanyDetails
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </div>
  );
};

export default Index;
