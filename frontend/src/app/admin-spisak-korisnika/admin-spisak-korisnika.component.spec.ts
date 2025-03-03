import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSpisakKorisnikaComponent } from './admin-spisak-korisnika.component';

describe('AdminSpisakKorisnikaComponent', () => {
  let component: AdminSpisakKorisnikaComponent;
  let fixture: ComponentFixture<AdminSpisakKorisnikaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSpisakKorisnikaComponent]
    });
    fixture = TestBed.createComponent(AdminSpisakKorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
