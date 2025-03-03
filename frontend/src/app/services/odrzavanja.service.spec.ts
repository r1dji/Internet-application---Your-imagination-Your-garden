import { TestBed } from '@angular/core/testing';

import { OdrzavanjaService } from './odrzavanja.service';

describe('OdrzavanjaService', () => {
  let service: OdrzavanjaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OdrzavanjaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
