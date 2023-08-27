import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../rest.service';
import { Article } from '../../model/article.model';
import { environment } from '../../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class ArticleService extends RestService<Article> {
  environment: any;
  constructor( http: HttpClient) {
    super(http); // Appel au constructeur de la classe mère

    // Initialisation de l'endpoint spécifique pour ArticleService
    this.setEndpoint(environment.apiUrl + '/articles');
  }
 
  // Vous pouvez ajouter des méthodes spécifiques à ArticleService si nécessaire
}
