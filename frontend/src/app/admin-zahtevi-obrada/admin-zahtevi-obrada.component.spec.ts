import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminZahteviObradaComponent } from './admin-zahtevi-obrada.component';

describe('AdminZahteviObradaComponent', () => {
  let component: AdminZahteviObradaComponent;
  let fixture: ComponentFixture<AdminZahteviObradaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminZahteviObradaComponent]
    });
    fixture = TestBed.createComponent(AdminZahteviObradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
