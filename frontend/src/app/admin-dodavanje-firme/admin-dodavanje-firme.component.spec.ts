import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDodavanjeFirmeComponent } from './admin-dodavanje-firme.component';

describe('AdminDodavanjeFirmeComponent', () => {
  let component: AdminDodavanjeFirmeComponent;
  let fixture: ComponentFixture<AdminDodavanjeFirmeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDodavanjeFirmeComponent]
    });
    fixture = TestBed.createComponent(AdminDodavanjeFirmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
