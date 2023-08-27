import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';
import { HttpClient } from '@angular/common/http';
import { ArticleVente } from '../../model/categorievente.model'
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ArticleVenteService extends RestService<ArticleVente> {
  
  constructor(http: HttpClient,  ) {
    super(http);
    this.setEndpoint(environment.apiUrl + '/articles/ventes');
  }
  }
