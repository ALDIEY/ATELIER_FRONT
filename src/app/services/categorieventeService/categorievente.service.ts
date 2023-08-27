import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';
import { HttpClient } from '@angular/common/http';
import { Categorievente } from '../../model/articlevente.model'
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategorieService extends RestService<Categorievente > {
  
  constructor(http: HttpClient,  ) {
    super(http);
    this.setEndpoint(environment.apiUrl + '/categories/ventes');
  }
  }

