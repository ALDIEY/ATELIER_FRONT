import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../services/categorieService/categorie.service'; // Assurez-vous que le chemin d'accès est correct
import { Categorie } from '../model/categorie.model';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
})
export class CategorieComponent implements OnInit {
  category:any[]=[]
  categories: Categorie[] = [];
  check:boolean=true
  libelleValue: string = ''; 
  currentPage = 1;
  itemsPerPage = 3; 
  totalPages = 0;
  pages: number[] = [];
  idsupprime: number[] = [];
  libelleValide = false;
  ajoutEditMode:boolean = true; 
  categorieIdAModifier: number | null = null; 
  editMode = true;
  // selectAllChecked = false; // Initialisez selectAllChecked à false
  boutonAjout:boolean=true
  // id:number;
  // disableAjouterButton = true;
  deleteButtonDisabled = true;
  cheekAll:boolean=false

  constructor(private categorieService: CategorieService) {}
  ngOnInit(): void {
    // this.paginateCategories();
    this.getCategorie();
  }
  getCategorie() {
    this.categorieService.All().subscribe(
        (categoriesData: Categorie[]) => {
            this.categories = categoriesData; // Assigner directement les catégories à votre propriété
            console.log(this.categories);
        },
        (error) => {
            console.error("Erreur lors de la récupération des catégories :", error);
        }
    );
}


cheeked(){
if (this.cheekAll) {
  this.categories.map(cat=>cat.checked=this.cheekAll)
  this.deleteButtonDisabled=false
}
else{
  this.categories.map(cat=>cat.checked=false)
  this.deleteButtonDisabled=true

}
} 
changeckeek(){
const isCheek=this.categories.filter(cat=>cat.checked);
// console.log(isCheek);
// console.log(this.categories);

const id=isCheek.map(cat=>cat.id)

this.idsupprime=id
if (isCheek.length>0) {
  this.deleteButtonDisabled=false
 
  
}
else{
  this.deleteButtonDisabled=true
}
const filtrer=this.categories.filter(cat=>!cat.checked);
if (filtrer) {
  this.cheekAll=false
}
if (isCheek.length==this.categories.length) {
  this.cheekAll=true
}
} 

paginateCategories() {
  // const endpoint = 'categories'; // L'endpoint spécifique pour les catégories
  const paginate = this.itemsPerPage * this.currentPage;

  const url = this.categorieService.pagination(paginate);

  this.categorieService.All().subscribe(
    (response: any) => {
      this.categories = response.data;
      this.categories = this.categories.reverse();
      this.totalPages = response.last_page;
      this.currentPage = response.meta.current_page;
      this.totalPages = Math.ceil(response.meta.total / this.itemsPerPage);
      this.generatePages();
    },
    (error) => {
      console.error('Erreur lors de la récupération des catégories paginées :', error);
    }
  );
}


