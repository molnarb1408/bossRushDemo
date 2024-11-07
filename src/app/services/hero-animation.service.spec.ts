import { TestBed } from '@angular/core/testing';

import { HeroAnimationService } from './hero-animation.service';

describe('HeroAnimationService', () => {
  let service: HeroAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
