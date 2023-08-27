import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleService } from '../services/articleService/article.service';
import { Categorie } from '../model/categorie.model';
import { Fournisseur } from '../model/fournisseur.model';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  // articleForm: FormGroup;
  formulaire!: FormGroup;
  // dataForm:DataForm
  categories: Categorie[] = []; // Votre tableau de catégories
  fournisseurs: Fournisseur[] = []; // Votre tableau de fournisseurs
  successMessage: string = '';
  submitted: boolean = false;
  // @ViewChild(FormComponent,{static:false}) formComponent=<FormComponent>=;

  constructor(
    // private formBuilder: FormBuilder,
    // private articleService: ArticleService
  ) {}
  articleService: any;
  formBuilder: any;

  ngOnInit() {
    this.initForm();
    // this.loadCategories();
    // this.loadFournisseurs();
  }

  initForm() {
    this.formulaire = this.formBuilder.group({
      libelle: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      prix: [null, [Validators.required, Validators.min(0), ]],
      stock: [null, [Validators.required, Validators.min(0), ]],
      categorie: ['', Validators.required],
      rechercheFournisseurs: [''],
      fournisseurs: [[], Validators.required],
    });
  }

  ajouterArticle() {
    this.submitted = true;
    if (this.formulaire.invalid) {
      return;
    }

    // Construction de l'objet d'article à partir des valeurs du formulaire
    const nouvelArticle = {
      libelle: this.formulaire.value.libelle,
      prix: this.formulaire.value.prix,
      stock: this.formulaire.value.stock,
      categorie: this.formulaire.value.categorie,
      fournisseurs: this.formulaire.value.fournisseurs,
      photo:this.formulaire.value.photo,
      reference:this.formulaire.value.reference

    };

    this.articleService.create(nouvelArticle).subscribe(
      () => {
        this.successMessage = 'Article ajouté avec succès.';
        this.submitted = false;
        this.formulaire.reset();
      },
      (error: any) => {
        console.error("Erreur lors de l'ajout de l'article :", error);
      }
    );
  }

  modifierArticle() {
    this.submitted = true;
    if (this.formulaire.invalid) {
      return;
    }

    // Construction de l'objet d'article modifié à partir des valeurs du formulaire
    // const articleModifie = {
    //   id: // L'ID de l'article à modifier,
    //   libelle: this.formulaire.value.libelle,
    //   prix: this.formulaire.value.prix,
    //   stock: this.formulaire.value.stock,
    //   categorie: this.formulaire.value.categorie,
    //   fournisseurs: this.formulaire.value.fournisseurs
    //   // ... autres propriétés de l'article
    // };

    // this.articleService.update(articleModifie).subscribe(
    //   () => {
    //     this.successMessage = 'Article modifié avec succès.';
    //     this.submitted = false;
    //     this.formulaire.reset();
    //   },
    //   (error: any) => {
    //     console.error("Erreur lors de la modification de l'article :", error);
    //   }
    // );
  }

  // ... autres méthodes de chargement et gestion des données
}
