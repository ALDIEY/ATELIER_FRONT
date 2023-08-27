import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleventeComponent } from './articlevente/articlevente.component';
import { ArticleComponent } from './article/article.component';
import { CategorieComponent } from './categorie/categorie.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './article/form/form.component';
import { ListComponent } from './article/list/list.component';
import { NgxPaginationModule } from 'ngx-pagination'; // Importez le module de pagination ici

import { PaginationComponent } from './article/list/pagination/pagination.component';
import { ItemComponent } from './article/list/item/item.component'; // Importez FormsModule
@NgModule({
  declarations: [
    AppComponent,
    ArticleventeComponent,
    ArticleComponent,
    CategorieComponent,
    FormComponent,
    ListComponent,
    PaginationComponent,
    ItemComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule ,// Ajoutez ReactiveFormsModule ici,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
