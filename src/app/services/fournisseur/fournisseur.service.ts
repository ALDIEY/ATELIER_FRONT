import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';
import { HttpClient } from '@angular/common/http';
import { Fournisseur } from '../../model/fournisseur.model'
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService extends RestService<Fournisseur> {
  
  constructor(http: HttpClient,  ) {
    super(http);
    this.setEndpoint(environment.apiUrl + '/fournisseurs' );
  }
  }

