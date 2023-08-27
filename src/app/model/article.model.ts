import { Fournisseur } from "../model/fournisseur.model";
export interface Article {
    id: number;
  libelle: string;
  prix: number;
  stock: number;
  categorieId: number;
  categorieLibelle: string;
  photo:string;
//  fournisseurs:[],
fournisseurs: Fournisseur[]; // Remplacez "Fournisseur" par le type approprié
  confirmingDelete?: boolean;
  countdown: number;
  countdownInterval?: any; // Ajoutez cette ligne
}