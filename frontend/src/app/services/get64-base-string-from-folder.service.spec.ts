import { TestBed } from '@angular/core/testing';

import { Get64BaseStringFromFolderService } from './get64-base-string-from-folder.service';

describe('Get64BaseStringFromFolderService', () => {
  let service: Get64BaseStringFromFolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Get64BaseStringFromFolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
