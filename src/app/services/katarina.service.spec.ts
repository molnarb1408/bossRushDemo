import { TestBed } from '@angular/core/testing';

import { KatarinaService } from './katarina.service';

describe('KatarinaService', () => {
  let service: KatarinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KatarinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
