import { TestBed } from '@angular/core/testing';

import { EnemyAnimationService } from './enemy-animation.service';

describe('EnemyAnimationService', () => {
  let service: EnemyAnimationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnemyAnimationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
