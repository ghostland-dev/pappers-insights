import { useState, useEffect } from "react";
import { Search, Building2, Filter, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
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
import { pappersApi } from "@/services/pappersApi";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setCurrentPage(1); // Reset to first page on new search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch companies from API
  const { data, isLoading, error } = useQuery({
    queryKey: ['companies', debouncedQuery, currentPage],
    queryFn: async () => {
      return await pappersApi.search({
        q: debouncedQuery || undefined,
        page: currentPage,
        par_page: 20,
      });
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les données. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  const companies = data?.resultats || [];
  const totalResults = data?.total || 0;
  const totalPages = Math.ceil(totalResults / 20);

  const filteredCompanies = companies.filter((company: any) => {
    const matchesStatus = 
      statusFilter === "all" || company.statut_consolide === statusFilter;
    return matchesStatus;
  });

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
                {totalResults > 0 
                  ? `${totalResults.toLocaleString('fr-FR')} entreprise${totalResults > 1 ? 's' : ''} trouvée${totalResults > 1 ? 's' : ''}`
                  : 'Recherchez parmi des millions d\'entreprises françaises'
                }
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
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Chargement des entreprises...</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              {filteredCompanies.length} résultat{filteredCompanies.length > 1 ? 's' : ''} sur cette page
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company: any) => (
                <CompanyCard
                  key={company.siren}
                  company={company}
                  onClick={() => setSelectedCompany(company)}
                />
              ))}
            </div>

            {filteredCompanies.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {searchQuery ? 'Aucune entreprise trouvée pour cette recherche' : 'Lancez une recherche pour voir les résultats'}
                </p>
              </div>
            )}

            {/* Pagination */}
            {filteredCompanies.length > 0 && totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Précédent
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} sur {totalPages.toLocaleString('fr-FR')}
                </span>
                <Button
                  variant="outline"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="gap-2"
                >
                  Suivant
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
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
