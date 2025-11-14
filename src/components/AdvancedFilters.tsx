import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { DEPARTEMENTS, FORMES_JURIDIQUES, SECTEURS_ACTIVITE } from "@/data/filterOptions";

export interface FilterValues {
  departement?: string;
  formeJuridique?: string;
  secteur?: string;
  entrepriseCessee?: boolean;
  entrepriseEmployeuse?: boolean;
  statusFilter: string;
}

interface AdvancedFiltersProps {
  filters: FilterValues;
  onFiltersChange: (filters: FilterValues) => void;
}

export const AdvancedFilters = ({ filters, onFiltersChange }: AdvancedFiltersProps) => {
  const activeFiltersCount = [
    filters.departement,
    filters.formeJuridique,
    filters.secteur,
    filters.entrepriseCessee !== undefined,
    filters.entrepriseEmployeuse !== undefined,
    filters.statusFilter !== "all",
  ].filter(Boolean).length;

  const clearFilters = () => {
    onFiltersChange({
      statusFilter: "all",
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 relative">
          <Filter className="h-4 w-4" />
          Filtres avancés
          {activeFiltersCount > 0 && (
            <Badge variant="default" className="ml-2 px-1.5 py-0.5 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filtres de recherche</SheetTitle>
          <SheetDescription>
            Affinez votre recherche avec des critères avancés
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Status Filter */}
          <div className="space-y-2">
            <Label htmlFor="status">Statut de l'entreprise</Label>
            <Select
              value={filters.statusFilter}
              onValueChange={(value) =>
                onFiltersChange({ ...filters, statusFilter: value })
              }
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Tous les statuts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="actif">Actif</SelectItem>
                <SelectItem value="inactif">Inactif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Department Filter */}
          <div className="space-y-2">
            <Label htmlFor="departement">Département</Label>
            <Select
              value={filters.departement || ""}
              onValueChange={(value) =>
                onFiltersChange({
                  ...filters,
                  departement: value || undefined,
                })
              }
            >
              <SelectTrigger id="departement">
                <SelectValue placeholder="Tous les départements" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                <SelectItem value="">Tous les départements</SelectItem>
                {DEPARTEMENTS.map((dept) => (
                  <SelectItem key={dept.value} value={dept.value}>
                    {dept.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Legal Form Filter */}
          <div className="space-y-2">
            <Label htmlFor="forme">Forme juridique</Label>
            <Select
              value={filters.formeJuridique || ""}
              onValueChange={(value) =>
                onFiltersChange({
                  ...filters,
                  formeJuridique: value || undefined,
                })
              }
            >
              <SelectTrigger id="forme">
                <SelectValue placeholder="Toutes les formes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes les formes</SelectItem>
                {FORMES_JURIDIQUES.map((forme) => (
                  <SelectItem key={forme.value} value={forme.value}>
                    {forme.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Activity Sector Filter */}
          <div className="space-y-2">
            <Label htmlFor="secteur">Secteur d'activité</Label>
            <Select
              value={filters.secteur || ""}
              onValueChange={(value) =>
                onFiltersChange({
                  ...filters,
                  secteur: value || undefined,
                })
              }
            >
              <SelectTrigger id="secteur">
                <SelectValue placeholder="Tous les secteurs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les secteurs</SelectItem>
                {SECTEURS_ACTIVITE.map((secteur) => (
                  <SelectItem key={secteur.value} value={secteur.value}>
                    {secteur.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Employer Switch */}
          <div className="flex items-center justify-between">
            <Label htmlFor="employeuse" className="flex-1">
              Entreprises employeuses uniquement
            </Label>
            <Switch
              id="employeuse"
              checked={filters.entrepriseEmployeuse || false}
              onCheckedChange={(checked) =>
                onFiltersChange({
                  ...filters,
                  entrepriseEmployeuse: checked ? true : undefined,
                })
              }
            />
          </div>

          {/* Active Companies Switch */}
          <div className="flex items-center justify-between">
            <Label htmlFor="cessee" className="flex-1">
              Exclure les entreprises cessées
            </Label>
            <Switch
              id="cessee"
              checked={filters.entrepriseCessee === false}
              onCheckedChange={(checked) =>
                onFiltersChange({
                  ...filters,
                  entrepriseCessee: checked ? false : undefined,
                })
              }
            />
          </div>

          {/* Clear Filters Button */}
          {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={clearFilters}
            >
              <X className="h-4 w-4" />
              Réinitialiser les filtres
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
