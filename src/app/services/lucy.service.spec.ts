import { TestBed } from '@angular/core/testing';

import { LucyService } from './lucy.service';

describe('LucyService', () => {
  let service: LucyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LucyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
