import { X, Building2, MapPin, Users, Calendar, Euro, Activity, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CompanyDetailsProps {
  company: any;
  onClose: () => void;
}

export const CompanyDetails = ({ company, onClose }: CompanyDetailsProps) => {
  const getStatusColor = (status: string) => {
    return status === "actif" ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground";
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="sticky top-0 bg-card z-10 border-b border-border">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold text-foreground">
                {company.nom_entreprise}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                SIREN: {company.siren_formate}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-6">
          {/* Status and Basic Info */}
          <div className="flex flex-wrap gap-2">
            <Badge className={getStatusColor(company.statut_consolide)}>
              {company.statut_consolide}
            </Badge>
            {company.entreprise_employeuse === 1 && (
              <Badge variant="outline" className="gap-1">
                <BadgeCheck className="h-3 w-3" />
                Employeur
              </Badge>
            )}
            {company.economie_sociale_et_solidaire && (
              <Badge variant="outline">ESS</Badge>
            )}
          </div>

          <Separator />

          {/* Company Information */}
          <div className="grid gap-4">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Forme juridique</p>
                <p className="text-sm text-muted-foreground">{company.forme_juridique}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Siège social</p>
                <p className="text-sm text-muted-foreground">
                  {company.siege.adresse_ligne_1}
                  {company.siege.adresse_ligne_2 && <><br />{company.siege.adresse_ligne_2}</>}
                  <br />
                  {company.siege.code_postal} {company.siege.ville}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Activity className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Activité</p>
                <p className="text-sm text-muted-foreground">
                  {company.libelle_code_naf}
                  <br />
                  <span className="text-xs">Code NAF: {company.code_naf}</span>
                </p>
              </div>
            </div>

            {company.effectif && (
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Effectif</p>
                  <p className="text-sm text-muted-foreground">
                    {company.effectif}
                    {company.annee_effectif && ` (${company.annee_effectif})`}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Date de création</p>
                <p className="text-sm text-muted-foreground">{company.date_creation_formate}</p>
              </div>
            </div>

            {company.capital && (
              <div className="flex items-start gap-3">
                <Euro className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Capital</p>
                  <p className="text-sm text-muted-foreground">
                    {company.capital.toLocaleString('fr-FR')} €
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Financial Information */}
          {(company.chiffre_affaires || company.resultat) && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Informations financières
                  {company.annee_finances && ` (${company.annee_finances})`}
                </h3>
                <div className="grid gap-3">
                  {company.chiffre_affaires && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Chiffre d'affaires</span>
                      <span className="text-sm font-medium text-foreground">
                        {company.chiffre_affaires.toLocaleString('fr-FR')} €
                      </span>
                    </div>
                  )}
                  {company.resultat && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Résultat</span>
                      <span className={`text-sm font-medium ${company.resultat > 0 ? 'text-success' : 'text-destructive'}`}>
                        {company.resultat.toLocaleString('fr-FR')} €
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Additional locations */}
          {company.villes && company.villes.length > 1 && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Autres établissements
                </h3>
                <div className="flex flex-wrap gap-2">
                  {company.villes.slice(0, 10).map((ville: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {ville}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