  generatePages() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateCategories();
    }
  }

  changePage(offset: number) {
    const newPage = this.currentPage + offset;
    console.log(offset);
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.paginateCategories();
    }
  }

  supprimer() {
    // console.log(this.idsupprime);
    this.categorieService
      .delete(this.idsupprime)
      .subscribe((response) => {
        // console.log(response);
        this.paginateCategories();
        this.idsupprime = [];
        this.libelleValue = ''; 
        this.deleteButtonDisabled = true;
        this.cheekAll=false
        this.check=false
        this.boutonAjout=true
      });
  }
  // getId(id: number) {
  //   const categorie = this.categories.find((c) => c.id === id);
  //   if (categorie) {
  //     categorie.libelle = !categorie.libelle;

  //   }
  //   if (this.idsupprime) {
  //     this.deleteButtonDisabled=false
      
  //   }
  //   else if(!this.idsupprime){
  //     this.deleteButtonDisabled=true

  //   }

  // }
  // getIdMod(id: number) {
  //   const categorie = this.categories.find((c) => c.id === id);
  //   if (categorie) {
  //     categorie.selected = !categorie.selected;
  //   }
  // }

  chargerEdition(categorie: Categorie) {
    if (this.ajoutEditMode == false) {
      this.libelleValue = categorie.libelle;
      // console.log(this.libelleValue);
      
    // this.ajoutEditMode = true; 
    this.categorieIdAModifier = categorie.id; 
    // this.updateDeleteButtonState();
    // this.deleteButtonDisabled = true;
    this.editMode = true; // Activer le mode édition
    // this.updateDeleteButtonState();
//  console.log(categorie.selected);
 
      
    }
    // else if () {
  
    // }
    
  }
  ajoulibelle(e: Event): string {
    const value = (e.target as HTMLInputElement).value;
    // console.log(e);
    this.libelleValue = value;
    // console.log(this.libelleValue);
    return value;
  }

  // areAllCategoriesSelected(): boolean {
  //   // this.deleteButtonDisabled = false;

  //   return this.categories.every((categorie) => categorie.selected);
  // }

  // toggleAllCategories(): void {
  //   this.selectAllChecked = !this.selectAllChecked;
  //   this.categories.forEach((categorie) => (categorie.selected = this.selectAllChecked));
  //   // this.updateDeleteButtonState(); // Mettez à jour l'état du bouton de suppression
  // }
  ajouterCategorie() {
    const nouvelleCategorie = {
      libelle: this.libelleValue,
    };

    let libelleExiste = this.categories.some((categorie) => categorie.libelle === nouvelleCategorie.libelle);

    if (libelleExiste) {
      console.error('Le libellé existe déjà.');
    } else {
      this.categorieService.create(nouvelleCategorie as Categorie).subscribe(
        (response: any) => {
          this.libelleValue = '';
          this.paginateCategories();
          this.boutonAjout = true;
        },
        (error) => {
          console.error("Erreur lors de l'ajout de la catégorie :", error);
        }
      );
    }
  }
  
  modifCategorie() {
    if (this.categorieIdAModifier !== null) {
      const categorieModifiee = {
        id: this.categorieIdAModifier,
        libelle: this.libelleValue,
      };

      let libelleExiste = this.categories.some((categorie) => categorie.libelle === categorieModifiee.libelle);

      if (libelleExiste) {
        console.error('Le libellé existe déjà.');
      } else {
        this.categorieService.update(this.categorieIdAModifier, categorieModifiee).subscribe(
          (response: any) => {
            this.paginateCategories();
            this.libelleValue = '';
            this.categorieIdAModifier = null;
            this.boutonAjout = true;
          },
          (error) => {
            console.error("Erreur lors de la modification de la catégorie :", error);
          }
        );
      }
    }
  }


 

  checkLibelleExists(libelle: string): void {
    if ( this.category.includes(libelle) || libelle.length<3 ) {
     
this.boutonAjout=true

        
    } else if(!this.category.includes(libelle)) {
      this.libelleValide = true;
      this.boutonAjout=false
    }
  }

  ajouterModifierCategorie() {
    if (this.ajoutEditMode) {
    //  console.log('bzas');
     
      // console.log(this.ajoutEditMode);
      this.ajouterCategorie();
    // this.boutonAjout=true
      
    } else {
      if (!this.ajoutEditMode) {
        this.modifCategorie();
      }
    }
  }

  isLibelleValid(): boolean {
    const libelleExists = this.categories.some(
      (categorie) => categorie.libelle === this.libelleValue
    );
    return (
     
      (!this.ajoutEditMode || !libelleExists) &&
      this.libelleValide
    );
  }

  toggleAjoutMode() {
    this.ajoutEditMode = !this.ajoutEditMode;
  }
  // updateDeleteButtonState() {
  //   if ( this.areAllCategoriesSelected() ) {
  //     this.deleteButtonDisabled = false;
  //   }
    
  //   else if(this.idsupprime.length==0)
  //   {
  //     console.log('sava');
      
  //     this.deleteButtonDisabled = true;

  //   }
  // }


  
}
