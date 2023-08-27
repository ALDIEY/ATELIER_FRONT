import { Component, EventEmitter, Input,OnInit,OnChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fournisseur } from 'src/app/model/fournisseur.model';
import { Categorie } from "../../model/categorie.model";
import { CategorieService } from '../../services/categorieService/categorie.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  // @Input('data')dataForm?:DataForm
  articleFormGroupe:FormGroup
  fournisseurSearch:Fournisseur[]=[]
  categories:Categorie[]=[]
reference: string = '';  
selectedPhoto: File | null = null;

url?:string
@ViewChild('photoInput') photoInput: any;

// @Input('saveArticle') emitSaveArticle:EventEmitter<ArticleForm>=new EventEmitter
constructor(private fd:FormBuilder,private categorieService: CategorieService){
this.articleFormGroupe=this.fd.group({
  libelle: [
    '',
    [
      Validators.required,
      Validators.minLength(3), 
      Validators.pattern('[a-zA-Z ]*'), 
    ],
  ],      // libelle: ['', Validators.required],
  prix: [null, [Validators.required, Validators.min(1)]],
stock: [null, [Validators.required, Validators.min(1)]], 
photo: [null, [Validators.required, ]],
rechercheFournisseurs: [''] ,// Définissez une valeur par défaut si nécessaire
categorie: [null, Validators.required],
referene: [null, Validators.required]
// fournisseurs: new FormControl(), 
// categorieId:null
// categorie:[null, [Validators.required, Validators.min(1)]],
});

}
ngOnInit() {
  this.fetchCategories(); // Appelez la méthode pour récupérer les catégories au chargement du composant
}

get CategorieSelect(){
  return this.articleFormGroupe.get('categorie')
  }
  fetchCategories(){
    this.categorieService.All().subscribe(
      (categories: Categorie[]) => {
        this.categories = categories; 
        // console.log(this.categories);
        
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    );
  
  }
  onFileSelected(event: any): void {
    this.selectedPhoto = event.target.files[0];
   console.log(this.selectedPhoto);

    let reader = new FileReader();

    reader.readAsDataURL(this.selectedPhoto as File);
    reader.onload = () => {
      this.url = reader.result as string;
      // console.log(reader.result);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  }

  selectImageInput() {
    this.photoInput.nativeElement.click();
  }
 
}




