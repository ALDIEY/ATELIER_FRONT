import { TestBed } from '@angular/core/testing';

import { ArticleventeService } from './articlevente.service';

describe('ArticleventeService', () => {
  let service: ArticleventeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleventeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
