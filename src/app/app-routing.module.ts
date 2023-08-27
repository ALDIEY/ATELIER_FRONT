import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieComponent } from './categorie/categorie.component'; // Assurez-vous que le chemin est correct
import { ArticleComponent } from './article/article.component';

const routes: Routes = [
  // { path: '', redirectTo: 'categories', pathMatch: 'full' },
  { path: 'categories', component: CategorieComponent }, // Assurez-vous que le chemin est correct
  { path: 'articles', component: ArticleComponent }, // Assurez-vous que le chemin est correct

  // ... d'autres routes si nécessaire
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule {}


