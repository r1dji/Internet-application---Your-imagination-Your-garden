import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlasnikregisterComponent } from './vlasnikregister.component';

describe('VlasnikregisterComponent', () => {
  let component: VlasnikregisterComponent;
  let fixture: ComponentFixture<VlasnikregisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VlasnikregisterComponent]
    });
    fixture = TestBed.createComponent(VlasnikregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
