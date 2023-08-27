import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';
import { HttpClient } from '@angular/common/http';
import { Categorie } from '../../model/categorie.model'
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategorieService extends RestService<Categorie> {
  
  constructor(http: HttpClient,  ) {
    super(http);
    this.setEndpoint(environment.apiUrl + '/categories' );
  }
  }

