import { Fournisseur } from "../model/fournisseur.model";
import { Categorie } from "../model/categorie.model";
export interface Article {
 
categories: Categorie[];
    id: number;
  libelle: string;
  prix: number;
  quantite: number;
  categorieLibelle: string;
  photo:string;
//  fournisseurs:[],
fournisseurs: Fournisseur[]; // Remplacez "Fournisseur" par le type approprié
  confirmingDelete?: boolean;
  countdown: number;
  countdownInterval?: any; // Ajoutez cette ligne
}