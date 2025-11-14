import { Building2, MapPin, Users, TrendingUp, BadgeCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CompanyCardProps {
  company: {
    siren_formate: string;
    nom_entreprise: string;
    forme_juridique: string;
    statut_consolide: string;
    code_naf: string;
    libelle_code_naf: string;
    siege: {
      adresse_ligne_1: string;
      code_postal: string;
      ville: string;
    };
    effectif?: string;
    date_creation_formate: string;
    capital?: number;
    entreprise_employeuse: number;
  };
  onClick?: () => void;
}

export const CompanyCard = ({ company, onClick }: CompanyCardProps) => {
  const getStatusVariant = (status: string) => {
    return status === "actif" ? "default" : "secondary";
  };

  const getStatusColor = (status: string) => {
    return status === "actif" ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground";
  };

  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 cursor-pointer border-border hover:border-primary/50"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-foreground line-clamp-1">
              {company.nom_entreprise}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              SIREN: {company.siren_formate}
            </p>
          </div>
          <Badge className={getStatusColor(company.statut_consolide)}>
            {company.statut_consolide}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="h-4 w-4 text-primary" />
          <span className="line-clamp-1">{company.forme_juridique}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="line-clamp-1">
            {company.siege.ville} ({company.siege.code_postal})
          </span>
        </div>

        {company.effectif && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 text-primary" />
            <span>{company.effectif}</span>
          </div>
        )}

        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground line-clamp-2">
            {company.libelle_code_naf}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-muted-foreground">
            Créée le {company.date_creation_formate}
          </span>
          {company.entreprise_employeuse === 1 && (
            <BadgeCheck className="h-4 w-4 text-success" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
