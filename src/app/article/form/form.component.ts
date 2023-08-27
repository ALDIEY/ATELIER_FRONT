import { Component, EventEmitter, Input,OnInit,OnChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Fournisseur } from 'src/app/model/fournisseur.model';
import { Categorie } from "../../model/categorie.model";
import { CategorieService } from '../../services/categorieService/categorie.service';
import { FournisseurService } from '../../services/fournisseur/fournisseur.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  // @Input('data')dataForm?:DataForm
  articleFormGroupe:FormGroup
  fournisseurSearch:Fournisseur[]=[]
  selectedFournisseurs: Fournisseur[] = [];
  categories:Categorie[]=[]
  fournisseurs:Fournisseur[]=[]
reference: string = '';  
selectedPhoto: File | null = null;

url?:string
@ViewChild('photoInput') photoInput: any;

// @Input('saveArticle') emitSaveArticle:EventEmitter<ArticleForm>=new EventEmitter
constructor(private fd:FormBuilder,private categorieService: CategorieService,private fournisseurService: FournisseurService){
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
  this.fetchFournisseur();
  this.fetchCategories(); // Appelez la méthode pour récupérer les catégories au chargement du composant
}
get fourniSelect(){
  return this.articleFormGroupe.get('fournisseurs')

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

fetchFournisseur(){
this.fournisseurService.All().subscribe(
  (fournisseurs: Fournisseur[]) => {
    this.fournisseurs = fournisseurs; 
   console.log( this.fournisseurs);
   checked: false;
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
 //concernant les fournisseur
 onSeachFournisseur(event: Event) {
  const inputSeachFour = event.target as HTMLInputElement;
  this.fournisseurSearch = [];
// console.log(inputSeachFour);

  if (inputSeachFour.value.length >= 2) {
    // console.log(inputSeachFour.value.toLowerCase());
    
    this.fournisseurSearch = this.fournisseurs.filter(
      fournisseur => fournisseur.nom.toLowerCase().includes(inputSeachFour.value.toLowerCase())
    );
    console.log(this.fournisseurSearch);
    
  }
}
onSelectFour(event: Event, fournisseur: Fournisseur) {
  const inputCheckFour = event.target as HTMLInputElement;

  if (inputCheckFour.checked) {
    this.selectedFournisseurs.push(fournisseur);
  }
}
 deleteFournisseur(fournisseur: Fournisseur) {
  this.selectedFournisseurs = this.selectedFournisseurs.filter(
    value => value.id !== fournisseur.id
  );
}

isSelectedFournisseur(fournisseur: Fournisseur): boolean {
  return this.fourniSelect?.value.some((value: { id: number; }) => value.id === fournisseur.id);
}
removeSelectedFournisseur(fournisseur: Fournisseur) {
  const fournisseurs = this.fourniSelect?.value as Fournisseur[];
  const index = fournisseurs.findIndex(f => f.id === fournisseur.id);

  if (index !== -1) {
    fournisseurs.splice(index, 1);
    this.fourniSelect?.patchValue(fournisseurs);
  }
}

toggleFournisseurSelection(fournisseur: Fournisseur) {
  fournisseur.checked = !fournisseur.checked;

  if (fournisseur.checked) {
    this.selectedFournisseurs.push(fournisseur);
  } else {
    const index = this.selectedFournisseurs.findIndex(
      value => value.id === fournisseur.id
    );
    if (index !== -1) {
      this.selectedFournisseurs.splice(index, 1);
    }
  }
}

}






