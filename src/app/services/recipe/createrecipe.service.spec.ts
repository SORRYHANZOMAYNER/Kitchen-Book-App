import { TestBed } from '@angular/core/testing';

import { CreateRecipeService } from './createrecipe.service';

describe('CreaterecipeService', () => {
  let service: CreateRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
