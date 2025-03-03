import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlasnikOdrzavanjaComponent } from './vlasnik-odrzavanja.component';

describe('VlasnikOdrzavanjaComponent', () => {
  let component: VlasnikOdrzavanjaComponent;
  let fixture: ComponentFixture<VlasnikOdrzavanjaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VlasnikOdrzavanjaComponent]
    });
    fixture = TestBed.createComponent(VlasnikOdrzavanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
