import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PovratakNaPocetnuStranuComponent } from './povratak-na-pocetnu-stranu.component';

describe('PovratakNaPocetnuStranuComponent', () => {
  let component: PovratakNaPocetnuStranuComponent;
  let fixture: ComponentFixture<PovratakNaPocetnuStranuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PovratakNaPocetnuStranuComponent]
    });
    fixture = TestBed.createComponent(PovratakNaPocetnuStranuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
