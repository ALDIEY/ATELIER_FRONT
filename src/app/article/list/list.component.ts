import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../model/article.model'; // Import your Article model
import { PaginatePipe } from 'ngx-pagination'; // Import the PaginatePipe

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input() articles: Article[] = [];

  pagedArticles: Article[] = [];
  currentPage = 1;
  pageSize = 3; // Set the number of items per page

  constructor(private paginatePipe: PaginatePipe) {}

  ngOnInit(): void {
    // this.pageChanged(1);
  }

  // pageChanged(pageNumber: number) {
  //   this.currentPage = pageNumber;
  //   this.pagedArticles = this.paginatePipe.transform(this.articles, this.pageSize, this.currentPage);
  // }
}
