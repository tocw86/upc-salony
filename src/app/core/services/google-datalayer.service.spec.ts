import { TestBed } from '@angular/core/testing';

import { GoogleDatalayerService } from './google-datalayer.service';

describe('GoogleDatalayerService', () => {
  let service: GoogleDatalayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleDatalayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
