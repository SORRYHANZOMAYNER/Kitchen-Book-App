import { TestBed } from '@angular/core/testing';

import { SearchRecipeService } from './search-recipe.service';

describe('SearchRecipeService', () => {
  let service: SearchRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
