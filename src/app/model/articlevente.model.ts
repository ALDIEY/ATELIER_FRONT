import { Article } from "./article.model";
import { Categorievente } from "./categorievente.model";
export interface ArticleVente {
    id: number;
    libelle: string;
    prix: number;
    qtStock: number;
    statut: number;
    promo: number;
    marge: number;
    photo: string;
    reference: string;
    categorie: Categorievente;
    article: Article; 
  }

export { Categorievente };
  