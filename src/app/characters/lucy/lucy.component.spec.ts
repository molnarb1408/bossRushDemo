import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LucyComponent } from './lucy.component';

describe('LucyComponent', () => {
  let component: LucyComponent;
  let fixture: ComponentFixture<LucyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LucyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LucyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
