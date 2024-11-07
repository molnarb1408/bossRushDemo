import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatarinaComponent } from './katarina.component';

describe('KatarinaComponent', () => {
  let component: KatarinaComponent;
  let fixture: ComponentFixture<KatarinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KatarinaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KatarinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
